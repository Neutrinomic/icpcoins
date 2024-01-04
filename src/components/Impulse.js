import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import {
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Tag,
  Container,
  Spacer,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import ChakraCarousel from './Carousel.js';
import moment from 'moment';
import MD from './MD';
import ReactMarkdown from 'react-markdown';

export const Articles = ({ articles }) => {
  const [expanded, setExpanded] = useState(false);
  const light = useColorModeValue(true, false);

  const modalSize = useBreakpointValue(
    { base: 'full', md: 'xl' },
    { fallback: 'xl' }
  );

  if (!articles || !articles.length) return null;

  return (
    <Box>
      <Modal
        isOpen={expanded}
        onClose={() => setExpanded(false)}
        size={modalSize}
      >
        <ModalOverlay />
        {expanded ? (
          <ModalContent
            style={
              !light
                ? {
                    backgroundImage:
                      'linear-gradient(to bottom, rgba(23, 28, 35, 0.6),rgba(23, 28, 35, 1), rgba(23, 28, 35, 1)), url(' +
                      expanded.meta.thumb +
                      ')',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }
                : {}
            }
          >
            <ModalHeader pr="40px">{expanded.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ReactMarkdown components={MD} children={expanded.body} />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setExpanded(false)}
              >
                Close
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  let links = findHttpsLinks(expanded.body);
                  if (links.length) window.open(links[0], '_blank');
                }}
              >
                View Discussion
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : null}
      </Modal>

      <Box className="scbi" style={{ position: 'relative' }}>
        <Container
          py={8}
          px={0}
          pb={0}
          maxW={{
            base: '100%',
            sm: '35rem',
            md: '43.75rem',
            lg: '57.5rem',
            xl: '75rem',
            xxl: '87.5rem',
          }}
        >
          <ChakraCarousel gap={32}>
            {articles.map((post, index) => (
              <Flex
                onClick={() => {
                  if (!expanded) setExpanded(post);
                }}
                key={index}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                justifyContent="space-between"
                flexDirection="column"
                overflow="hidden"
                color="gray.300"
                bg="base.d100"
                rounded={5}
                flex={1}
                p={5}
                style={
                  // expanded
                  // ? {
                  //     backgroundImage:
                  //       'linear-gradient(to bottom, rgba(23, 28, 35, 0.8),rgba(23, 28, 35, 1), rgba(23, 28, 35, 1)), url(' +
                  //       post.meta.thumb +
                  //       ')',
                  //     backgroundRepeat: 'no-repeat',
                  //   }
                  //   : {
                  { backgroundImage: 'url(' + post.meta.thumb + ')' }
                  // }
                }
              >
                <Box mb={0} minH={'150px'}>
                  <Heading
                    pt={8}
                    fontSize={{ base: 'xl' }}
                    textAlign="left"
                    w="full"
                    mb={2}
                  >
                    <span className="highlight">{post.title}</span>
                  </Heading>
                  <Box fontSize="12px" style={{ textAlign: 'left' }}>
                    <span className="highlight">
                      {moment(post.createdAt * 1000).fromNow()}
                    </span>
                  </Box>
                </Box>
              </Flex>
            ))}
          </ChakraCarousel>
        </Container>
      </Box>
    </Box>
  );
};

function findHttpsLinks(text) {
  // This regex matches https URLs
  const regex = /https:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+/gi;

  // Search for the URLs using the regex
  const links = text.match(regex);

  return links || []; // Return the found links or an empty array if no links found
}
