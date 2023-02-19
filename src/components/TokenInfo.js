import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import { Box, Text } from '@chakra-ui/react';
import * as tokens from '../tokens/index';
import { Routes, Route, useParams } from 'react-router-dom';

const newTheme = {
  p: props => {
    const { children } = props;
    return (
      <Text mb={2} fontSize={'16px'}>
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
};

export const TokenInfo = () => {
  let { name } = useParams();
  let markdown = tokens[name].info.description;
  return (
    <Box fontSize="15px">
      <ReactMarkdown
        components={ChakraUIRenderer(newTheme)}
        children={markdown}
        skipHtml
      />
    </Box>
  );
};
