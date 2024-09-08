import { createSlice } from '@reduxjs/toolkit';
import { fetchConfig } from './config';
import { fetchPairs } from './pairs';
import { fetchTokens } from './tokens';
import { getProposals } from './proposals';
import { getPairIds } from '../utils.js';

const initialState = {
  page: 'index',
  params: {},
};

export const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload.page;
      state.params = action.payload.params || {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPage } = pageSlice.actions;

let cleanup = false;

export const changePage =
  ({ page, params }) =>
  async (dispatch, getState) => {
    dispatch(setPage({ page, params }));

    if (cleanup) {
      cleanup?.intervals.forEach(i => clearInterval(i));
    }

    if (page == 'index') {
      cleanup = indexPage(dispatch, getState);
    }

    if (page == 'token') {
      cleanup = tokenPage(dispatch, getState);
    }
  };

///////

function unique(a) {
  return [...new Set(a)];
}

function tokenPage(dispatch, getState) {
  const s = getState();

  let tid = s.page.params.tid;
  const period = s.page.params.period;

  if (!tid) return;

  const getPairData = () => {
    let s = getState();

    if (s.config.tokens.length <= 0) return;
    // need xrc ICP/USD and BTC/USD so we can convert to quote currencies
    let pids = unique([
      1,
      6,
      ...getPairIds(s.config, tid, 3),
      ...getPairIds(s.config, tid, 0),
    ]); // against ICP and USD

    var interval = 't1d';
    if (period <= 31) interval = 't1h';
    if (period <= 7) interval = 't5m';

    dispatch(fetchPairs({ interval, pids, back: period }));
  };

  const getTokenData = () => {
    let s = getState();
    if (s.config.tokens.length <= 0) return;

    dispatch(
      fetchTokens({
        interval: 't1d',
        ids: unique([0, 1, 2, 3, tid]),
        back: period,
      })
    );
  };

  let int_getProposals = setInterval(() => {
    dispatch(getProposals({ tid }));
  }, 60 * 1000 * 5);

  let int_getPairData = setInterval(getPairData, 5000);
  let int_getTokenData = setInterval(getTokenData, 1000 * 60 * 10);

  getTokenData();
  getPairData();

  return {
    intervals: [int_getProposals, int_getPairData, int_getTokenData],
  };
}

let lastIndexRefresh = 0;
function indexPage(dispatch, getState) {
  const MAX_PAIRS_PER_REQ = 50;
  const MAX_TOKENS_PER_REQ = 5;

  const getPairData = () => {
    let s = getState();
    if (s.config.tokens.length <= 0) return;
    lastIndexRefresh = now;
    let pid_groups = splitNumberInGroups(
      s.config.pairs.length,
      MAX_PAIRS_PER_REQ
    );

    // We will split requests in groups to not reach the max response size
    pid_groups.forEach(pids => {
      dispatch(fetchPairs({ interval: 't1h', pids, back: 7 }));
      // dispatch(fetchPairs({ interval: 't5m', pids, back: 12 * 6 }));
    });

    //1day(24H) data and 31day data fetched separately to optimize first render( default 7 days )
    pid_groups.forEach(pids => {
      dispatch(fetchPairs({ interval: 't5m', pids, back: 1 }));
      dispatch(fetchPairs({ interval: 't1d', pids, back: 31 }));
      // dispatch(fetchPairs({ interval: 't5m', pids, back: 12 * 6 }));
    });
  };

  // let pids = getPairIds(config, data.tokenid, 3);

  // dispatch(fetchTokens({ interval: 't1d', ids:[data.tokenid], back: period }));
  // dispatch(fetchPairs({ interval: 't1d', pids, back: 24 * period }));

  const getTokenData = () => {
    let s = getState();
    if (s.config.tokens.length <= 0) return;

    let tid_groups = splitNumberInGroups(
      s.config.tokens.length,
      MAX_TOKENS_PER_REQ
    );

    tid_groups.forEach(ids => {
      dispatch(fetchTokens({ interval: 't1d', ids, back: 8 }));
    });
  };

  let int_getProposals = setInterval(() => {
    dispatch(getProposals());
  }, 60 * 1000 * 5);

  let int_getPairData = setInterval(getPairData, 5000);
  let int_getTokenData = setInterval(getTokenData, 1000 * 60 * 5);

  let now = Date.now() / 1000;

  if (lastIndexRefresh < now - 5) {
    getTokenData();
    getPairData();
  }

  return {
    intervals: [int_getProposals, int_getPairData, int_getTokenData],
  };
}

///////

export default pageSlice.reducer;

function splitNumberInGroups(num, groupSize) {
  const result = [];

  for (let i = 0; i < num; i += groupSize) {
    const group = [];
    for (let j = i; j < i + groupSize && j < num; j++) {
      group.push(j);
    }
    result.push(group);
  }

  return result;
}
