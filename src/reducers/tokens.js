/* global BigInt */

import { toState } from '@infu/icblast';
import { createSlice } from '@reduxjs/toolkit';
import { idlFactory as aggridl } from '../aggregator.idl.js';
import { first_tick } from '../config';
import { dcfg } from '../dcfg';
import ic from '../icblast.js';
import { i2t, lastStartedTick, p2i } from '../utils';
import { calculatePathPrice, findSwapPaths } from '../utils/dfs';
import { fetchPairs } from './pairs';
import { now } from 'lodash';

const initialState = {
  t1d: {},
};

const SNS1_lock = 5284 * 800000;

export const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      let { start, end, interval, ids, data } = action.payload;

      // incoming structure [interval][time][pair]
      // stored structure [interval][pair]{ start, end, data: [time]}

      // state[action.payload.interval].data = d;
      // for each pair
      for (let pair = 0; pair < data[0].length; pair += 1) {
        let pid = ids.length ? ids[pair] : pair;
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
    // setTokens: (state, action) => {
    //   let { start, end, interval, ids, data } = action.payload;

    //   // for each pair
    //   for (let pair = 0; pair < data[0].length; pair += 1) {
    //     let tid = ids.length ? ids[pair] : pair;
    //     if (!state[interval][tid])
    //       state[interval][tid] = { start, end, data: [] };

    //     let cur_start = state[interval][tid].start;

    //     // merge new data with old one
    //     let delta = i2t(interval);
    //     for (let i = 0; i < data.length; i += 1) {
    //       let pad = (start - cur_start) / delta;
    //       let nidx = i + pad;

    //       state[interval][tid].data[nidx] = data[i][tid];
    //     }

    //     state[interval][tid].end = end;
    //   }
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setTokens } = tokenSlice.actions;

export const fetchTokens =
  ({ interval, ids, back }) =>
  async (dispatch, getState) => {
    let s = getState();

    let aggr = await ic('u45jl-liaaa-aaaam-abppa-cai', aggridl);

    let to = lastStartedTick(i2t(interval), Date.now() / 1000);
    let from = Math.max(to - i2t(interval) * back, first_tick);

    let tokens = await aggr.get_tokens(ids, from * 1000000000, to * 1000000000);

    let start = Number(tokens.ok.first / 1000000000n);
    let end = Number(tokens.ok.last / 1000000000n);

    tokens = toState(tokens.ok.data);

    dispatch(setTokens({ interval, data: tokens, ids, start, end }));
  };

export const getDirectPairs =
  state =>
  (t1, t2, pid, time = false, interval = 't1h') => {
    let y = state.config.pairs[pid];

    if (y.tokens[0] === t1 && y.tokens[1] === t2) {
      let p = selectPairRate(pid, time, interval)(state);
      return { p, rev: false };
    }

    if (y.tokens[1] === t1 && y.tokens[0] === t2) {
      let p = selectPairRate(pid, time, interval)(state);
      return { p, rev: true };
    }

    return false;
  };

export const selectPairRate =
  (pid, time = false, interval = 't1h') =>
  state => {
    if (!state.pairs[interval][pid]) throw new Error('Pair not found');
    let idx = !time
      ? state.pairs[interval][pid].data.length - 1
      : Math.floor((time - state.pairs[interval][pid].start) / i2t(interval));

    for (let i = 0; i < 10; i++) {
      let r = state.pairs[interval][pid].data[idx - i];
      if (r) return r;
    }
    return null;
  };

export const selectTokenDay =
  (pid, time = false) =>
  state => {
    if (!state.tokens.t1d[pid]) throw new Error('Token not found');
    let idx = !time
      ? state.tokens.t1d[pid].data.length - 1
      : Math.floor((time - state.tokens.t1d[pid].start) / (60 * 60 * 24));

    let r = state.tokens.t1d[pid].data[idx];
    if (r) return r;

    return null;
  };

export const selectTokenInfo = tid => state => {
  if (!state.tokens.t1d[tid]) throw new Error('Token info not found ' + tid);
  for (let i = 1; i <= 10; i++) {
    let r = state.tokens.t1d[tid].data[state.tokens.t1d[tid].data.length - i];
    if (r) return r;
  }
  return null;
};

export const getPriceBetween =
  state =>
  (t1, t2, interval = 't1h') => {
    let tpaths = findSwapPaths(
      state.config.pairs,
      t1.toString(),
      t2.toString(),
      3
    );

    let pp = tpaths.map(x =>
      calculatePathPrice(x, getDirectPairs(state), false, interval)
    );
    let price = pp.reduce((a, b) => a + b.price, 0) / pp.length;

    return price;
  };

const calculatePairPath = (paths, interval, from, to) => state => {
  let dt = i2t(interval);
  const ticks = Math.floor((to - from) / dt) + 1;

  // const pairs = state.pairs[interval];

  let newpairs = paths.map((x, idx) => {
    return Array(ticks)
      .fill(0)
      .map((_, i) => {
        return calculatePathPrice(
          x,
          getDirectPairs(state),
          from + dt * i,
          interval
        );
      });
  });

  return newpairs;
};

export function getChart(interval, paths, tstart, tlast, state) {
  const wdelta = i2t(interval);
  let pathpair = calculatePairPath(paths, interval, tstart, tlast)(state);

  const chart = Array(pathpair[0].length)
    .fill(0)
    .map((_, i) => {
      return {
        p:
          Array(pathpair.length)
            .fill(0)
            .map((_, j) => {
              return pathpair[j][i].price;
            })
            .reduce((a, b) => a + b, 0) / pathpair.length,
        t: tstart + i * wdelta,
      };
    });
  return chart;
}

let selectTokenList_mem = {
  last: 0,
  data: false,
  baseCurrency: false,
};

export const selectTokenList = state => {
  let mem_now = Date.now();
  if (
    selectTokenList_mem.last + 1000 * 2 > mem_now &&
    selectTokenList_mem.baseCurrency === state.config.baseCurrency
  )
    return selectTokenList_mem.data;

  try {
    const config = state.config;
    const pairs = state.pairs;
    const baseCurrency = state.config.baseCurrency;

    const tlast = lastStartedTick(60 * 60, Date.now() / 1000);
    const tstart1 = tlast - 60 * 60 * 24 * 1; //starting timestamp for 1 day/ 24hours ago
    const tstart7 = tlast - 60 * 60 * 24 * 7; //starting timestamp for 7 days ago
    const tstart31 = tlast - 60 * 60 * 24 * 31; //starting timestamp for 31 days ago

    let data = config.tokens
      .map((x, idx) => {
        try {
          if (idx === 10) return null;
          if (idx === 0 || idx === 4) return false;
          const tid = '' + idx;
          const symbol = x.symbol;
          const name = x.name;
          const locking = x.locking;

          let paths = findSwapPaths(
            config.pairs,
            tid,
            baseCurrency.toString(),
            3
          );
          if (paths.length === 0) return null;
          let dayChart = getChart('t5m', paths, tstart1, tlast, state);
          let weekchart = getChart('t1h', paths, tstart7, tlast, state);
          let monthChart = getChart('t1d', paths, tstart31, tlast, state);

          // console.log("Daychart : ", dayChart);
          // console.log("Weekchart : ", weekchart);
          // console.log("Monthchart : ", monthChart);

          const price24ago = weekchart.find(
            x => x.t === tlast - 60 * 60 * 24
          ).p;
          const price7ago = weekchart.find(
            x => x.t === tlast - 60 * 60 * 24 * 7
          ).p;
          const price31ago = monthChart.find(
            x => x.t === tlast - 60 * 60 * 24 * 31
          ).p;

          let pp = paths.map(x =>
            calculatePathPrice(x, getDirectPairs(state), false, 't1h')
          );
          let price = pp.reduce((a, b) => a + b.price, 0) / pp.length;

          let ti = selectTokenInfo(idx)(state);

          let total = Number(
            ti ? BigInt(ti.total_supply) / 10n ** BigInt(x.decimals) : 0n
          );
          if (symbol === 'DKP') total -= SNS1_lock;

          let treasuryToken = Number(
            ti?.locking
              ? BigInt(ti.locking.treasury) / 10n ** BigInt(x.decimals)
              : 0n
          );

          let total_locked = Number(
            ti?.locking
              ? BigInt(ti.locking.total_locked) / 10n ** BigInt(x.decimals)
              : 0n
          );
          if (symbol === 'DKP') total_locked -= SNS1_lock;

          let real_circulating = 0;
          let circulating = 0;

          if ('ogy' in locking) {
            real_circulating = circulating = Number(
              BigInt(ti.circulating_supply) / 10n ** BigInt(x.decimals)
            );
          } else {
            real_circulating = total - treasuryToken - total_locked;
            circulating = total - treasuryToken;
          }

          let marketcap = circulating * price;

          let treasury = {
            [idx]: treasuryToken,
          };
          if (ti?.locking)
            for (let tr of ti.locking.other_treasuries) {
              let tprice = getPriceBetween(state)(tr[0], baseCurrency);

              treasury[tr[0]] =
                (Number(
                  BigInt(tr[1]) /
                    10n ** BigInt(state.config.tokens[tr[0]].decimals - 2)
                ) *
                  tprice) /
                100;
            }

          const depth50Bid = pp.reduce((a, b) => a + b.depthBid, 0);
          const depth50Ask = pp.reduce((a, b) => a + b.depthAsk, 0);

          const change24 = ((price - price24ago) / price24ago) * 100;
          const change7 = ((price - price7ago) / price7ago) * 100;
          const change31 = ((price - price31ago) / price31ago) * 100;
          let usdprice = getPriceBetween(state)('0', baseCurrency);
          const volume24 = pp.reduce((a, b) => a + b.volume24h, 0) * usdprice;

          //console.log("Price Changes : ", change24, change7, change31);
          let pathpair7 = calculatePairPath(
            paths,
            't1h',
            tstart7,
            tlast
          )(state);
          let pathpair31 = calculatePairPath(
            paths,
            't1d',
            tstart31,
            tlast
          )(state); // TODO: Optimize repeated calculatePairPath calls
          let volume31 = 0;
          let volume7 = 0;
          const ticksPerDay7 = 24; // 7day data is fetched with t1h interval ( 1 tick per hour )
          const ticksPerDay31 = 1; // 31day data is fetched with t1d interval ( 1 tick per day )
          try {
            paths.forEach((x, idx) => {
              volume7 += Array(7)
                .fill(0)
                .reduce(
                  (p, c, i) =>
                    p +
                    pathpair7[idx][pathpair7[idx].length - 1 - i * ticksPerDay7]
                      .volume24h *
                      usdprice,
                  0
                );

              volume31 += Array(31)
                .fill(0)
                .reduce(
                  (p, c, i) =>
                    p +
                    pathpair31[idx][
                      pathpair31[idx].length - 1 - i * ticksPerDay31
                    ].volume24h *
                      usdprice,
                  0
                );
            });
          } catch (e) {
            console.log(e);
          }

          return {
            id: idx,
            paths: paths.map((x, idx) => ({ path: x, data: pp[idx] })),
            price,
            symbol,
            name,
            locking,
            total,
            total_locked,
            treasury,
            circulating,
            real_circulating,
            marketcap,
            volume24,
            volume7,
            volume31,
            change24,
            change7,
            change31,
            depth50Bid,
            depth50Ask,
            dayChart,
            weekchart,
            monthChart,
          };
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => b.marketcap - a.marketcap);

    selectTokenList_mem = {
      last: mem_now,
      data,
      baseCurrency: state.config.baseCurrency,
    };

    return data;
  } catch (e) {
    return false;
  }
};

export const selectSingleTokenInfo =
  ({ symbol, period }) =>
  state => {
    try {
      var interval = p2i(period);

      const config = state.config;
      const baseCurrency = state.config.baseCurrency;
      const tlast = lastStartedTick(60 * 60, Date.now() / 1000);
      const tlast_1d = lastStartedTick(60 * 60 * 24, Date.now() / 1000);
      const tnow = Date.now()/1000;
      //state.pairs.t5m[0].end;
      // console.log('last', tlast, new Date(tlast * 1000).toLocaleString());
      const tstart = Math.max(first_tick, tlast - 60 * 60 * 24 * period); //?

      let idx = config.tokens.findIndex(x => x.symbol === symbol);
      let x = config.tokens[idx];

      if (idx === 0 || idx === 4) return false;
      const tid = '' + idx;
      const name = x.name;
      const locking = x.locking;
      let usdprice = getPriceBetween(state)('0', baseCurrency);
      let icpprice = getPriceBetween(state)('3', baseCurrency);

      let tokenprice = getPriceBetween(state)(idx.toString(), baseCurrency);

      let paths = findSwapPaths(config.pairs, tid, baseCurrency.toString(), 3);

      const wdelta = i2t(interval);
      let pathpair = calculatePairPath(paths, interval, tstart, tlast)(state);
      // let missing_ticks = pathpair[0].reduce((a, b) => {
      //   return a + (b.price ? 0 : 1);
      // }, 0);
      // if (missing_ticks > 400) return false;
      let prev_cs = false;

      let nti = selectTokenDay(idx, tlast)(state);
      if (!nti) nti = selectTokenDay(idx, tlast - 60 * 60 * 24)(state);

      let prev_ds = 0;
      let prev_nds = 0;
      const neurons = Array(364)
        .fill(0)
        .map((_, i) => {
          let now = Date.now() / 1000;
          let r = { t: now + i * 60 * 60 * 24 };

          if (nti?.locking) {
            let ds =
              Number(
                BigInt(nti.locking.dissolving[i]) / 10n ** BigInt(x.decimals)
              ) * tokenprice;
            let nds =
              Number(
                BigInt(nti.locking.not_dissolving[i]) /
                  10n ** BigInt(x.decimals)
              ) * tokenprice;

            prev_ds += ds;
            prev_nds += nds;
            r['ds'] = prev_ds;
            r['nds'] = prev_nds;
          }
          return r;
        });

      let treasuryICP_prev = false;
      let treasuryT_prev = false;

      const merged = Array(pathpair[0].length)
        .fill(0)
        .map((_, i) => {
          let r = { t: tstart + i * wdelta };
          if (r.t > tnow) return false;

          // Find out the difference in circulating supply each day + or -
          let acc_cs = undefined;
          let treasuryICP = undefined;
          let treasuryT = undefined;
          let treasuryICP_acc = 0;
          let treasuryT_acc = 0;

          try {
            let xst = lastStartedTick(60 * 60 * 24, tstart + i * wdelta);
            let ti = selectTokenDay(idx, xst)(state);

            let total = Number(
              ti ? BigInt(ti.total_supply) / 10n ** BigInt(x.decimals) : 0n
            );

            let treasuryToken = Number(
              ti?.locking
                ? BigInt(ti.locking.treasury) / 10n ** BigInt(x.decimals)
                : undefined
            );

            let total_locked = Number(
              ti?.locking
                ? BigInt(ti.locking.total_locked) / 10n ** BigInt(x.decimals)
                : 0n
            );
            if (total > 0) {
              let cs = total_locked; //                total - treasuryToken ? treasuryToken : 0n - total_locked;

              if (prev_cs === false) prev_cs = cs;

              acc_cs = (cs - prev_cs) * tokenprice;
            }

            treasuryT = treasuryToken;
            treasuryICP = Number(
              ti?.locking
                ? BigInt(ti.locking.other_treasuries[0][1]) / 10n ** 8n
                : undefined
            );

            if (treasuryICP_prev === false) treasuryICP_prev = treasuryICP || 0;
            if (treasuryT_prev === false) treasuryT_prev = treasuryT || 0;

            treasuryICP_acc =
              treasuryICP !== undefined
                ? (treasuryICP - treasuryICP_prev) * icpprice
                : undefined;

            treasuryT_acc =
              treasuryT !== undefined
                ? (treasuryT - treasuryT_prev) * tokenprice
                : undefined;
          } catch (e) {
            // console.log(e)
          }
 
          r['tt'] = treasuryT_acc;
          r['ticp'] = treasuryICP_acc;
          r['cs'] = acc_cs;
          for (let pidx = 0; pidx < pathpair.length; pidx++) {
            r['p' + pidx] = pathpair[pidx][i].price;
            r['v' + pidx] = pathpair[pidx][i].volume24h
              ? pathpair[pidx][i].volume24h * usdprice
              : 0;
            r['l' + pidx] = pathpair[pidx][i].depthBid;
            r['la' + pidx] = pathpair[pidx][i].depthAsk;
          }

          return r;
        }).filter(Boolean);
      let ticksPerDay = (60 * 60 * 24) / i2t(interval);
      // let pp = paths.map(x => calculatePathPrice(x, getDirectPairs(state)));
      let resp = {
        tokenid: idx,
        tokencfg: x,
        lines: paths.length,
        merged,
        neurons,
        sources: paths
          .map((z, idx) => {
            // if (z.pairs.length > 2) return false;
            let pairid = z.pairs[0];
            let pairinfo = config.pairs[pairid];
            let dexid = Object.keys(pairinfo.config)[0];
            let volume30 = 0;
            let volume7 = 0;
            try {
              volume7 = Array(7)
                .fill(0)
                .reduce(
                  (p, c, i) =>
                    p +
                    pathpair[idx][pathpair[idx].length - 1 - i * ticksPerDay]
                      .volume24h *
                      usdprice,
                  0
                );

              volume30 = Array(30)
                .fill(0)
                .reduce(
                  (p, c, i) =>
                    p +
                    pathpair[idx][pathpair[idx].length - 1 - i * ticksPerDay]
                      .volume24h *
                      usdprice,
                  0
                );
            } catch (e) {}

            return {
              source: { id: dexid, ...dcfg[dexid] },
              price: pathpair[idx][pathpair[idx].length - 1].price,
              volume24:
                pathpair[idx][pathpair[idx].length - 1].volume24h * usdprice,
              volume7,
              volume30,
              liquidity: pathpair[idx][pathpair[idx].length - 1].depthBid,
              liqask: pathpair[idx][pathpair[idx].length - 1].depthAsk,
            };
          })
          .filter(Boolean),
      };

      return resp;
    } catch (e) {
      // console.log(e);
      return null;
    }
  };

function getUniquePairs(paths) {
  let combinedPairs = [];

  // Combine all pairs from each path
  paths.forEach(path => {
    combinedPairs = combinedPairs.concat(path.pairs);
  });

  // Filter out duplicates
  const uniquePairs = [...new Set(combinedPairs)];

  return uniquePairs;
}

export const fetchTokenExtended =
  ({ tid }) =>
  (dispatch, getState) => {
    const state = getState();
    let paths = findSwapPaths(
      state.config.pairs,
      tid,
      state.config.baseCurrency.toString(),
      3
    );
    const pids = getUniquePairs(paths);
    // dispatch(fetchPairs({ interval: 't5m', pids, back: 12 * 24 * 31 }));
    dispatch(fetchPairs({ interval: 't1h', pids, back: 31 }));
  };

export default tokenSlice.reducer;
