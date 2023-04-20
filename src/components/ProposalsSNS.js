/* global BigInt */

import { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Link,
  HStack,
  Text,
  Tag,
  IconButton,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import MD from './MD';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  SearchIcon,
} from '@chakra-ui/icons';

import ic from '../icblast';

export const ProposalsSNS = ({ info }) => {
  const [proposals, setProposals] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState(proposals);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const load = async () => {
    let did = await fetch(
      'https://raw.githubusercontent.com/dfinity/ic-js/main/packages/sns/candid/sns_governance.idl.js'
    ).then(x => x.text());

    let can = await ic(info.sns.governance, did);

    let proposals = await can.list_proposals({
      include_reward_status: [],
      before_proposal: [],
      limit: 120,
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

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const results = proposals.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProposals(results);
    setCurrentPage(0);
  }, [search, proposals]);

  const pageCount = Math.ceil(filteredProposals.length / itemsPerPage);

  // Slice the filteredProposals array to show only the items for the current page
  const paginatedProposals = filteredProposals.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = index => {
    if (index < 0 || index >= pageCount) return;
    setCurrentPage(index);
  };

  return (
    <Box>
      <Box color="gray.600" pb={2}>
        <HStack justifyItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {info.name} Proposals
            </Text>
          </Box>
          <Box display="flex" columnGap={2} alignItems="center">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon boxSize={4} mb={1} />}
              />
              <Input
                placeholder="Search by title"
                size="sm"
                rounded={6}
                onChange={handleSearch}
              />
            </InputGroup>

            <IconButton
              size="xs"
              icon={<ChevronLeftIcon />}
              onClick={() => handlePageClick(currentPage - 1)}
            />
            <IconButton
              size="xs"
              icon={<ChevronRightIcon />}
              onClick={() => handlePageClick(currentPage + 1)}
            />
          </Box>
        </HStack>
      </Box>

      <Stack fontSize="sm">
        {paginatedProposals.map((data, idx) => (
          <Proposal
            key={data.id}
            data={data}
            ledgerPrincipal={info.sns.ledger}
          />
        ))}
      </Stack>
    </Box>
  );
};

export const Proposal = ({ data, ledgerPrincipal }) => {
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
          <HStack>
            <Box>
              <Tag colorScheme="blue">{data.action}</Tag>
            </Box>
            {active ? (
              <Box>
                <Tag colorScheme="green">Open</Tag>
              </Box>
            ) : null}
            <Box>
              <Text>{data.title}</Text>
            </Box>
          </HStack>
        </Box>
      </HStack>
      {open ? (
        <Box pt="5" pl="5" pr="5" pb="5">
          <ReactMarkdown
            components={MD}
            children={data.summary}
            skipHtml
            disallowedElements={['img', 'embed']}
          />
          {data.url && (
            <Box display="flex" columnGap={2} paddingTop={5}>
              <Tag w="68px" colorScheme="blue">
                <Link isExternal={true} href={data.url}>
                  <ExternalLinkIcon mr="1px" /> Link
                </Link>
              </Tag>
              <Tag w="68px" colorScheme="green">
                { active &&
                <Link
                  isExternal={true}
                  href={`https://avjzx-pyaaa-aaaaj-aadmq-cai.raw.ic0.app/icsns/proposals/${ledgerPrincipal}/${data.id}`}
                >
                  <ExternalLinkIcon mr="1px" /> Vote
                </Link>}
              </Tag>
            </Box>
          )}
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
