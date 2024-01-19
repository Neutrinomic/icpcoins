import { createSlice } from '@reduxjs/toolkit';
import ic from '../icblast.js';
import { toState } from '@infu/icblast';
import { i2t, lastStartedTick } from '../utils';
import { idlFactory as aggridl } from '../aggregator.idl.js';
import {first_tick} from '../config.js';
const initialState = {
  t5m: {},
  t1h: {},
  t1d: {},
};

export const pairSlice = createSlice({
  name: 'pairs',
  initialState,
  reducers: {
    setPairs: (state, action) => {
      let { start, end, interval, pids, data } = action.payload;

      // incoming structure [interval][time][pair]
      // stored structure [interval][pair]{ start, end, data: [time]}

      // state[action.payload.interval].data = d;

      // for each pair
      for (let pair = 0; pair < data[0].length; pair += 1) {
        let pid = pids.length ? pids[pair] : pair;
        if (!state[interval][pid])
          state[interval][pid] = { start, end, data: [] };

        let cur_start = state[interval][pid].start;

        if (cur_start > start) {
          // overwrite
          state[interval][pid].start = start;
          state[interval][pid].end = end;
          state[interval][pid].data = [];
          for (let i = 0; i < data.length; i += 1) {
            state[interval][pid].data[i] = data[i][pair];
          }
        } else {
          // append
          // merge new data with old one
          let delta = i2t(interval);
          for (let i = 0; i < data.length; i += 1) {
            // for each tick
            let pad = (start - cur_start) / delta;
            let nidx = i + pad;

            // let prev = state[interval][t][pid]
            state[interval][pid].data[nidx] = data[i][pair];
          }

          state[interval][pid].end = end;
        }
        // state[interval][pair].start = start;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPairs } = pairSlice.actions;

export const fetchPairs =
  ({ interval, pids, back }) =>
  async (dispatch, getState) => {
    let s = getState();

    let aggr = await ic('u45jl-liaaa-aaaam-abppa-cai', aggridl);

    // let from =
    //   s.pairs[interval]?.[pair]?.end ||
    //   Date.now() / 1000 - i2t(interval) * back;
    let to = lastStartedTick(i2t(interval), Date.now() / 1000);
    let from = Math.max(to - 60*60*24 * back, first_tick);
    
    // mypairs has all pairs from pid
    let mypairs = Object.keys(s.pairs[interval])
      .filter(id => pids.indexOf(Number(id)) !== -1)
      .map(id => s.pairs[interval][id]);
    // try to optimise the from time and not fetch too many records
    // check if all pairs have data by checking if they have end time

    if (mypairs.length && mypairs.reduce((a, b) => a && b.end, true)) {
      // get the max start time of all pairs
      let max = mypairs.reduce((a, b) => Math.max(a, b.start), 0);
      let minend = mypairs.reduce(
        (a, b) => Math.min(a, b.end),
        9999999999999999
      );
      if (max <= from && minend > from) from = minend;
    }

    // console.log({
    //   back,
    //   start: s.pairs[interval]?.[pair]?.start,
    //   from,
    //   end: s.pairs[interval]?.[pair]?.end,
    //   condition: s.pairs[interval]?.[pair]?.start <= from,
    //   pair,
    // });

    
    let pairs = await aggr.get_pairs(
      { [interval]: null },
      pids,
      from * 1000000000,
      to * 1000000000
    );
    let start = Number(pairs.ok.first / 1000000000n);
    let end = Number(pairs.ok.last / 1000000000n);
    pairs = pairs.ok.data;
    dispatch(setPairs({ interval, data: pairs, pids, start, end }));
  };

export default pairSlice.reducer;
