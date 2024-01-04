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
  useMediaQuery,
} from '@chakra-ui/react';
import logo from '../assets/icpcoins.png';

import { Routes, Route, Outlet, Link } from 'react-router-dom';

export const Logo = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 400px)');

  return (
    <Link to="/">
      <HStack>
        <Image src={logo} w={'36px'} h={'36px'} />
        {isSmallScreen ? null : (
          <Box ml="2" mt="0" fontWeight="bold">
            <Box as="span">ICP</Box>
            <Box as="span" color="#dcb873">
              COINS
            </Box>
          </Box>
        )}
      </HStack>
    </Link>
  );
};
