import { Box, ChakraProvider, Flex, HStack, Spacer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { SwitchCurrency } from './components/SwitchCurrency';
import { TokenInfo } from './components/TokenInfo';
import { TokenPage } from './components/TokenList';
import ic from './icblast.js';
import { idlFactory } from './impulse.idl.js';
import { AboutPage } from './pages/about';
import { ListingPage } from './pages/listing';
import { TermsPage } from './pages/terms';
import theme from './theme.js';
import { TopCans } from './components/TopCans';
import { Proposals } from './components/Proposals';

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
      <Flex height="100vh">
        <Box
          width='250px'
          height="100%"
          overflowY="auto"
          p="4"
          // bg="gray.100"
        >
          <Logo />
          
        </Box>
        <Box
          flex="1"
          height="100%"
          overflowY="auto"
          pt={4}
          // bg="gray.200"
        >
          <HStack w='100%'>
            <SwitchCurrency />
            <Spacer />
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
          <Routes>
            <Route index element={<TokenPage articles={articles} />} />
            <Route path="token/:name" element={<TokenInfo />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="listing" element={<ListingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="topcans" element={<TopCans />} />
            <Route path="proposals" element={<Proposals />} />
          </Routes>
          <Footer />
        </Box>
      </Flex>
      {/* <Box pl="15px" pr="15px" pb="50vh">
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
          <Route path="topcans" element={<TopCans />} />
        </Routes>

        <Footer />
      </Box> */}
    </ChakraProvider>
  );
}

export default App;
