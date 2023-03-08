import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Area,
  CartesianGrid,
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
  Tooltip,
} from '@chakra-ui/react';
import { smartNumber } from './Inline';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useInterval } from 'react-use';
import { InfoIcon } from '@chakra-ui/icons';

//https://github.com/recharts/recharts/issues/956
const dexColors = ['#00a0e5', '#c55de8', '#9f9634', '#948c52', '#1ca254'];
export const PriceChart = ({ symbol }) => {
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
  let [data, setData] = useState([]);
  let [period, setPeriod] = useState(24);
  const load = async hours => {
    const interv = hours * 24;
    let d = await fetch(
      'https://api.icpcoins.com/api/v1/token/' + symbol + '/chart/' + interv
    ).then(x => x.json());
    let now = Math.floor(Date.now() / 1000 / interv) * interv;
    let merged = Array((60 * 60 * hours) / interv)
      .fill(0)
      .map((_, idx) => ({ t: now - idx * interv }));

    let didx = 0;
    for (let da of d.data) {
      for (let po of da.data) {
        let pos = (now - po.t) / interv;
        if (merged[pos]) merged[pos]['p' + didx] = po.p;
      }
      didx += 1;
    }

    let sources = d.data.map(x => ({
      token1: x.token1,
      token2: x.token2,
      sourceType: x.type,
      source:
        x.type === 'dex'
          ? d.dex_sources.find(z => z.id === x.source)
          : d.cex_sources.find(z => z.id === x.source),
      price: x.data[x.data.length - 1].p,
      liquidity: x.data[x.data.length - 1].l,
      volume24: x.data[x.data.length - 1].v,
    }));

    // console.log(merged);
    sources = sources.filter(x => x.sourceType === 'dex');
    setData({ lines: didx, merged, sources });
  };

  useInterval(() => {
    load(period);
  }, 10000);

  useEffect(() => {
    load(period);
  }, [period]);

  return (
    <>
      <Box mt="15px" pt="15px" ml="-15px" mr="-15px">
        <Box maxW="1024px" m="auto">
          <ResponsiveContainer width={'100%'} height={400}>
            <LineChart data={data.merged} margin={{ top: 10, bottom: 10 }}>
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
                  />
                ))}

              <YAxis
                orientation="right"
                dx={15}
                stroke="#8893a8"
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
              />
              <XAxis
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
              />
              {/* <Tooltip /> */}
            </LineChart>
          </ResponsiveContainer>

          <Center mt="15px" mb="10px">
            <ButtonGroup spacing="6">
              <Button
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
              </Button>
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
          <Box maxW="1024px" m="auto">
            <TableContainer css={tableCss}>
              <Table variant="simple" fontSize="14px" size="sm">
                <Thead>
                  <Tr>
                    <Th>Market</Th>
                    <Th isNumeric>Bid Price</Th>
                    <Th isNumeric>24H Volume</Th>
                    <Th isNumeric>
                      <Tooltip label="How much you can instantly sell for to halve the price. Currently includes only DEXes">
                        Liquidity
                      </Tooltip>
                      <InfoIcon ml="1" w={'12px'} h={'12px'} mt="-3px" />
                    </Th>
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
        <Link href={data.source.url} target="_blank" color={dexColors[idx]}>
          {data.source.name} <ExternalLinkIcon />
        </Link>
      </Td>
      <Td isNumeric>${smartNumber(data.price)}</Td>
      <Td isNumeric>${smartNumber(data.volume24)}</Td>

      <Td isNumeric>
        {data.liquidity ? <>${smartNumber(data.liquidity)}</> : <>-</>}
      </Td>
    </Tr>
  );
};
