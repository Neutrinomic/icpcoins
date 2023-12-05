import { createSlice } from '@reduxjs/toolkit';
import ic from '../icblast.js';
import { toState } from '@infu/icblast';
import { idlFactory as aggridl } from '../aggregator.idl.js';

const initialState = {
  tokens: [],
  pairs: [],
  baseCurrency: 0,
  proposalFilter: 'filtered',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setAggrConfig: (state, action) => {
      state.tokens = action.payload.tokens;
      state.pairs = action.payload.pairs;
    },
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    setProposalFilter: (state, action) => {
      state.proposalFilter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAggrConfig, setBaseCurrency, setProposalFilter } =
  configSlice.actions;

export const fetchConfig = () => async dispatch => {
  let aggr = await ic('u45jl-liaaa-aaaam-abppa-cai', aggridl);

  let config = toState(await aggr.get_config());
  dispatch(setAggrConfig(config));
};

export default configSlice.reducer;
