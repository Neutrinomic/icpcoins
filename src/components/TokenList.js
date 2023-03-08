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
} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';

import { InfoIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link, useNavigate } from 'react-router-dom';
import { smartNumber } from './Inline';
import { FastBlocks } from './FastBlocks';
import { Proposals } from './Proposals';
import { CurrencySymbol } from './Inline';
import { MiniChart } from './MiniChart';

export const TokenPage = ({ tokens }) => {
  const [isLarge] = useMediaQuery('(min-width: 1024px)');
  const bg = useColorModeValue(
    'linear-gradient(180deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 14%)',
    'linear-gradient(0deg, rgba(23,25,34,1) 95%, rgba(14,16,25,1) 100%)'
  );
  const bg2 = useColorModeValue(
    'linear-gradient(0deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 15%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 70%, rgba(15,17,26,0.7) 100%)'
  );
  const fg = useColorModeValue('gray.900', 'gray.200');

  const total24 = tokens.reduce(
    (acc, x) => acc + (x.id !== 1 && x.id !== 2 ? x.volume24 : 0),
    0
  );

  const liquidity = tokens.reduce(
    (acc, x) => acc + (x.id !== 1 && x.id !== 2 ? x.liquidity : 0),
    0
  );
  const marketcap = Math.round(
    tokens.reduce(
      (acc, x) => acc + (x.id !== 1 && x.id !== 2 ? x.marketcap : 0),
      0
    )
  );

  return (
    <>
      <Box
        fontSize="15px"
        bg={bg2}
        ml="-15px"
        mr="-15px"
        mb={isLarge ? '10px' : '8px'}
        mt={isLarge ? '15px' : '8px'}
      >
        <Box
          maxW="1024px"
          m="auto"
          pl={isLarge ? '5px' : '15px'}
          pr="15px"
          pb="8px"
          color={'gray.500'}
          pt="18px"
        >
          <Wrap spacing="5">
            <Box>
              DEX VOLUME 24H:{' '}
              <Box as="span" color={fg}>
                ${total24.toLocaleString()}
              </Box>
            </Box>
            <Box>
              DEX LIQUIDITY:{' '}
              <Box as="span" color={fg}>
                ${liquidity.toLocaleString()}
              </Box>
            </Box>
            <Box>
              ICP COINS MARKETCAP:{' '}
              <Box as="span" color={fg}>
                ${marketcap.toLocaleString()}
              </Box>
            </Box>
          </Wrap>
        </Box>
      </Box>

      <Box maxW="1144px" m="auto">
        <TokenList tokens={tokens} />
      </Box>

      <Box bg={bg} ml="-15px" pt="20px" mr="-15px" pb="10vh">
        <Box maxW="1024px" m="auto">
          {isLarge ? (
            <Wrap mt={8}>
              <FastBlocks w={'49%'} />
              <Proposals w={'49%'} />
            </Wrap>
          ) : (
            <Wrap mt={8} ml="10px" mr="10px">
              <Proposals w={'100%'} />
              <FastBlocks w={'100%'} />
            </Wrap>
          )}
        </Box>
      </Box>
    </>
  );
};
export const TokenList = ({ tokens }) => {
  const [isLarge] = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      <Box
        fontSize={isLarge ? '18px' : '16px'}
        fontWeight="bold"
        color="gray.600"
        mb="3"
        pl={isLarge ? '55px' : '0px'}
      >
        Internet Computer Cryptocurrencies by Market Cap
      </Box>

      <TableContainer
        mt={isLarge ? 10 : 0}
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
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th w="10px">#</Th>
              <Th>Name</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>24H %</Th>
              <Th isNumeric>Market Cap</Th>
              <Th isNumeric>24h Volume</Th>
              <Th isNumeric>Circulating Supply</Th>
              <Th isNumeric>LAST 7 DAYS</Th>
              <Th isNumeric>
                <Tooltip label="How much you can instantly sell for to halve the price. Currently includes only DEXes">
                  Liquidity
                </Tooltip>
                <InfoIcon ml="1" w={'12px'} h={'12px'} mt="-3px" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokens.map((data, idx) => (
              <TokenListItem key={idx} idx={idx} data={data} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const TokenListItem = ({ idx, data }) => {
  let {
    id,
    name,
    symbol,
    price,
    marketcap,
    volume24,
    circulating,
    total,
    liquidity,
    weekchart,
  } = data;
  const overbg = useColorModeValue(
    'linear-gradient(0deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 15%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 70%, rgba(15,17,26,0.7) 100%)'
  );
  let navigate = useNavigate();
  let [over, setOver] = useState(false);

  const ago24 = Math.floor(Date.now() / 1000) - 60 * 60 * 24;
  let priceBefore24 = price;
  try {
    let f = weekchart.find(x => x.t >= ago24);

    priceBefore24 = f.p;
  } catch (e) {}
  const change24 = ((price - priceBefore24) / priceBefore24) * 100;

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
      <Td>
        {name} <CurrencySymbol>{symbol}</CurrencySymbol>
      </Td>
      <Td sx={{ position: 'relative' }} isNumeric>
        ${smartNumber(price)}
      </Td>
      <Td>
        {change24 < 0 ? (
          <TriangleDownIcon color="pink.700" mr="5px" />
        ) : (
          <TriangleUpIcon color="green.500" mr="5px" />
        )}
        {Math.abs(change24).toFixed(2)}%
      </Td>
      <Td isNumeric>${smartNumber(marketcap)}</Td>
      <Td isNumeric>${smartNumber(volume24)}</Td>
      <Td isNumeric>
        {smartNumber(circulating)}
        <CurrencySymbol>{symbol}</CurrencySymbol>
      </Td>
      <Td>
        <Box mr="-25px">
          <MiniChart data={weekchart} />
        </Box>
      </Td>
      <Td isNumeric>{liquidity ? <>${smartNumber(liquidity)}</> : <>-</>}</Td>
    </Tr>
  );
};
