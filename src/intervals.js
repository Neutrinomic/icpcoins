import { store } from './store.js';
import { fetchConfig } from './reducers/config';
// import { fetchPairs } from './reducers/pairs';
// import { fetchTokens } from './reducers/tokens';
// import { getProposals } from './reducers/proposals';

setTimeout(async () => {
  await store.dispatch(fetchConfig());
  // getTokenData();
  // getPairData();
}, 200);

// const MAX_PAIRS_PER_REQ = 50;
// const MAX_TOKENS_PER_REQ = 5;

// const getPairData = () => {
//   let s = store.getState();
//   let pid_groups = splitNumberInGroups(
//     s.config.pairs.length,
//     MAX_PAIRS_PER_REQ
//   );

//   // We will split requests in groups to not reach the max response size
//   pid_groups.forEach(pids => {
//     store.dispatch(fetchPairs({ interval: 't1h', pids, back: 24 * 7 }));
//     // store.dispatch(fetchPairs({ interval: 't5m', pids, back: 12 * 6 }));
//   });
// };

// // let pids = getPairIds(config, data.tokenid, 3);
    
// // dispatch(fetchTokens({ interval: 't1d', ids:[data.tokenid], back: period }));
// // dispatch(fetchPairs({ interval: 't1d', pids, back: 24 * period }));



// const getTokenData = () => {
//   let s = store.getState();
//   let tid_groups = splitNumberInGroups(
//     s.config.tokens.length,
//     MAX_TOKENS_PER_REQ
//   );

//   tid_groups.forEach(ids => {
//     store.dispatch(fetchTokens({ interval: 't1d', ids, back: s.ui.period }));
//   });
// };

// setInterval(() => {
//   store.dispatch(getProposals());
// }, 60 * 1000 * 5);

// setInterval(getPairData, 5000);
// setInterval(getTokenData, 1000 * 60 * 10);

// function splitNumberInGroups(num, groupSize) {
//   const result = [];

//   for (let i = 0; i < num; i += groupSize) {
//     const group = [];
//     for (let j = i; j < i + groupSize && j < num; j++) {
//       group.push(j);
//     }
//     result.push(group);
//   }

//   return result;
// }
