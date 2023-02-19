import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import * as tokens from '../tokens/index';

export const TokenList = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Market Cap</Th>
            <Th isNumeric>24h Volume</Th>
            <Th isNumeric>Circulating Supply</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(tokens).map((name, idx) => (
            <Tr key={idx}>
              <Td>{idx + 1}</Td>
              <Td>
                <Link to={'/token/' + name}>{name} </Link>
              </Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
