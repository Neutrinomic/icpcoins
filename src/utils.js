export function getPairIds(config, t1, t2) {
  return config.pairs
    .map((x, pid) => {
      if (
        (Number(x.tokens[0]) === t1 && Number(x.tokens[1]) === t2) ||
        (Number(x.tokens[1]) === t1 && Number(x.tokens[0]) === t2)
      )
        return pid;
      else return false;
    })
    .filter(x => x !== false);
}

export function getPairPrices(config, pairs, t1, t2, pids = []) {
  return config.pairs
    .map((x, pid) => {
      let mpid = pids.length ? pids.findIndex(x => x === pid) : pid;
      let rev = false;
      if (
        (Number(x.tokens[0]) === t1 && Number(x.tokens[1]) === t2) ||
        (Number(x.tokens[1]) === t1 && Number(x.tokens[0]) === t2)
      ) {
        if (Number(x.tokens[1]) === t1 && Number(x.tokens[0]) === t2)
          rev = true;
      } else {
        return false;
      }

      let data = pairs.map(z => {
        return z[mpid];
      });
      return { data, rev, t1, t2, config: x.config };
      // pairs.ok.data[pid];
    })
    .filter(Boolean);
}

export function getPrices(d, to = false) {
  let r = [];
  let size = d[0].data.length;
  for (let i = 0; i < size; i++) {
    let rx = [];
    for (let j = 0; j < d.length; j++) {
      if (!d[j].data[i]) continue;
      let p = (d[j].data[i][2] + d[j].data[i][3]) / 2;
      if (d[j].rev) p = 1 / p;
      if (to) {
        let toP = (to[0].data[i][2] + to[0].data[i][3]) / 2;

        p = p * toP;
      }
      rx.push(p);
    }
    // average of rx
    r.push(rx.reduce((a, b) => a + b, 0) / rx.length);
  }
  return r;
}

export function convertCurrency(d, to = false) {
  let size = d[0].data.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < d.length; j++) {
      if (!d[j].data[i]) continue;
      let rev = d[j].rev;
      let price = (to[0].data[i][2] + to[0].data[i][3]) / 2;
      if (rev) price = 1 / price;
      d[j].data[i][0] = d[j].data[i][0] * price;
      d[j].data[i][1] = d[j].data[i][1] * price;
      d[j].data[i][2] = d[j].data[i][2] * price;
      d[j].data[i][3] = d[j].data[i][3] * price;
      // 4 is in USD always
      // d[j].data[i][5] = d[j].data[i][5].map(x => x * price);
      // d[j].data[i][6] = d[j].data[i][6].map(x => x * price);
    }
  }
}

export function getPairRev(pairs, pid) {
  for (let i = 1; i < 50; i++) {
    let p = pairs[pairs.length - i][0];
    if (!p) continue;
    return p;
  }
}

export function i2t(interval) {
  switch (interval) {
    case 't5m':
      return 60 * 5;
    case 't1h':
      return 60 * 60;
    case 't1d':
      return 60 * 60 * 24;
    default:
      throw new Error('Unknown interval');
  }
}

export function p2i(period) {
  var interval = 't1d';
  if (period <= 31) interval = 't1h';
  if (period <= 7) interval = 't5m';
  return interval;
}

export function candleIntervalToMinutes(candleInterval) {
  var mins = 60;

  switch (candleInterval) {
    case '5m': mins = 5; break;
    case '1h':
      mins = 60;
      break;
    case '3h':
      mins = 3 * 60;
      break;
    case '1d':
      mins = 24 * 60;
      break;
    case '3d':
      mins = 3 * 24 * 60;
      break;
    case '7d':
      mins = 7 * 24 * 60;
      break;
    default:
      mins = 60;
  }

  return mins;
}

export function period2header(period, suffix) {
  let header = '';
  switch (period) {
    case 1:
      header = '24H';
      break;
    case 7:
      header = '7D';
      break;
    case 31:
      header = '31D';
      break;
    default:
      header = '...'; // For initial renders, where period is undefined
  }
  if (suffix) header = header + ' ' + suffix;
  return header;
}

export const startTick = 1660052760;

export function lastStartedTick(tickInterval, currentTimestamp) {
  const elapsedTime = currentTimestamp - startTick;
  let tn = Math.ceil(elapsedTime / tickInterval);
  return tn * tickInterval + startTick;
}

export const bigTickFormatter = t =>
  t < 1000000 ? (t / 1000).toFixed(1) + 'k' : (t / 1000000).toFixed(2) + 'm';

export const customTickFormatter = t =>
  t < 0.0001 ? t.toExponential(2) :
  t < 1 ? t.toFixed(4) :
  t < 10 ? t.toFixed(3) :
  t < 100 ? t.toFixed(2) :
  t < 1000 ? t.toFixed(1) :
  t < 10000 ? t.toFixed(0) :
  bigTickFormatter(t);