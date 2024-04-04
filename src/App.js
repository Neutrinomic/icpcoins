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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import theme from './theme.js';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TokenPage } from './components/TokenList';
import { TokenInfo } from './components/TokenInfo';
import { useInterval } from 'react-use';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { toState } from '@infu/icblast';
import { getPairPrices, getPrices } from './utils';
import { SwitchCurrency } from './components/SwitchCurrency';
import { useDispatch, useSelector } from 'react-redux';
import { TermsPage } from './pages/terms';
import { ListingPage } from './pages/listing';
import './App.css';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/about';
import { Logo } from './components/Logo';
import { idlFactory } from './impulse.idl.js';
import ic from './icblast.js';
import { CountdownTimer } from './components/Countdown.js';

function App() {
  const ready = useSelector(
    state => state.config.tokens.length > 0
    // &&
    // state.pairs.t1h[0] &&
    // state.tokens.t1d[0]
  );
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    let can = await ic('x5jzu-faaaa-aaaam-abx4q-cai', idlFactory);
    let art = await can.latest_topics();
    for (let i = 0; i < art.length; i++) {
      art[i].meta = JSON.parse(art[i].meta);
    }
    setArticles(art);
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (!ready) return null;
  return (
    <ChakraProvider theme={theme}>
      <Box pl="15px" pr="15px" pb="50vh">
        <Flex maxW="1278px" m="auto" mt="6">
          <HStack>
            <Logo />
            <SwitchCurrency />
          </HStack>

          <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>

        <Routes>
          <Route index element={<TokenPage articles={articles} />} />
          <Route path="token/:name" element={<TokenInfo />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="listing" element={<ListingPage />} />
          <Route path="about" element={<AboutPage />} />
        </Routes>

        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
