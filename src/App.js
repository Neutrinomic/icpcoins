import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  Flex,
  Spacer,
  Image,
  HStack,
} from '@chakra-ui/react';
import theme from './theme.js';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TokenPage } from './components/TokenList';
import { TokenInfo } from './components/TokenInfo';
import { useInterval } from 'react-use';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import logo from './assets/icpcoinss.png';
function App() {
  let [tokens, setTokens] = useState([]);

  const refresh = async () => {
    let data = await fetch('https://api.icpcoins.com/api/v1/list').then(x =>
      x.json()
    );
    data = data.sort((a, b) => b.marketcap - a.marketcap);
    data = data.filter(x => !x.unreleased);
    setTokens(data);
  };

  useInterval(() => {
    refresh();
  }, 5000);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box pl="15px" pr="15px" pb="50vh">
        <Flex maxW="1024px" m="auto" mt="6">
          <Link to="/">
            <HStack>
              <Image src={logo} w="40px" />
              <Box mt="2" fontWeight="bold">
                <Box as="span" color="#c55de8">
                  ICP
                </Box>
                <Box as="span" color="#07bef2">
                  COINS
                </Box>
              </Box>
            </HStack>
          </Link>
          <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>

        <Routes>
          <Route index element={<TokenPage tokens={tokens} />} />
          <Route path="token/:name" element={<TokenInfo tokens={tokens} />} />
        </Routes>
        <Box color="gray.500" mt="6" fontSize="sm" textAlign={'center'}>
          Disclaimer: This site doesn't contain investment advices. Do your own
          research. We are doing the best we can, but all token information can
          be innacurate.
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
