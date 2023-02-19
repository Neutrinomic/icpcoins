import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TokenList } from './components/TokenList';
import { TokenInfo } from './components/TokenInfo';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex mt="3" mr="3" ml="3">
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      <Box>
        <Box maxW="1024px" m="auto" mt="5">
          <Routes>
            <Route index element={<TokenList />} />
            <Route path="token/:name" element={<TokenInfo />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
