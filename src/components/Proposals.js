/* global BigInt */

import { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Link,
  Progress,
  HStack,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';

import ic from '../icblast';

export const Proposals = props => {
  let [proposals, setProposals] = useState([]);
  const load = async () => {
    let nns = await ic('rrkah-fqaaa-aaaaa-aaaaq-cai');

    let proposals = await nns.list_proposals({
      include_reward_status: [],
      before_proposal: [],
      limit: 10,
      exclude_topic: [0, 2, 5, 12, 8, 13, 7, 6, 9],
      include_status: [],
    });

    let r = proposals.proposal_info.map(p => ({
      id: p.id[0].id,
      deadline: p.deadline_timestamp_seconds[0],
      decided: p.decided_timestamp_seconds,
      //   summary: p.proposal[0].summary,
      title: p.proposal[0].title,
      topic: p.topic,
      status: p.status,
      tally: p.latest_tally[0],
    }));
    setProposals(r);
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <Box {...props}>
      <Box fontSize="25px" fontWeight="bold" color="gray.600">
        NNS Proposals
      </Box>

      <Stack fontSize="sm">
        {proposals.map((data, idx) => (
          <Proposal key={idx} data={data} />
        ))}
      </Stack>
    </Box>
  );
};

export const Proposal = ({ data }) => {
  const bg = useColorModeValue('white', 'gray.800');

  const active = data.decided === 0n;
  return (
    <Box
      borderRadius={'5px'}
      p="2"
      bg={bg}
      border={active ? '1px solid' : ''}
      borderColor={active ? 'green.600' : 'gray.600'}
    >
      <HStack spacing="3">
        <Box w="100px">
          <VoteProgress
            w="100px"
            yes={Number(data.tally.yes / 100000000n)}
            no={Number(data.tally.no / 100000000n)}
            total={Number(data.tally.total / 100000000n)}
          />
        </Box>
        <Box w="100%">
          <Link
            href={'https://dashboard.internetcomputer.org/proposal/' + data.id}
            target="_blank"
          >
            <HStack>
              {active ? (
                <Box>
                  <Tag colorScheme="green">Open</Tag>
                </Box>
              ) : null}
              <Box> {data.title}</Box>
            </HStack>
          </Link>
        </Box>
      </HStack>
    </Box>
  );
};

const VoteProgress = ({ yes, no, total }) => {
  const bg = useColorModeValue('gray.200', 'gray.900');

  let y = (yes / total) * 100;
  let n = (no / total) * 100;
  let r = 100 - y - n;
  return (
    <HStack spacing="0" h="15px" fontSize="10px">
      <Box bg="blue.600" w={y + '%'}>
        &nbsp;
      </Box>
      <Box bg={bg} w={r + '%'}>
        &nbsp;
      </Box>
      <Box bg="pink.600" w={n + '%'}>
        &nbsp;
      </Box>
    </HStack>
  );
};
