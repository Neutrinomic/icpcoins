import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Text } from '@chakra-ui/react';

const newTheme = {
  p: props => {
    const { children } = props;
    return (
      <Text mb={2} fontSize={'14px'}>
        {children}
      </Text>
    );
  },
  h1: props => {
    const { children } = props;
    return (
      <Text mt={4} fontSize={'32px'}>
        {children}
      </Text>
    );
  },
  h2: props => {
    const { children } = props;
    return (
      <Text mt={4} fontSize={'22px'}>
        {children}
      </Text>
    );
  },
  h3: props => {
    const { children } = props;
    return (
      <Text mt={4} fontSize={'18px'}>
        {children}
      </Text>
    );
  },
};

export default ChakraUIRenderer(newTheme);
