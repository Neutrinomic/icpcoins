import ReactMarkdown from 'react-markdown';
import { Box, Divider, Wrap } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PriceChart } from './charting/PriceChart.js';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useMediaQuery,
  useColorModeValue,
  Tooltip,
  Tag,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

import { selectTokenList } from '../reducers/tokens.js';

import { CurrencySymbol, smartNumber } from './Inline';
import { useDispatch, useSelector } from 'react-redux';

import { ProposalsOne } from './Proposals';
import MD from './MD';
import { tokensCfg } from '../dcfg';
// import { fetchTokenExtended } from '../reducers/tokens';
import { changePage } from '../reducers/pages';
import { IconTokenLinks } from './TokenLinks.js';

export const TokenInfo = () => {
  const tokens = useSelector(selectTokenList);
  const tokens_cfg = useSelector(state => state.config.tokens)
  const baseCurrency = useSelector(state => state.config.baseCurrency);

  const dispatch = useDispatch();
  const [isLarge] = useMediaQuery('(min-width: 1024px)');
  const bg = useColorModeValue(
    'linear-gradient(0deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 15%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 86%, rgba(15,17,26,0.6) 100%)'
  );
  const bg2 = useColorModeValue(
    'linear-gradient(180deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 15%)',
    'linear-gradient(180deg, rgba(23,25,34,1) 0%, rgba(27,32,43,1) 3%)'
  );

  const bg3 = useColorModeValue(
    'linear-gradient(180deg, rgba(227,232,239,1) 0%, rgba(234,239,245,1) 14%)',
    'linear-gradient(180deg, rgba(23,25,34,0.8) 0%, rgba(27,32,43,0.4) 8%)'
  );
  let { name } = useParams();

  // let [info, setInfo] = useState(false);
  let info = tokensCfg[name];

  const ti = tokens.length ? tokens.find(x => x.symbol === name) : undefined;
  const tid = tokens_cfg.findIndex(x => x.symbol === name)


  useEffect(() => {
    if (!tid) return;
    dispatch(changePage({ page: 'token', params: { tid, period: 30 } }))
  }, [tid]);

  // useEffect(() => {
  //   if (tid !== undefined) dispatch(fetchTokenExtended({ tid }));
  // }, [tid, baseCurrency]);

  if (!tokens || tokens.length === 0) return null;

  if (!ti) return null;

  return (
    <>
      <Box fontSize="15px">
        <Box maxW="1278px" bg={bg} m="auto" pl="15px" pr="15px" pb="15px" borderRadius="md" border='0.5px' borderColor={'gray.700'} mt={2}>
          <Box mt="15px" pt="1px">
            <Path name={name} />
          </Box>
          <Wrap spacing="8">
            <Box>
              <Box as="span" fontSize="25px" fontWeight="bold">
                {ti.name}
              </Box>{' '}
              <CurrencySymbol>{name}</CurrencySymbol>
            </Box>
            <Box fontSize="25px">
              <Box fontSize="12px" color="gray.600">
                Price
              </Box>
              <Box fontWeight="bold" mt="-5px">
                {smartNumber(ti.price)}
              </Box>
            </Box>

            <Box>
              <Box fontSize="12px" color="gray.600">
                Market Cap
              </Box>
              <Box>{smartNumber(ti.marketcap)}</Box>
            </Box>
            <Box>
              <Box fontSize="12px" color="gray.600">
                Volume 24h
              </Box>
              <Box>{smartNumber(ti.volume24)}</Box>
            </Box>
            {ti.depth50Bid !== 0 ? (
              <Box>
                <Box fontSize="12px" color="gray.600">
                  Depth -50%
                </Box>
                <Box>{smartNumber(ti.depth50Bid)}</Box>
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
            

          </Wrap>
          <Divider mt={3} />
          <IconTokenLinks info={info} />
        </Box>
      </Box>
      {info && info.warnings && info.warnings.length ? (
        <Box maxW="1278px" m="auto" pt="3" pl="15px" pr="15px">
          {info.warnings.map((x, idx) => (
            <Tooltip label={x[1]}>
              <Tag colorScheme="red" key={idx}>
                <WarningIcon mr="1" /> {x[0]}
              </Tag>
            </Tooltip>
          ))}
        </Box>
      ) : null}
      {/* <Divider maxW="1278px" my={4} mx='auto'/> */}
      <PriceChart symbol={name} onChangePeriod={(period) => dispatch(changePage({ page: 'token', params: { tid, period } }))
      } info={info}/>

      <Box bg={bg} pt="15px" ml="-15px" mr="-15px">
        <Box maxW="1278px" m="auto" pl="15px" pr="15px">
          {ti && 'sns' in ti.locking ? (
            <Box pt="15px" pb="30px">
              <ProposalsOne dao={ti.symbol} />
            </Box>
          ) : null}
          <Box pb="30px">
            {info ? (
              <ReactMarkdown components={MD} children={info.article} skipHtml />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const Path = ({ name }) => {
  return (
    <Breadcrumb mt="4" fontSize="10px">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Cryptocurrencies</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{name}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
