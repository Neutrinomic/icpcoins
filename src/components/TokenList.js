/* global BigInt */

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
  Wrap,
  Tooltip,
  useColorModeValue,
  Progress,
  useBreakpointValue,
  Tag,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Flex,
} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';

import { InfoIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

import { useEffect, useState, useRef, useMemo } from 'react';
import { Routes, Route, Outlet, Link, useNavigate } from 'react-router-dom';
import { smartNumber } from './Inline';

import { Proposals } from './Proposals';
import { CurrencySymbol } from './Inline';
import { MiniChart } from './MiniChart';
import { DNumber } from './DNumber';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokenList } from '../reducers/tokens.js';

import { Articles } from './Impulse';
import { changePage } from '../reducers/pages';
import { period2header } from '../utils.js';

export const TokenPage = ({ articles }) => {
  const dispatch = useDispatch();

  const tokens = useSelector(selectTokenList);

  const [isLarge] = useMediaQuery('(min-width: 1024px)');
  const baseCurrency = useSelector(state => state.config.baseCurrency);

  const bg = useColorModeValue(
    'linear-gradient(180deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 14%)',
    'linear-gradient(0deg, rgba(23,25,34,1) 95%, rgba(14,16,25,1) 100%)'
  );
  const bg2 = useColorModeValue(
    'linear-gradient(0deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 15%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 70%, rgba(15,17,26,0.7) 100%)'
  );

  const fg = useColorModeValue('gray.900', 'gray.200');

  useEffect(() => {
    dispatch(changePage({ page: 'index', params: {} }));
  }, []);

  if (!tokens) return null;

  const total24 = tokens.reduce(
    (acc, x) => acc + (x.id > 4 ? x.volume24 : 0),
    0
  );

  const depth50Bid = tokens.reduce(
    (acc, x) => acc + (x.id > 4 ? x.depth50Bid : 0),
    0
  );

  const depth50Ask = tokens.reduce(
    (acc, x) => acc + (x.id > 4 ? x.depth50Ask : 0),
    0
  );

  const marketcap = Math.round(
    tokens.reduce((acc, x) => acc + (x.id > 4 ? x.marketcap : 0), 0)
  );

  return (
    <>
      <Box
        fontSize="15px"
        bg={bg2}
        ml="-15px"
        mr="-15px"
        mb={'10px'}
        mt={'15px'}
      >
        <Box
          maxW="1312px"
          m="auto"
          pl={'18px'}
          pr="15px"
          pb="8px"
          color={'gray.500'}
          pt="8px"
        >
          <Wrap spacing="5">
            <Box>
              DEX VOLUME 24H:{' '}
              <Box as="span" color={fg}>
                {total24.toLocaleString()}
              </Box>
            </Box>
            <Box>
              DEX DEPTH -50%:{' '}
              <Box as="span" color={fg}>
                {depth50Bid.toLocaleString()}
              </Box>
            </Box>
            <Box>
              DEX DEPTH +100%:{' '}
              <Box as="span" color={fg}>
                {depth50Ask.toLocaleString()}
              </Box>
            </Box>
            <Box>
              ICP COINS MARKETCAP:{' '}
              <Box as="span" color={fg}>
                {marketcap.toLocaleString()}
              </Box>
            </Box>
          </Wrap>
        </Box>
      </Box>

      {/* <Articles articles={articles} /> */}

      <Box maxW="1400px" m="auto">
        <TokenList tokens={tokens} key={baseCurrency} />
      </Box>

      <Box
        bg={bg}
        ml="-15px"
        pt="20px"
        mr="-15px"
        pl="15px"
        pr="15px"
        pb="10vh"
      >
        <Box maxW="1278px" m="auto">
          {/* {isLarge ? (
            <Wrap mt={8}>
              <FastBlocks w={'49%'} />
              <Proposals w={'49%'} />
            </Wrap>
          ) : ( */}
          {/* <Wrap mt={8} ml="10px" mr="10px"> */}
          <Proposals w={'100%'} />
          {/* <FastBlocks w={'100%'} />
            </Wrap>
          )} */}
        </Box>
      </Box>
    </>
  );
};

export const TokenList = ({ tokens, baseCurrency }) => {
  const [isLarge] = useMediaQuery('(min-width: 1024px)');

  const [isSticky, ref, setIsSticky] = useDetectSticky();
  const [filters, setFilters] = useState({
    priceChangePeriod: 1, // In days
    chartPeriod: 7, // In days
    volumePeriod: 1, // In days
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedTokens = useMemo(() => {
    let sortableItems = [...tokens];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key == 'treasury') {
          aValue = a[sortConfig.key][3];
          bValue = b[sortConfig.key][3];
        }

        // Handle null, undefined, nonNumerical or empty values by treating them as the lowest numbers
        if (aValue === null || aValue === undefined || aValue === '' || isNaN(aValue)) aValue = Number.MIN_SAFE_INTEGER;
        if (bValue === null || bValue === undefined || bValue === '' || isNaN(bValue)) bValue = Number.MIN_SAFE_INTEGER;

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tokens, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  const priceChangePeriodOnChange = (period) => {
    setFilters({ ...filters, priceChangePeriod: period });
  }
  const chartPeriodOnChange = (period) => {
    setFilters({ ...filters, chartPeriod: period });
  }
  const volumePeriodOnChange = (period) => {
    setFilters({ ...filters, volumePeriod: period });
  }
  const changeKey = useMemo(() => {
    switch (filters.priceChangePeriod) {
      case 1: return 'change24';
      case 7: return 'change7';
      case 31: return 'change31';
    }
  }, [filters.priceChangePeriod]);

  const volumeKey = useMemo(() => {
    switch (filters.volumePeriod) {
      case 1: return 'volume24';
      case 7: return 'volume7';
      case 31: return 'volume31';
    }
  }, [filters.volumePeriod]);

  return (
    <>
      <TableContainer
        mt={10}
        mb={isLarge ? '35px' : '10px'}
        // overflowX="hidden"
        css={{
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
        }}
      >
        <Table
          variant="simple"
          size="sm"
          className={isSticky ? 'symbol-sticky' : ''}
          sx={{ tableLayout: 'fixed', minWidth: '400px' }}
        >
          <Thead>
            <Tr>
              <Th w="10px" ref={ref}>
                #
              </Th>
              <Th w="130px">Name</Th>
              <Th className="symbol" w="80px">
                Symbol
              </Th>
              <Th isNumeric w="120px">
                <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content"> Price <SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey="price" /> </Flex>
              </Th>
              <Th textAlign="start" w="30px">
                <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content">
                  <Menu >
                    <MenuButton>{period2header(filters.priceChangePeriod, '%')}</MenuButton>
                    <MenuList>
                      {/* MenuItems are not rendered unless Menu is open */}
                      <MenuItem onClick={() => priceChangePeriodOnChange(31)}>31 Day %</MenuItem>
                      <MenuItem onClick={() => priceChangePeriodOnChange(7)}>7 Day %</MenuItem>
                      <MenuItem onClick={() => priceChangePeriodOnChange(1)}>24H %</MenuItem>
                    </MenuList>
                  </Menu>
                  <SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey={changeKey} />
                </Flex>
              </Th>
              <Th isNumeric w="220px">
                <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content"> Market Cap <SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey="marketcap" /> </Flex>
              </Th>
              <Th isNumeric w="150px">
                <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content">
                  <Menu >
                    <MenuButton>{filters.volumePeriod == 1 ? 24 : filters.volumePeriod}{filters.volumePeriod == 1 ? 'H' : 'D'} Volume</MenuButton>
                    <MenuList>
                      {/* MenuItems are not rendered unless Menu is open */}
                      <MenuItem onClick={() => volumePeriodOnChange(31)}>31 Day</MenuItem>
                      <MenuItem onClick={() => volumePeriodOnChange(7)}>7 Day</MenuItem>
                      <MenuItem onClick={() => volumePeriodOnChange(1)}>24H</MenuItem>
                    </MenuList>
                  </Menu>
                  <SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey={volumeKey} />
                </Flex>
                {/* <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content">
                  24h Volume<SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey="volume24" /> </Flex> */}
              </Th>
              <Th isNumeric w="170px">
                <Tooltip
                  label={
                    <>
                      Circulating supply = total - treasury
                      <br />
                      Unlocked circulating supply = total - treasury - locked
                    </>
                  }
                >
                  <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content"> Circulating supply<SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey="circulating" /> </Flex>
                </Tooltip>
              </Th>
              <Th w={'100px'}>
                <Menu>
                  <MenuButton> LAST {filters.chartPeriod == 1 ? 24 : filters.chartPeriod} {filters.chartPeriod == 1 ? 'HOURS' : 'DAYS'}</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => chartPeriodOnChange(1)}>24H</MenuItem>
                    <MenuItem onClick={() => chartPeriodOnChange(7)}>7D</MenuItem>
                    <MenuItem onClick={() => chartPeriodOnChange(31)}>31D</MenuItem>
                  </MenuList>
                </Menu>
              </Th>
              <Th isNumeric w="120px">
                <Tooltip label="Capital required to reduce the price by 50%">
                  <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content"> Depth -50%<SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey="depth50Bid" /> </Flex>
                </Tooltip>
              </Th>
              <Th isNumeric w="120px">
                <Tooltip label="Capital required to increase the price by 100%">
                  <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content">  Depth +100%<SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey="depth50Ask" /> </Flex>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={<>Value of the ICP in treasury</>}>
                  <Flex flexDirection="row" justifyContent="flex-end" minWidth="min-content"> Treasury<SortArrow sortConfig={sortConfig} requestSort={requestSort} sortKey="treasury" /> </Flex>
                </Tooltip>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedTokens.map((data, idx) => (
              <TokenListItem
                baseCurrency={baseCurrency}
                key={data.symbol}
                idx={idx}
                data={data}
                filters={filters}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const TokenListItem = ({ idx, data, baseCurrency, filters }) => {
  const cs = baseCurrency === 'USD' ? '$' : '';

  let {
    id,
    name,
    symbol,
    price,
    marketcap,
    volume24,
    volume7,
    volume31,
    circulating,
    real_circulating,
    total,
    depth50Bid,
    depth50Ask,
    dayChart,
    weekchart,
    monthChart,
    treasury,
    change24,
    change7,
    change31,
  } = data;

  const nns = symbol === 'ckETH' || symbol === 'ckBTC' || symbol === 'ICP';
  const sns = 'sns' in data.locking;
  const overbg = useColorModeValue(
    'linear-gradient(0deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 15%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 70%, rgba(15,17,26,0.7) 100%)'
  );
  let navigate = useNavigate();
  let [over, setOver] = useState(false);

  const treasury_icp = treasury[3];

  const change = useMemo(() => {
    switch (filters.priceChangePeriod) {
      case 1: return change24;
      case 7: return change7;
      case 31: return change31;
    }
  }, [filters.priceChangePeriod, change24, change7, change31]);

  const volume = useMemo(() => {
    switch (filters.volumePeriod) {
      case 1: return volume24;
      case 7: return volume7;
      case 31: return volume31;
    }
  }, [filters.volumePeriod, volume24, volume7, volume31]);

  const chartData = useMemo(() => {
    switch (filters.chartPeriod) {
      case 1: return dayChart;
      case 7: return weekchart;
      case 31: return monthChart;
    }
  }, [filters.chartPeriod, dayChart, weekchart, monthChart]);

  return (
    <Tr
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        navigate('/token/' + symbol);
      }}
      onMouseEnter={() => {
        setOver(true);
      }}
      onMouseLeave={() => {
        setOver(false);
      }}
      bg={over ? overbg : ''}
    >
      <Td>{idx + 1}</Td>
      <Td sx={{ position: 'relative' }}>
        {name}
        {sns ? (
          <Tag
            colorScheme="blue"
            size="sm"
            sx={{
              zoom: 0.7,
              position: 'absolute',
              bottom: '10px',
              left: '22px',
            }}
          >
            SNS
          </Tag>
        ) : null}
        {nns ? (
          <Tag
            colorScheme="green"
            size="sm"
            sx={{
              zoom: 0.7,
              position: 'absolute',
              bottom: '10px',
              left: '22px',
            }}
          >
            NNS
          </Tag>
        ) : null}
      </Td>
      <Th className="symbol">
        <CurrencySymbol>{symbol}</CurrencySymbol>
      </Th>
      <Td sx={{ position: 'relative' }} isNumeric>
        <DNumber currency={baseCurrency} n={price} />
        {/* {cs}
        {smartNumber(price)} */}
      </Td>
      <Td>
        <TokenPriceChange change={change} />
      </Td>
      <Td isNumeric>
        <DNumber currency={baseCurrency} n={marketcap} />
      </Td>
      <Td isNumeric>
        <DNumber
          currency={baseCurrency}
          n={Math.round(volume)}
          noDecimals={true}
        />
      </Td>
      <Td isNumeric>
        {real_circulating && real_circulating !== circulating ? (
          <>
            <Tooltip
              label={
                <>
                  Unlocked circulating supply{' '}
                  {((real_circulating / circulating) * 100).toFixed(1)}%
                  <br />
                  {smartNumber(real_circulating)} {symbol}
                </>
              }
            >
              <div>
                {smartNumber(circulating)}
                <div>
                  <Progress
                    mt="2"
                    mb="-2"
                    value={(real_circulating / circulating) * 100}
                    size={'xs'}
                  />
                </div>
              </div>
            </Tooltip>
          </>
        ) : (
          <>{smartNumber(circulating)}</>
        )}
      </Td>

      <Td>
        <Box ml="-5px" mr="-5px">
          <MiniChart data={chartData} />
        </Box>
      </Td>
      <Td isNumeric>
        {depth50Bid ? (
          <DNumber currency={baseCurrency} n={depth50Bid} />
        ) : (
          <></>
        )}
      </Td>
      <Td isNumeric>
        {depth50Ask ? (
          <DNumber currency={baseCurrency} n={depth50Ask} />
        ) : (
          <></>
        )}
      </Td>
      <Td>
        {treasury_icp ? (
          <>
            <DNumber currency={baseCurrency} n={treasury_icp} />
          </>
        ) : (
          <></>
        )}
      </Td>
    </Tr>
  );
};

const TokenPriceChange = ({ change }) => {
  return isNaN(change) ? (
    <>-</>
  ) : (
    <>
      {change < 0 ? (
        <TriangleDownIcon color="pink.700" mr="5px" />
      ) : (
        <TriangleUpIcon color="green.500" mr="5px" />
      )}
      {Math.abs(change).toFixed(2)}%
    </>
  );
};

const SortArrow = ({ sortConfig, sortKey, requestSort }) => {
  return (

    <div style={{ cursor: 'pointer', paddingLeft: '5px' }} onClick={() => requestSort(sortKey)}>{sortConfig.key === sortKey && sortConfig.direction === 'ascending' ? '▲' : '▼'}</div>
  )
}

const useDetectSticky = (ref, observerSettings = { threshold: [1] }) => {
  const [isSticky, setIsSticky] = useState(false);
  const newRef = useRef();
  ref ||= newRef;

  // mount
  useEffect(() => {
    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        observerSettings
      );

    observer.observe(cachedRef);

    // unmount
    return () => {
      observer.unobserve(cachedRef);
    };
  }, []);

  return [isSticky, ref, setIsSticky];
};
