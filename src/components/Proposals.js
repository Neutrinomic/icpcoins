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
  Wrap,
  useColorModeValue,
  RadioGroup,
  Radio,
  useMediaQuery,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setProposalFilter } from '../reducers/config';
import ic from '../icblast';
import {
  fetchProposals,
  fetchNNSProposals,
  getProposals,
} from '../reducers/proposals';

export const ProposalsOne = props => {
  let all = useSelector(state => state.proposals);
  let proposalFilter = useSelector(state => state.config.proposalFilter);
  const [small] = useMediaQuery('(max-width: 500px)');

  const dispatch = useDispatch();
  const dao = props.dao;

  useEffect(() => {
    dispatch(getProposals());
  }, [proposalFilter]);
  if (!all[dao]) return null;
  let proposals = [];

  for (let prop of all[dao]) {
    proposals.push({ dao, ...prop });
  }

  proposals.sort((a, b) => b.created - a.created);
  // leave only the first 50
  proposals = proposals.slice(0, 50);

  if (!proposals) return null;
  return (
    <Box {...props}>
      <HStack>
        <Box fontSize="25px" fontWeight="bold" color="gray.600">
          {props.dao} Governance Proposals
        </Box>
        <RadioGroup
          onChange={x => dispatch(setProposalFilter(x))}
          value={proposalFilter}
        >
          <Stack direction="row">
            <Radio value="all">Verbose</Radio>
            <Radio value="filtered">Filtered</Radio>
          </Stack>
        </RadioGroup>
      </HStack>
      <Stack fontSize="sm">
        {proposals.map((data, idx) => (
          <Proposal key={idx} data={data} single={true} small={small} />
        ))}
      </Stack>
    </Box>
  );
};

export const Proposals = props => {
  let all = useSelector(state => state.proposals);
  let proposalFilter = useSelector(state => state.config.proposalFilter);
  const dispatch = useDispatch();
  const [small] = useMediaQuery('(max-width: 500px)');

  useEffect(() => {
    dispatch(getProposals());
  }, [proposalFilter]);

  let proposals = [];
  for (let dao in all) {
    for (let prop of all[dao]) {
      proposals.push({ dao, ...prop });
    }
  }
  proposals.sort((a, b) => b.created - a.created);
  // leave only the first 50
  proposals = proposals.slice(0, 50);
  if (!proposals) return null;
  return (
    <Box {...props}>
      <HStack>
        <Box fontSize="25px" fontWeight="bold" color="gray.600">
          Governance Proposals
        </Box>
        <RadioGroup
          onChange={x => dispatch(setProposalFilter(x))}
          value={proposalFilter}
        >
          <Stack direction="row">
            <Radio value="all">Verbose</Radio>
            <Radio value="filtered">Filtered</Radio>
          </Stack>
        </RadioGroup>
      </HStack>
      <Stack fontSize="sm">
        {proposals.map((data, idx) => (
          <Proposal key={idx} data={data} small={small} />
        ))}
      </Stack>
    </Box>
  );
};

export const Proposal = ({ single = false, data, small }) => {
  const bg = useColorModeValue('white', 'gray.800');

  const active = data.decided === 0;

  const href =
    data.dao === 'NNS'
      ? 'https://dashboard.internetcomputer.org/proposal/' + data.id
      : 'https://dashboard.internetcomputer.org/sns/' +
        data.root +
        '/proposal/' +
        data.id;

  let Wrapper = small ? Wrap : HStack;

  return (
    <Box
      borderRadius={'5px'}
      p="2"
      bg={bg}
      className="ppr"
      // border={active ? '1px solid' : ''}
      // borderColor={active ? 'green.600' : 'gray.600'}
    >
      <Wrapper spacing="3">
        {single ? null : <Box w={'80px'}>{data.dao}</Box>}
        <Box w={'140px'}>{moment.unix(data.created).fromNow()}</Box>
        <Box w="100px">
          <VoteProgress
            w="100px"
            yes={Number(BigInt(data.tally.yes) / 100000000n)}
            no={Number(BigInt(data.tally.no) / 100000000n)}
            total={Number(BigInt(data.tally.total) / 100000000n)}
          />
        </Box>
        <Box w="100%">
          <Link href={href} target="_blank">
            <Wrap>
              <Tag colorScheme="blue">{data.action}</Tag>
              {/* {data.topic || data.action_id} */}
              {active ? (
                <Box>
                  <Tag colorScheme="green">Open</Tag>
                </Box>
              ) : null}
              <Box> {data.title}</Box>
            </Wrap>
          </Link>
        </Box>
      </Wrapper>
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
