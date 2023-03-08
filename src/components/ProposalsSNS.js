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
  IconButton,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import MD from './MD';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import ic from '../icblast';

export const ProposalsSNS = ({ info }) => {
  let [before_proposal, setBeforeProposal] = useState(false);
  let [proposals, setProposals] = useState([]);
  const load = async () => {
    let did = await fetch(
      'https://raw.githubusercontent.com/dfinity/ic-js/main/packages/sns/candid/sns_governance.idl.js'
    ).then(x => x.text());

    let can = await ic(info.sns.governance, did);

    let proposals = await can.list_proposals({
      include_reward_status: [],
      before_proposal: before_proposal ? [{ id: before_proposal }] : [],
      limit: 10,
      exclude_type: [], //0, 2, 5, 12, 8, 13, 7, 6, 9
      include_status: [],
    });
    // console.log(proposals);

    let r = proposals.proposals.map(p => ({
      id: p.id[0].id,
      deadline: Number(
        p.wait_for_quiet_state[0].current_deadline_timestamp_seconds
      ),
      decided: p.decided_timestamp_seconds,
      url: p.proposal[0].url,
      summary: p.proposal[0].summary,
      title: p.proposal[0].title,
      action: Object.keys(p.proposal[0].action[0])[0],
      tally: p.latest_tally[0],
    }));
    // console.log(r);
    setProposals(r);
  };

  useEffect(() => {
    load();
  }, [before_proposal]);

  return (
    <Box>
      <Box fontSize="25px" fontWeight="bold" color="gray.600">
        <HStack>
          <Box>{info.name} Proposals</Box>
          <IconButton
            size="xs"
            icon={<ChevronLeftIcon />}
            onClick={() => setBeforeProposal(false)}
          />
          <IconButton
            size="xs"
            icon={<ChevronRightIcon />}
            onClick={() =>
              setBeforeProposal(proposals[proposals.length - 1].id)
            }
          />
        </HStack>
      </Box>

      <Stack fontSize="sm">
        {proposals.map((data, idx) => (
          <Proposal key={data.id} data={data} />
        ))}
      </Stack>
    </Box>
  );
};

export const Proposal = ({ data }) => {
  const bg = useColorModeValue('white', 'gray.900');

  let [open, setOpen] = useState(false);
  const active = data.decided === 0n;

  return (
    <Box
      borderRadius={'5px'}
      p="2"
      bg={bg}
      border={active ? '1px solid' : ''}
      borderColor={active ? 'green.600' : 'gray.600'}
    >
      <HStack
        spacing="3"
        onClick={() => setOpen(!open)}
        sx={{ cursor: 'pointer' }}
      >
        <Box w="100px">
          <VoteProgress
            w="100px"
            yes={Number(data.tally.yes / 100000000n)}
            no={Number(data.tally.no / 100000000n)}
            total={Number(data.tally.total / 100000000n)}
          />
        </Box>
        <Box w="100%">
          {/* <Link
            href={'https://dashboard.internetcomputer.org/proposal/' + data.id}
            target="_blank"
          > */}

          <Wrap>
            <Tag colorScheme="blue">{data.action}</Tag>
            {active ? (
              <Box>
                <Tag colorScheme="green">Open</Tag>
              </Box>
            ) : null}
            <Box> {data.title}</Box>
          </Wrap>

          {/* </Link> */}
        </Box>
      </HStack>
      {open ? (
        <Box pt="5" pl="5" pr="5" pb="5">
          <ReactMarkdown components={MD} children={data.summary} skipHtml />
        </Box>
      ) : null}
    </Box>
  );
};

const VoteProgress = ({ yes, no, total }) => {
  const bg = useColorModeValue('gray.200', 'gray.800');

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
