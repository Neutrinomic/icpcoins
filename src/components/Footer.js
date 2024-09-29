import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

import { Logo } from './Logo';
import powered from '../assets/powered.dark.svg';
import poweredL from '../assets/powered.light.svg';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export function Footer() {
  let pwd = useColorModeValue(poweredL, powered);
  return (
    <Box
      // ml="-15"
      // mr="-15"
      bg={useColorModeValue('gray.30', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'1278'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Text fontSize={'sm'}>© 2024 ICPCoins</Text>
            <Text fontSize={'sm'}>
              Powered by the Internet Computer
              <br />
              100% on-chain and SNS DAO governed
            </Text>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Organization</ListHeader>
            <Box as="a" href={'#/about'}>
              About
            </Box>
            <Box
              as="a"
              target="_blank"
              href={
                'https://dashboard.internetcomputer.org/sns/extk7-gaaaa-aaaaq-aacda-cai'
              }
            >
              Neutrinite DAO
            </Box>
            <Box
              as="a"
              target="_blank"
              href={
                'https://drive.google.com/file/d/1PtPMKycqh6evLdpHGcAd3dJ_IowgrluY/view'
              }
            >
              Whitepaper
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Information</ListHeader>
            <Box as="a" href={'#/terms'}>
              Terms of Use
            </Box>
            <Box as="a" href={'#/listing'}>
              Listing
            </Box>
            <Box
              as="a"
              href={'https://github.com/orgs/Neutrinomic/repositories'}
            >
              Github <ExternalLinkIcon mx="2px" />
            </Box>
            <Box as="a" href={'#/topcans'}>
              TopCans
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Socials</ListHeader>
            <Box as="a" href={'https://twitter.com/ICPCoins'}>
              Twitter
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
