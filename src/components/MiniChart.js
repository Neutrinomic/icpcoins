import { LineChart, Line, YAxis, XAxis, AreaChart, Area } from 'recharts';
import moment from 'moment';

//https://github.com/recharts/recharts/issues/956

const normalize = data => {
  const interv = 7200;

  let now = Math.floor(Date.now() / 1000 / interv) * interv;
  let merged = Array(73)
    .fill(0)
    .map((_, idx) => ({ t: now - idx * interv }));

  for (let po of data) {
    let pos = (now - po.t) / interv;
    if (merged[pos]) merged[pos]['p'] = po.p;
  }
  return merged;
};

export const MiniChart = ({ data }) => {
  const period = 24 * 7;

  const merged = data; //normalize(data);

  return (
    <>
      <LineChart
        width={100}
        height={50}
        data={merged}
        // margin={{ top: 10, bottom: 10 }}
      >
        <Line
          isAnimationActive={false}
          //   key={idx}
          type="line"
          dataKey={'p'}
          strokeWidth={1}
          //   stroke={dexColors[idx]}
          dot={false}
        />

        <YAxis
          orientation="right"
          dx={15}
          stroke="#8893a8"
          domain={['auto', 'auto']}
          axisLine={false}
          tickLine={false}
          hide={true}
        />
        <XAxis
          domain={['auto', 'auto']}
          type="number"
          dataKey="t"
          scale="time"
          dy={15}
          hide={true}
          tickFormatter={t =>
            period <= 24
              ? moment.unix(t).format('HH:mm')
              : moment.unix(t).format('Do')
          }
          interval={30}
          tick={{ fill: '#8893a8' }}
          axisLine={false}
          tickLine={false}
        />
      </LineChart>
    </>
  );
};

export const MiniChartGradient = ({ data }) => {
  const period = 24 * 7;

  const merged = data; //normalize(data);

  return (
    <>
      <AreaChart
        width={100}
        height={50}
        data={merged}
        // margin={{ top: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8893a8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="p"
          stroke="#8893a8"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <YAxis
          orientation="right"
          dx={15}
          stroke="#8893a8"
          domain={['auto', 'auto']}
          axisLine={false}
          tickLine={false}
          hide={true}
        />
        <XAxis
          domain={['auto', 'auto']}
          type="number"
          dataKey="t"
          scale="time"
          dy={15}
          hide={true}
          tickFormatter={t =>
            period <= 24
              ? moment.unix(t).format('HH:mm')
              : moment.unix(t).format('Do')
          }
          interval={30}
          tick={{ fill: '#8893a8' }}
          axisLine={false}
          tickLine={false}
        />
      </AreaChart>
    </>
  );
};
