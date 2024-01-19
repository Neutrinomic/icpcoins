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
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';

import { InfoIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

import { useEffect, useState, useRef } from 'react';
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
    dispatch(changePage({ page: 'index', params: {} }))
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

      <Articles articles={articles} />

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
                Price
              </Th>
              <Th textAlign="start" w="30px">
                24H %
              </Th>
              <Th isNumeric w="220px">
                Market Cap
              </Th>
              <Th isNumeric w="150px">
                24h Volume
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
                  Circulating supply
                </Tooltip>
              </Th>
              <Th w={'100px'}>LAST 7 DAYS</Th>
              <Th isNumeric w="120px">
                <Tooltip label="Capital required to reduce the price by 50%">
                  Depth -50%
                </Tooltip>
              </Th>
              <Th isNumeric w="120px">
                <Tooltip label="Capital required to increase the price by 100%">
                  Depth +100%
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={<>Value of the ICP in treasury</>}>
                  Treasury
                </Tooltip>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokens.map((data, idx) => (
              <TokenListItem
                baseCurrency={baseCurrency}
                key={data.symbol}
                idx={idx}
                data={data}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const TokenListItem = ({ idx, data, baseCurrency }) => {
  const cs = baseCurrency === 'USD' ? '$' : '';

  let {
    id,
    name,
    symbol,
    price,
    marketcap,
    volume24,
    circulating,
    real_circulating,
    total,
    depth50Bid,
    depth50Ask,
    weekchart,
    treasury,
    change24,
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
        {isNaN(change24) ? (
          <>-</>
        ) : (
          <>
            {change24 < 0 ? (
              <TriangleDownIcon color="pink.700" mr="5px" />
            ) : (
              <TriangleUpIcon color="green.500" mr="5px" />
            )}
            {Math.abs(change24).toFixed(2)}%
          </>
        )}
      </Td>
      <Td isNumeric>
        <DNumber currency={baseCurrency} n={marketcap} />
      </Td>
      <Td isNumeric>
        <DNumber
          currency={baseCurrency}
          n={Math.round(volume24)}
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
          <MiniChart data={weekchart} />
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
