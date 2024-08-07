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
  Heading,
  Skeleton,
  Box,
  Wrap,
} from '@chakra-ui/react';

export const CurrencySymbol = ({ children }) => {
  return (
    <Box as="span" ml="2" sx={{ textTransform: 'uppercase' }} color="gray.600">
      {children}
    </Box>
  );
};

export const isFloat = n => {
  return Number(n) === n && n % 1 !== 0;
};

const locale = 'en-US';
export const smartNumber = n => {
  if (isFloat(n)) {
    if (n < 0.0001)
      return colorDecimals(
        n.toExponential(2)
      );
    if (n < 0.001)
      return colorDecimals(
        n.toLocaleString(locale, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 6,
        })
      );

    if (n < 10)
      return colorDecimals(
        n.toLocaleString(locale, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      );
    if (n > 1000)
      return colorDecimals(
        n.toLocaleString(locale, { maximumFractionDigits: 0 })
      );
    else
      return colorDecimals(
        n.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
  } else {
    return colorDecimals(n.toLocaleString(locale));
  }
};

const colorDecimals = x => {
  return x;
  // let [a, b] = x.split('.');
  // if (!b) return a;
  // if (b)
  //   return (
  //     <>
  //       {a}
  //       <span className="decimals">.{b}</span>
  //     </>
  //   );
};
