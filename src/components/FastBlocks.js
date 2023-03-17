import { useEffect, useState } from 'react';
import ic from '../icblast';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Image,
  TableCaption,
  TableContainer,
  Skeleton,
  Box,
  Wrap,
  Link,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const fb_prefix = 'https://wnftq-taaaa-aaaaf-qahca-cai.raw.ic0.app';

export const FastBlocks = props => {
  let [articles, setArticles] = useState([]);

  const refresh = async () => {
    let fastblocks = await ic('wwapv-jyaaa-aaaaf-qahaq-cai');

    let articles = await fastblocks.getLatestPosts(0, 7);
    setArticles(articles.posts);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Box mt="2" fontSize="sm" {...props}>
      <Box fontSize="25px" fontWeight="bold" color="gray.600">
        Latest News
      </Box>
      <Stack spacing="2">
        {articles.map((data, idx) => (
          <Article key={idx} data={data} />
        ))}
      </Stack>
    </Box>
  );
};

const Article = ({ data }) => {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box borderRadius={'5px'} p="2" bg={bg}>
      <Link href={fb_prefix + data.url} target="_blank">
        {/* <Image
          src={data.headerImage}
          w="100%"
          h="170px"
          sx={{ objectFit: 'cover' }}
        /> */}
        {data.title}
      </Link>
    </Box>
  );
};
