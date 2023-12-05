import { useRef, useEffect, useState } from 'react';
import { smartNumber } from './Inline';
import { Box } from '@chakra-ui/react';

export function DNumber({
  currency = false,
  n,
  isPercent = false,
  noDecimals = false,
}) {
  const prevN = usePreviousValue(n);
  let hl = {
    key: n,
    className: n > prevN ? 'hl-up' : n < prevN ? 'hl-down' : '',
  };

  hl.className += ' hlspan';

  if (noDecimals)
    return (
      <Box as="span" {...hl}>
        {currency ? <Currency c={currency}></Currency> : null}
        {n.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </Box>
    );
  if (isPercent)
    return (
      <Box as="span" {...hl}>
        {n.toFixed(2)}%
      </Box>
    );
  return (
    <Box as="span" {...hl}>
      {currency ? <Currency c={currency}></Currency> : null}
      {smartNumber(n)}
    </Box>
  );
}

function Currency({ c }) {
  if (c === 'USD') return <Box className="dollar-currency">$</Box>;
  if (c === 'ICP') return <Box className="icp-currency"></Box>;
  else return <Box as="span">{c}</Box>;
}

const usePreviousValue = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
