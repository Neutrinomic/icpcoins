import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Area,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  Label,
  Tooltip,
} from 'recharts';
import moment from 'moment';
import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Skeleton,
  Box,
  Stack,
  Link,
  Button,
  Center,
  ButtonGroup,
  useColorModeValue,
  useMediaQuery,
  Tooltip as Tip,
} from '@chakra-ui/react';
import { smartNumber } from './Inline';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useInterval } from 'react-use';
import { InfoIcon } from '@chakra-ui/icons';
import ic from '../icblast.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectSingleTokenInfo } from '../reducers/tokens';
import {
  getPairPrices,
  getPrices,
  convertCurrency,
  getPairIds,
  getPairRev,
} from '../utils';

//https://github.com/recharts/recharts/issues/956
const dexColors = ['#00a0e5', '#c55de8', '#8BAB43', '#948c52', '#1ca254'];
export const PriceChart = ({ symbol }) => {
  const config = useSelector(state => state.config);
  const baseCurrency = useSelector(state => state.config.baseCurrency);
  const [isLarge] = useMediaQuery('(min-width: 1024px)');

  const bg2 = useColorModeValue(
    'linear-gradient(180deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 14%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 0%, rgba(27,32,43,1) 100%)'
  );
  const tableCss = {
    '&::-webkit-scrollbar': {
      height: '18px',
    },
    '&::-webkit-scrollbar-track': {
      background: useColorModeValue('#fff', '#1b202b'),
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: useColorModeValue('#d3d6dc', '#383d47'),
      borderRadius: '9px',
      border: useColorModeValue('4px solid #fff', '4px solid #1b202b'),
    },
  };

  const [period, setPeriod] = useState(24 * 30);
  let data = useSelector(selectSingleTokenInfo({ period, symbol }));
  if (!data) return null;
  const isDex = data
    ? data.sources.findIndex(z => z.source.id === 'xrc') === -1
    : false;
  const locking = 'sns' in data.tokencfg.locking;
  const activeDotStyle = { r: 1, stroke: '#445566', zIndex: 1000 };

  const bigTickFormatter = t =>
    t < 1000000 ? (t / 1000).toFixed(1) + 'k' : (t / 1000000).toFixed(2) + 'm';

  return (
    <>
      <Box mt="15px" pt="15px" ml="-15px" mr="-15px">
        <Box maxW="1278px" m="auto">
          <ResponsiveContainer width={'100%'} height={400}>
            <LineChart
              data={data.merged}
              margin={{ top: 10, bottom: 10 }}
              syncId="main"
            >
              {/* <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#129a74" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.3} />
            </linearGradient>
          </defs> */}
              {Array(data.lines)
                .fill(0)
                .map((_, idx) => (
                  <Line
                    isAnimationActive={false}
                    key={idx}
                    type="line"
                    dataKey={'p' + idx}
                    strokeWidth={2}
                    stroke={dexColors[idx]}
                    dot={false}
                    activeDot={activeDotStyle}
                  />
                ))}

              <YAxis
                orientation="right"
                dx={5}
                stroke="#8893a8"
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={{
                  stroke: '#334455',
                }}
                tick={{ fontSize: '12px' }}
              />
              <XAxis
                hide={false}
                domain={['auto', 'auto']}
                type="number"
                dataKey="t"
                scale="time"
                dy={5}
                dx={35}
                tickFormatter={t =>
                  period <= 24
                    ? moment.unix(t).format('HH:mm')
                    : moment.unix(t).format('Do MMM')
                }
                interval={isLarge ? 64 : 64 * 4}
                tick={{ fill: '#8893a8' }}
                tickLine={{
                  stroke: '#334455',
                }}
                axisLine={{ stroke: '#334455' }}
              />
              <Tooltip
                content={<CustomTooltip />}
                isAnimationActive={false}
                cursor={{ stroke: '#445566' }}
              />
            </LineChart>
          </ResponsiveContainer>

          {isDex ? (
            <>
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '0px',
                    top: '-8px',
                    fontSize: '12px',
                  }}
                  color="gray.500"
                >
                  Depth +100% (Ask)
                </Box>
                <ResponsiveContainer width={'100%'} height={100}>
                  <AreaChart
                    height={150}
                    data={data.merged}
                    margin={{
                      top: 10,
                      bottom: 10,
                    }}
                    syncId="main"
                  >
                    {Array(data.lines)
                      .fill(0)
                      .map((_, idx) => (
                        <Area
                          isAnimationActive={false}
                          key={idx}
                          type="monotone"
                          dataKey={'la' + idx}
                          strokeWidth={2}
                          stroke={dexColors[idx]}
                          stackId="1"
                          fill={dexColors[idx]}
                          activeDot={activeDotStyle}
                          // dot={false}
                        />
                      ))}

                    <YAxis
                      orientation="right"
                      dx={5}
                      stroke="#8893a8"
                      domain={['auto', 'auto']}
                      axisLine={false}
                      tickLine={{
                        stroke: '#334455',
                      }}
                      tick={{ fontSize: '12px' }}
                      tickFormatter={bigTickFormatter}
                      reversed={true}
                    />
                    {/* <XAxis
                      hide={true}
                      domain={['auto', 'auto']}
                      type="number"
                      dataKey="t"
                      scale="time"
                      dy={15}
                      tickFormatter={t =>
                        period <= 24
                          ? moment.unix(t).format('HH:mm')
                          : moment.unix(t).format('Do')
                      }
                      interval={
                        period < 24
                          ? 30
                          : period < 24 * 5
                          ? 30
                          : period < 24 * 30
                          ? 30
                          : 30
                      }
                      tick={{ fill: '#8893a8' }}
                      axisLine={false}
                      tickLine={false}
                    /> */}
                    <Tooltip
                      content={() => null}
                      isAnimationActive={false}
                      cursor={{ stroke: '#445566' }}
                    />
                    {/* </LineChart> */}
                  </AreaChart>
                </ResponsiveContainer>
              </Box>

              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '0px',
                    top: '-8px',
                    fontSize: '12px',
                  }}
                  color="gray.500"
                >
                  Depth -50% (Bid)
                </Box>
                <ResponsiveContainer width={'100%'} height={100}>
                  <AreaChart
                    height={150}
                    data={data.merged}
                    margin={{
                      top: 10,
                      bottom: 10,
                    }}
                    syncId="main"
                  >
                    {Array(data.lines)
                      .fill(0)
                      .map((_, idx) => (
                        <Area
                          isAnimationActive={false}
                          key={idx}
                          type="monotone"
                          dataKey={'l' + idx}
                          strokeWidth={2}
                          stroke={dexColors[idx]}
                          stackId="1"
                          fill={dexColors[idx]}
                          activeDot={activeDotStyle}
                          // dot={false}
                        />
                      ))}

                    <YAxis
                      // reversed={true}
                      orientation="right"
                      dx={5}
                      stroke="#8893a8"
                      domain={['auto', 'auto']}
                      axisLine={false}
                      tickLine={{
                        stroke: '#334455',
                      }}
                      tick={{ fontSize: '12px' }}
                      tickFormatter={bigTickFormatter}
                    />
                    {/* <XAxis
                      hide={true}
                      domain={['auto', 'auto']}
                      type="number"
                      dataKey="t"
                      scale="time"
                      dy={15}
                      tickFormatter={t =>
                        period <= 24
                          ? moment.unix(t).format('HH:mm')
                          : moment.unix(t).format('Do')
                      }
                      interval={
                        period < 24
                          ? 30
                          : period < 24 * 5
                          ? 30
                          : period < 24 * 30
                          ? 30
                          : 30
                      }
                      tick={{ fill: '#8893a8' }}
                      axisLine={false}
                      tickLine={false}
                    /> */}
                    <Tooltip
                      content={() => null}
                      isAnimationActive={false}
                      cursor={{ stroke: '#445566' }}
                    />
                    {/* </LineChart> */}
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </>
          ) : null}
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                left: '0px',
                top: '-8px',
                fontSize: '12px',
              }}
              color="gray.500"
            >
              Volume24h
            </Box>
            <ResponsiveContainer width={'100%'} height={150}>
              <AreaChart
                height={150}
                data={data.merged}
                margin={{
                  top: 10,
                  bottom: 10,
                }}
                syncId="main"
              >
                {Array(data.lines)
                  .fill(0)
                  .map((_, idx) => (
                    <Area
                      isAnimationActive={false}
                      key={'xq' + idx}
                      type="monotone"
                      dataKey={'v' + idx}
                      strokeWidth={0}
                      stroke={dexColors[idx]}
                      stackId="1"
                      fill={dexColors[idx]}
                      activeDot={activeDotStyle}
                      // dot={false}
                    />
                  ))}

                <YAxis
                  orientation="right"
                  dx={5}
                  stroke="#8893a8"
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={{
                    stroke: '#334455',
                  }}
                  tick={{ fontSize: '12px' }}
                  tickLineColor="#8893a8"
                  tickFormatter={bigTickFormatter}
                ></YAxis>
                {/* <XAxis
                      hide={true}
                      domain={['auto', 'auto']}
                      type="number"
                      dataKey="t"
                      scale="time"
                      dy={15}
                      tickFormatter={t =>
                        period <= 24
                          ? moment.unix(t).format('HH:mm')
                          : moment.unix(t).format('Do')
                      }
                      interval={
                        period < 24
                          ? 30
                          : period < 24 * 5
                          ? 30
                          : period < 24 * 30
                          ? 30
                          : 30
                      }
                      tick={{ fill: '#8893a8' }}
                      axisLine={false}
                      tickLine={false}
                    ></XAxis> */}
                <Tooltip
                  content={() => null}
                  isAnimationActive={false}
                  cursor={{ stroke: '#445566' }}
                />
                {/* </LineChart> */}
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          {isDex ? (
            <>
              {locking ? (
                <>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '0px',
                        top: '-8px',
                        fontSize: '12px',
                      }}
                      color="gray.500"
                    >
                      Treasury {symbol} movement
                    </Box>
                    <ResponsiveContainer width={'100%'} height={50}>
                      <LineChart
                        height={50}
                        data={data.merged}
                        margin={{
                          top: 10,
                          bottom: 10,
                        }}
                        syncId="main"
                      >
                        <Line
                          isAnimationActive={false}
                          key={'tt'}
                          type="monotone"
                          dataKey={'tt'}
                          strokeWidth={1}
                          stroke={'#446600'}
                          stackId="1"
                          fill={'transparent'}
                          dot={false}
                          activeDot={activeDotStyle}
                        />

                        <YAxis
                          orientation="right"
                          dx={5}
                          stroke="#8893a8"
                          domain={['auto', 'auto']}
                          axisLine={false}
                          tickLine={{
                            stroke: '#334455',
                          }}
                          tick={{ fontSize: '12px' }}
                          tickLineColor="#8893a8"
                          tickFormatter={bigTickFormatter}
                        ></YAxis>
                        {/* <XAxis
                      hide={true}
                      domain={['auto', 'auto']}
                      type="number"
                      dataKey="t"
                      scale="time"
                      dy={15}
                      tickFormatter={t =>
                        period <= 24
                          ? moment.unix(t).format('HH:mm')
                          : moment.unix(t).format('Do')
                      }
                      interval={
                        period < 24
                          ? 30
                          : period < 24 * 5
                          ? 30
                          : period < 24 * 30
                          ? 30
                          : 30
                      }
                      tick={{ fill: '#8893a8' }}
                      axisLine={false}
                      tickLine={false}
                    ></XAxis> */}
                        <Tooltip
                          content={() => null}
                          isAnimationActive={false}
                          cursor={{ stroke: '#445566' }}
                        />
                        {/* </LineChart> */}
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>

                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '0px',
                        top: '-8px',
                        fontSize: '12px',
                      }}
                      color="gray.500"
                    >
                      Treasury ICP movement
                    </Box>
                    <ResponsiveContainer width={'100%'} height={50}>
                      <LineChart
                        height={50}
                        data={data.merged}
                        margin={{
                          top: 10,
                          bottom: 10,
                        }}
                        syncId="main"
                      >
                        <Line
                          isAnimationActive={false}
                          key={'ticp'}
                          type="line  "
                          dataKey={'ticp'}
                          strokeWidth={1}
                          stroke={'#446600'}
                          stackId="1"
                          fill={''}
                          dot={false}
                          activeDot={activeDotStyle}
                        />

                        <YAxis
                          orientation="right"
                          dx={5}
                          stroke="#8893a8"
                          domain={['auto', 'auto']}
                          axisLine={false}
                          tickLine={{
                            stroke: '#334455',
                          }}
                          tick={{ fontSize: '12px' }}
                          tickLineColor="#8893a8"
                          tickFormatter={bigTickFormatter}
                        ></YAxis>
                        {/* <XAxis
                      hide={true}
                      domain={['auto', 'auto']}
                      type="number"
                      dataKey="t"
                      scale="time"
                      dy={15}
                      interval={
                        period < 24
                          ? 30
                          : period < 24 * 5
                          ? 30
                          : period < 24 * 30
                          ? 30
                          : 30
                      }
                      tick={{ fill: '#8893a8' }}
                      axisLine={false}
                      tickLine={false}
                    ></XAxis> */}
                        <Tooltip
                          content={() => null}
                          isAnimationActive={false}
                          cursor={{ stroke: '#445566' }}
                        />
                        {/* </LineChart> */}
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>

                  <Box sx={{ position: 'relative' }} mt="2">
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '0px',
                        top: '-8px',
                        fontSize: '12px',
                      }}
                      color="gray.500"
                    >
                      Total locked movement
                    </Box>
                    <ResponsiveContainer width={'100%'} height={50}>
                      <AreaChart
                        height={50}
                        data={data.merged}
                        margin={{
                          top: 10,
                          bottom: 10,
                        }}
                        syncId="main"
                      >
                        <Area
                          isAnimationActive={false}
                          key={'cs'}
                          type="monotone"
                          dataKey={'cs'}
                          strokeWidth={2}
                          stroke={'#445566'}
                          stackId="1"
                          fill={'#445566'}
                          activeDot={activeDotStyle}
                          // dot={false}
                        />

                        <YAxis
                          orientation="right"
                          dx={5}
                          stroke="#8893a8"
                          domain={['auto', 'auto']}
                          axisLine={false}
                          tickLine={{
                            stroke: '#334455',
                          }}
                          tick={{ fontSize: '12px' }}
                          tickFormatter={bigTickFormatter}
                        />
                        {/* <XAxis
                  hide={true}
                  domain={['auto', 'auto']}
                  type="number"
                  dataKey="t"
                  scale="time"
                  dy={15}
                  dx={16}
                  tickFormatter={t =>
                    period <= 24
                      ? moment.unix(t).format('HH:mm')
                      : moment.unix(t).format('Do')
                  }
                  interval={60}
                  tick={{ fill: '#8893a8' }}
                  axisLine={false}
                  tickLine={{
                    stroke: '#334455',
                  }}
                /> */}
                        <Tooltip
                          content={() => null}
                          isAnimationActive={false}
                          cursor={{ stroke: '#445566' }}
                        />
                        {/* </LineChart> */}
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>

                  <Box sx={{ position: 'relative' }} mt="5">
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '0px',
                        top: '-8px',
                        fontSize: '12px',
                      }}
                      color="gray.500"
                    >
                      Neurons non dissolving
                    </Box>
                    <ResponsiveContainer width={'100%'} height={75}>
                      <AreaChart
                        height={75}
                        data={data.neurons}
                        margin={{
                          top: 10,
                          bottom: 10,
                        }}
                        syncId={'neurons'}
                      >
                        <Area
                          isAnimationActive={false}
                          key={'nds'}
                          type="monotone"
                          dataKey={'nds'}
                          strokeWidth={2}
                          stroke={'#445566'}
                          stackId="1"
                          fill={'#445566'}
                          activeDot={activeDotStyle}
                        />

                        <YAxis
                          orientation="right"
                          dx={5}
                          stroke="#8893a8"
                          domain={['auto', 'auto']}
                          axisLine={false}
                          tickLine={{
                            stroke: '#334455',
                          }}
                          tick={{ fontSize: '12px' }}
                          tickFormatter={bigTickFormatter}
                        />

                        {/* <Tooltip /> */}
                        {/* </LineChart> */}
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ position: 'relative' }} mt="5">
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '0px',
                        top: '-8px',
                        fontSize: '12px',
                      }}
                      color="gray.500"
                    >
                      Neurons dissolving
                    </Box>
                    <ResponsiveContainer width={'100%'} height={100}>
                      <AreaChart
                        height={100}
                        data={data.neurons}
                        margin={{
                          top: 10,
                          bottom: 10,
                        }}
                        syncId={'neurons'}
                      >
                        <Area
                          isAnimationActive={false}
                          key={'ds'}
                          type="monotone"
                          dataKey={'ds'}
                          strokeWidth={2}
                          stroke={'#FF7171'}
                          stackId="1"
                          fill={'#FF717177'}
                          activeDot={activeDotStyle}
                        />

                        <YAxis
                          orientation="right"
                          dx={5}
                          stroke="#8893a8"
                          domain={['auto', 'auto']}
                          axisLine={false}
                          tickLine={{
                            stroke: '#334455',
                          }}
                          tick={{ fontSize: '12px' }}
                          tickFormatter={bigTickFormatter}
                          reversed={true}
                        />
                        <XAxis
                          hide={false}
                          domain={['auto', 'auto']}
                          type="number"
                          dataKey="t"
                          scale="time"
                          dy={15}
                          dx={25}
                          tickFormatter={t =>
                            '+' +
                            Math.round(
                              (t - Date.now() / 1000) / (60 * 60 * 24 * 30)
                            ) +
                            ' mo'
                          }
                          interval={isLarge ? 30 : 70}
                          tick={{ fill: '#8893a8' }}
                          axisLine={false}
                          tickLine={{
                            stroke: '#334455',
                          }}
                        />
                        {/* <Tooltip /> */}
                        {/* </LineChart> */}
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </>
              ) : null}
            </>
          ) : null}
          <Center mt="15px" mb="10px">
            <ButtonGroup spacing="6">
              {/* <Button
                variant={period === 6 ? 'solid' : 'outline'}
                onClick={() => setPeriod(6)}
              >
                6H
              </Button>
              <Button
                variant={period === 24 * 1 ? 'solid' : 'outline'}
                onClick={() => setPeriod(24 * 1)}
              >
                1D
              </Button> */}
              <Button
                variant={period === 24 * 5 ? 'solid' : 'outline'}
                onClick={() => setPeriod(24 * 5)}
              >
                5D
              </Button>
              <Button
                variant={period === 24 * 30 ? 'solid' : 'outline'}
                onClick={() => setPeriod(24 * 30)}
              >
                1M
              </Button>
            </ButtonGroup>
          </Center>
        </Box>
      </Box>
      {data?.sources?.length ? (
        <Box mt="15px" pb="15px" pt="15px" ml="-15px" mr="-15px" bg={bg2}>
          <Box maxW="1278px" m="auto">
            <TableContainer css={tableCss}>
              <Table variant="simple" fontSize="14px" size="sm">
                <Thead>
                  <Tr>
                    <Th>Source</Th>
                    <Th>Note</Th>
                    <Th isNumeric>Price</Th>
                    <Th isNumeric>24H Volume</Th>
                    <Th isNumeric>7D Volume</Th>
                    <Th isNumeric>30D Volume</Th>
                    <Th isNumeric>Depth -50%</Th>
                    <Th isNumeric>Depth +100%</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.sources.map((data, idx) => (
                    <Source key={idx} idx={idx} data={data} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

const Source = ({ data, idx }) => {
  return (
    <Tr>
      <Td>
        {data.source.url ? (
          <Link href={data.source.url} target="_blank" color={dexColors[idx]}>
            {data.source.name} <ExternalLinkIcon />
          </Link>
        ) : (
          <>{data.source.name}</>
        )}
      </Td>
      <Td>
        {data.source.tip ? (
          <Tip label={data.source.tip}>
            <InfoIcon color={'blue.500'} />
          </Tip>
        ) : null}
      </Td>
      <Td isNumeric>{smartNumber(data.price)}</Td>
      <Td isNumeric>
        {data.volume24 === 0 ? '-' : smartNumber(data.volume24)}
      </Td>
      <Td isNumeric>{data.volume7 === 0 ? '-' : smartNumber(data.volume7)}</Td>
      <Td isNumeric>
        {data.volume30 === 0 ? '-' : smartNumber(data.volume30)}
      </Td>

      <Td isNumeric>
        {data.liquidity ? <>{smartNumber(data.liquidity)}</> : <>-</>}
      </Td>
      <Td isNumeric>
        {data.liqask ? <>{smartNumber(data.liqask)}</> : <>-</>}
      </Td>
    </Tr>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  // console.log(payload);
  if (active && payload && payload.length) {
    return (
      <div className="ctip">
        <p className="mdy">{moment.unix(label).format('MMMM Do YYYY')}</p>
        <p className="hmm">{moment.unix(label).format('HH:mm')}</p>
      </div>
    );
  }

  return null;
};
