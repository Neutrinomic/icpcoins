/* global BigInt */

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Box,
  Stack,
  Link,
  HStack,
  Text,
  Tag,
  TagLabel,
  Select,
  IconButton,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Input,
  CircularProgress,
  TagCloseButton,
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
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [search, setSearch] = useState('');
  const [includeStatus, setIncludeStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { proposals, isProposalsLoading } = useProposalsData(
    info,
    includeStatus
  );

  useEffect(() => {
    setFilteredProposals(proposals);
    setCurrentPage(0);
  }, [proposals]);

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

  const handleFilterSelect = (e, filterSelectRef) => {
    const selectedValue = Number(e.target.value);
    if (includeStatus.includes(selectedValue)) {
      setIncludeStatus(prevArray =>
        prevArray.filter(item => item !== selectedValue)
      );
    } else {
      setIncludeStatus(prevArray => [...prevArray, selectedValue]);
    }
    // Reset the select box value using ref
    if (filterSelectRef.current) {
      filterSelectRef.current.value = -1;
    }
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === '') {
      setFilteredProposals(proposals);
    } else {
      const results = proposals.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProposals(results);
    }
  }, [search, proposals, includeStatus]);

  return (
    <Box>
      <Box color="gray.600" pb={2}>
        <HStack justifyItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {info.name} Proposals
            </Text>
          </Box>
          <Box
            display="flex"
            columnGap={2}
            alignItems="center"
            justifyItems="center"
          >
            <FilterSelect onSelect={handleFilterSelect} />
            <SearchInput onSearch={handleSearch} />

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
        {isProposalsLoading ? (
          <Box width="100%" display="flex" justifyContent="center">
            <CircularProgress
              marginTop={4}
              isIndeterminate
              trackColor="transparent"
              color="purple.500"
            />
          </Box>
        ) : (
          paginatedProposals.map((data, idx) => (
            <Proposal
              key={data.id}
              data={data}
              ledgerPrincipal={info.sns.ledger}
            />
          ))
        )}
      </Stack>

      <Box display="flex" alignItems="center" columnGap={2} marginTop={4}>
        <Text tag="span" fontWeight="bold" fontSize="sm">
          Active Filters:
        </Text>
        {includeStatus.length === 0
          ? 'none'
          : includeStatus.map(status => (
              <StatusFilterTag
                key={status}
                status={status}
                setIncludeStatus={setIncludeStatus}
                includeStatus={includeStatus}
              />
            ))}
      </Box>
    </Box>
  );
};

const FilterSelect = ({ onSelect }) => {
  const filterSelectRef = useRef(null);

  const handleChange = useCallback(
    e => {
      onSelect(e, filterSelectRef);
    },
    [onSelect]
  );

  return (
    <Select size="sm" rounded={6} ref={filterSelectRef} onChange={handleChange}>
      <option value="-1">Select Filters</option>
      <option value="1">Open</option>
      <option value="2">Rejected</option>
      <option value="3">Adopted</option>
      <option value="4">Executed</option>
      <option value="5">Failed</option>
    </Select>
  );
};

const SearchInput = ({ onSearch }) => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon boxSize={4} mb={1} />}
      />
      <Input
        placeholder="Search by title"
        size="sm"
        rounded={6}
        onChange={onSearch}
      />
    </InputGroup>
  );
};

export const StatusFilterTag = ({
  status,
  setIncludeStatus,
  includeStatus,
}) => {
  const statusLabels = {
    1: 'Open',
    2: 'Rejected',
    3: 'Adopted',
    4: 'Executed',
    5: 'Failed',
  };

  const statusLabelColors = {
    1: 'green',
    2: 'red',
    3: 'orange',
    4: 'gray',
    5: 'yellow',
  };

  const removeFilter = val => {
    if (includeStatus.includes(val)) {
      setIncludeStatus(prevArray => prevArray.filter(item => item !== val));
    }
  };

  return (
    <Tag key={status} colorScheme={statusLabelColors[status]}>
      <TagLabel>{statusLabels[status]}</TagLabel>
      <TagCloseButton onClick={() => removeFilter(status)} />
    </Tag>
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
              {active && (
                <Tag w="68px" colorScheme="green">
                  <Link
                    isExternal={true}
                    href={`https://avjzx-pyaaa-aaaaj-aadmq-cai.raw.ic0.app/icsns/proposals/${ledgerPrincipal}/${data.id}`}
                  >
                    <ExternalLinkIcon mr="1px" /> Vote
                  </Link>
                </Tag>
              )}
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

const useProposalsData = (info, includeStatus) => {
  const [proposals, setProposals] = useState([]);
  const [isProposalsLoading, setIsProposalsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsProposalsLoading(true);
      let did = await fetch(
        'https://raw.githubusercontent.com/dfinity/ic-js/main/packages/sns/candid/sns_governance.idl.js'
      ).then(x => x.text());

      let can = await ic(info.sns.governance, did);

      let proposals = await can.list_proposals({
        include_reward_status: [],
        before_proposal: [],
        limit: 100,
        exclude_type: [], //0, 2, 5, 12, 8, 13, 7, 6, 9
        include_status: includeStatus,
      });

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
      setIsProposalsLoading(false);
      setProposals(r);
    };

    load();
  }, [includeStatus]);

  return { proposals, isProposalsLoading };
};
