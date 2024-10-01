import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTachometerAlt, FaFileAlt, FaCode } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const items = [
    {
      title: 'Dashboard',
      icon: FaTachometerAlt,
      route: '/',
      external: false,
    },
    {
      title: 'Governance',
      icon: FaFileAlt,
      route: '/proposals',
      external: false,
    },
    { title: 'Devefi', icon: FaCode, route: '/devefi', external: false },
    {
      title: 'External Link',
      icon: FaCode,
      route: 'https://external.com',
      external: true,
    },
  ];

  const bgColor = useColorModeValue('gray.500', 'gray.700');
  const fontColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <Box width="100%" pt={4}>
      <VStack spacing={4} align="stretch">
        {items.map(item =>
          item.external ? (
            <a
              href={item.route}
              key={item.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HStack
                px={3}
                py={2}
                borderRadius="sm"
                cursor="pointer"
                bg={selected === item.route ? bgColor : 'transparent'}
                color={selected === item.route ? 'white' : fontColor}
                fontSize="sm"
              >
                <Icon as={item.icon} />
                <Text>{item.title}</Text>
              </HStack>
            </a>
          ) : (
            <Link to={item.route} key={item.title}>
              <HStack
                px={3}
                py={2}
                borderRadius="sm"
                cursor="pointer"
                bg={selected === item.route ? bgColor : 'transparent'}
                color={selected === item.route ? 'white' : fontColor}
                onClick={() => setSelected(item.route)}
                fontSize="sm"
              >
                <Icon as={item.icon} />
                <Text>{item.title}</Text>
              </HStack>
            </Link>
          )
        )}
      </VStack>
    </Box>
  );
}

export default SideBar;
