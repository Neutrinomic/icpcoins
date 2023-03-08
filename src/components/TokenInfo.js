import ReactMarkdown from 'react-markdown';
import { Box, Text, Stack, HStack, Wrap } from '@chakra-ui/react';
import { Routes, Route, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PriceChart } from './PriceChart';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  useMediaQuery,
  useColorModeValue,
  Tooltip,
  Link as LinkC,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { CurrencySymbol, smartNumber } from './Inline';
import { ProposalsSNS } from './ProposalsSNS';
import MD from './MD';
export const TokenInfo = ({ tokens }) => {
  const [isLarge] = useMediaQuery('(min-width: 1024px)');
  const bg = useColorModeValue(
    'linear-gradient(0deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 15%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 86%, rgba(15,17,26,0.6) 100%)'
  );
  const bg2 = useColorModeValue(
    'linear-gradient(180deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 15%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 0%, rgba(27,32,43,1) 3%)'
  );

  let { name } = useParams();
  let [info, setInfo] = useState(false);
  let ti = tokens.find(x => x.symbol === name);
  const refresh = async () => {
    let data = await fetch(
      'https://api.icpcoins.com/api/v1/token/' + name
    ).then(x => x.json());
    let links = {};
    try {
      links = JSON.parse(data.links);
    } catch (e) {}
    data.links = links;
    setInfo(data);
  };

  useEffect(() => {
    refresh();
  }, []);
  if (!info || !ti) return null;

  return (
    <>
      <Box fontSize="15px" bg={bg} ml="-15px" mr="-15px">
        <Box maxW="1024px" m="auto" pl="15px" pr="15px" pb="15px">
          <Box mt="15px" pt="1px">
            <Path info={info} />
          </Box>
          <Wrap spacing="8">
            <Box>
              <Box as="span" fontSize="25px" fontWeight="bold">
                {info.name}
              </Box>{' '}
              <CurrencySymbol>{name}</CurrencySymbol>
            </Box>
            <Box fontSize="25px">
              <Box fontSize="12px" color="gray.600">
                Price
              </Box>
              <Box fontWeight="bold" mt="-5px">
                ${smartNumber(ti.price)}
              </Box>
            </Box>

            <Box>
              <Box fontSize="12px" color="gray.600">
                Market Cap
              </Box>
              <Box>${smartNumber(ti.marketcap)}</Box>
            </Box>
            <Box>
              <Box fontSize="12px" color="gray.600">
                Volume 24h
              </Box>
              <Box>${smartNumber(ti.volume24)}</Box>
            </Box>
            {ti.liquidity !== 0 ? (
              <Box>
                <Box fontSize="12px" color="gray.600">
                  <Tooltip label="How much you can instantly sell for to halve the price. Currently includes only DEXes">
                    DEX Liquidity
                  </Tooltip>
                </Box>
                <Box>${smartNumber(ti.liquidity)}</Box>
              </Box>
            ) : null}
            <Box>
              <Box fontSize="12px" color="gray.600">
                Circulating Supply
              </Box>
              <Box>
                {smartNumber(ti.circulating)}
                <CurrencySymbol>{ti.symbol}</CurrencySymbol>
              </Box>
            </Box>

            <Box>
              <Box fontSize="12px" color="gray.600">
                Total Supply
              </Box>
              <Box>
                {smartNumber(ti.total)}
                <CurrencySymbol>{ti.symbol}</CurrencySymbol>
              </Box>
            </Box>

            {Object.keys(info.links).length ? (
              <Wrap fontSize="14px" spacing="6">
                <Box color="gray.600">Links</Box>
                {Object.keys(info.links).map((name, idx) => (
                  <Box key={idx}>
                    <LinkC href={info.links[name]} target="_blank" isExternal>
                      {name} <ExternalLinkIcon mx="2px" />
                    </LinkC>
                  </Box>
                ))}
              </Wrap>
            ) : null}
          </Wrap>
        </Box>
      </Box>
      {/* <Box bg={bg} pt="0px" pb="15px" ml="-15px" mr="-15px">
        <Box maxW="1024px" m="auto" pl="15px" pr="15px">
          <Wrap fontSize="14px" spacing="6">
            <Box color="gray.600">Links</Box>
            {Object.keys(info.links).map((name, idx) => (
              <Box key={idx}>
                <LinkC href={info.links[name]} target="_blank" isExternal>
                  {name} <ExternalLinkIcon mx="2px" />
                </LinkC>
              </Box>
            ))}
          </Wrap>
        </Box>
      </Box> */}
      <PriceChart symbol={name} />

      <Box bg={bg2} pt="15px" ml="-15px" mr="-15px">
        <Box maxW="1024px" m="auto" pl="15px" pr="15px">
          {info.sns ? (
            <Box pt="15px" pb="30px">
              <ProposalsSNS info={info} />
            </Box>
          ) : null}
          <Box pb="30px">
            <ReactMarkdown components={MD} children={info.article} skipHtml />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const Path = ({ info }) => {
  return (
    <Breadcrumb mt="4" fontSize="10px">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Cryptocurrencies</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{info.name}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
