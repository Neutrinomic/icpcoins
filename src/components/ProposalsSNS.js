/* global BigInt */

import { useState, useRef, useCallback } from 'react';
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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import MD from './MD';
import { useProposalsData } from '../hooks/useProposalsData';
import { useProposalsFilter } from '../hooks/useProposalsFilter';

const ProposalStatuses = {
  1: { label: 'Open', color: 'green' },
  2: { label: 'Rejected', color: 'red' },
  3: { label: 'Adopted', color: 'orange' },
  4: { label: 'Executed', color: 'gray' },
  5: { label: 'Failed', color: 'yellow' },
};

export const ProposalsSNS = ({ info }) => {
  const [search, setSearch] = useState('');
  const [includeStatus, setIncludeStatus] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const filterSelectRef = useRef(null);
  const pageSizeRef = useRef(null);
  const { proposals, isProposalsLoading } = useProposalsData(
    info,
    includeStatus
  );
  const { filteredProposals, paginatedProposals, currentPage, setCurrentPage } =
    useProposalsFilter(proposals, search, includeStatus, itemsPerPage);

  const pageCount = () => Math.ceil(filteredProposals.length / itemsPerPage);

  const handlePageClick = index => {
    if (index < 0 || index >= pageCount()) {
      return;
    }
    setCurrentPage(index);
  };

  const handleSearch = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const handleStatusFilterSelect = useCallback(
    e => {
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
    },
    [includeStatus]
  );

  const removeFilter = val => {
    if (includeStatus.includes(val)) {
      setIncludeStatus(prevArray => prevArray.filter(item => item !== val));
    }
  };

  return (
    <Box>
      <Box color="gray.600" pb={2}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyItems="center"
          justifyContent="space-between"
        >
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
            <Select
              size="sm"
              rounded={6}
              ref={filterSelectRef}
              onChange={e => handleStatusFilterSelect(e)}
            >
              <option value="-1">Status Filters</option>
              {Object.keys(ProposalStatuses).map((key, index) => {
                return (
                  <option key={key} value={key}>
                    {ProposalStatuses[key].label}
                  </option>
                );
              })}
            </Select>
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
        </Stack>
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

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        columnGap={2}
        marginTop={4}
      >
        <Box display="flex" columnGap={2}>
          <Text tag="span" fontWeight="bold" fontSize="sm">
            Active Filters:
          </Text>
          {includeStatus.length === 0 ? (
            <Text tag="span" fontSize="sm">
              none
            </Text>
          ) : (
            includeStatus.map(status => (
              <Tag key={status} colorScheme={ProposalStatuses[status].color}>
                <TagLabel>{ProposalStatuses[status].label}</TagLabel>
                <TagCloseButton onClick={() => removeFilter(status)} />
              </Tag>
            ))
          )}
        </Box>
        <Box width="50%">
          <Box display="flex" justifyContent="end" width="100%">
            <Box>
              <Select
                size="xs"
                rounded={6}
                ref={pageSizeRef}
                defaultValue={itemsPerPage}
                onChange={e => setItemsPerPage(pageSizeRef.current.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">25</option>
                <option value="50">50</option>
              </Select>
            </Box>
            <Text tag="span" paddingLeft={2} fontSize="sm">
              per page
            </Text>
          </Box>
          <Box display="flex" justifyContent="end" width="100%">
            <Text tag="span" fontSize="sm">
              Page {currentPage + 1} of {pageCount()}
            </Text>
          </Box>
        </Box>
      </Box>
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
          <Box display="flex" columnGap={2} paddingTop={5}>
            {data.url && (
              <Tag w="68px" colorScheme="blue">
                <Link isExternal={true} href={data.url}>
                  <ExternalLinkIcon mr="1px" /> Link
                </Link>
              </Tag>
            )}

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
