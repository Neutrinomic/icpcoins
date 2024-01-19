import { createSlice } from '@reduxjs/toolkit';
import ic from '../icblast.js';
import { toState } from '@infu/icblast';
import { idlFactory as snsidl } from '../sns_governance.idl.js';
import { idlFactory as nnsidl } from '../nns.idl.js';

const initialState = {};

export const proposalsSlice = createSlice({
  name: 'proposals',
  initialState,
  reducers: {
    clearProposals: state => {
      for (let k in state) state[k] = [];
    },
    setProposals: (state, action) => {
      let { symbol, proposals } = action.payload;
      state[symbol] = proposals;
    },
  },
});

export const { setProposals, clearProposals } = proposalsSlice.actions;

let lastProposals = { time: 0, filter: 'filtered' };
export const getProposals = ({tid=false} = {}) => async (dispatch, getState) => {
  let s = getState();
  let tokens = s.config.tokens;

  let newFilter = s.config.proposalFilter;
  if (
    newFilter === lastProposals.filter &&
    Date.now() - lastProposals.time < 1000 * 60 * 5
  )
    return;

  //   if (newFilter !== lastProposals.filter) dispatch(clearProposals());
  lastProposals = { time: Date.now(), filter: newFilter };

  if (!tid) dispatch(fetchNNSProposals());

  for (let t of tokens) {
    if (tid !== false && t.id !== tid) continue;
    if ('sns' in t.locking) {
      dispatch(fetchProposals({ symbol: t.symbol, info: t.locking.sns }));
    }
  }
};

export const fetchProposals =
  ({ symbol, info }) =>
  async (dispatch, getState) => {
    let s = getState();
    let can = await ic(info.governance, snsidl);

    let proposals = await can.list_proposals({
      include_reward_status: [],
      before_proposal: undefined,
      limit: 20,
      exclude_type: s.config.proposalFilter === 'all' ? [7] : [7, 4, 10], //0, 2, 5, 12, 8, 13, 7, 6, 9
      include_status: [],
    });

    let r = proposals.proposals.map(p => ({
      id: p.id.id,
      deadline: Number(
        p.wait_for_quiet_state.current_deadline_timestamp_seconds
      ),
      created: Number(p.proposal_creation_timestamp_seconds),
      root: info.root,
      decided: Number(p.decided_timestamp_seconds),
      url: p.proposal.url,
      //   summary: p.proposal.summary,
      title: p.proposal.title,
      action: Object.keys(p.proposal.action)[0],
      action_id: Number(p.action),
      tally: p.latest_tally,
    }));

    dispatch(setProposals({ symbol, proposals: toState(r) }));
  };

export const fetchNNSProposals = () => async (dispatch, getState) => {
  let nns = await ic('rrkah-fqaaa-aaaaa-aaaaq-cai', nnsidl);

  let s = getState();

  let proposals = await nns.list_proposals({
    include_reward_status: [],
    include_status: [],
    limit: 20,
    exclude_topic:
      s.config.proposalFilter === 'all' ? [12] : [0, 2, 5, 12, 8, 13, 7, 6, 9],
  });

  let r = proposals.proposal_info.map(p => ({
    id: p.id.id,
    deadline: Number(p.deadline_timestamp_seconds),
    decided: Number(p.decided_timestamp_seconds),
    created: Number(p.proposal_timestamp_seconds),
    //   summary: p.proposal[0].summary,
    title: p.proposal.title,
    action: Object.keys(p.proposal.action)[0],
    topic: p.topic,
    status: p.status,
    tally: p.latest_tally,
  }));

  dispatch(setProposals({ symbol: 'NNS', proposals: toState(r) }));
};

export default proposalsSlice.reducer;
