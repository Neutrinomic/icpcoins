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
import logo from '../assets/icpcoins.png';

import { Routes, Route, Outlet, Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <HStack>
        <Image src={logo} w={'36px'} h={'36px'} />
        <Box ml="2" mt="2" fontWeight="bold">
          <Box as="span">ICP</Box>
          <Box as="span" color="#dcb873">
            COINS
          </Box>
        </Box>
      </HStack>
    </Link>
  );
};
