import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react'; // Assuming you are using Chakra UI for Box component
import { smartNumber } from './Inline';

export function DNumberPlus({
    currency = false,
    n,
    isPercent = false,
    noDecimals = false,
    anim = true,
  }) {
    const [prevN, setPrevN] = useState(n);
    const [changes, setChanges] = useState([]);
  
    useEffect(() => {
      if (n !== prevN) {
        const change = n - prevN;
        setChanges(prevChanges => [...prevChanges, change]);
        setPrevN(n);
      }
    }, [n, prevN]);
  
    useEffect(() => {
      if (changes.length > 0) {
        const timer = setTimeout(() => {
          setChanges(prevChanges => prevChanges.slice(1));
        }, 1000); // Each change disappears after 1 second
        return () => clearTimeout(timer);
      }
    }, [changes]);
  
    let hl = {
      key: n,
      className: n > prevN ? 'hl-up' : n < prevN ? 'hl-down' : '',
    };
  
    hl.className += ' hlspan';
    if (!anim) hl = {};
  
    const formattedNumber = noDecimals
      ? n.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : isPercent
      ? `${n.toFixed(2)}%`
      : smartNumber(n);
  
    return (
      <Box as="span" {...hl} style={{ position: 'relative' }}>
        {currency && <Currency c={currency} />}
        {formattedNumber}
        {anim &&
          changes.map((change, index) => (
            <Box
              key={index}
              className={`change-indicator ${change > 0 ? 'up' : 'down'}`}
              style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                transform: 'translateY(-30px)',
                opacity: 1,
                transition: 'transform 3s ease-out, opacity 3s ease-out',
                animation: `flyUp 3s ease-out forwards`,
              }}
            >
              {change > 0 ? `+${smartNumber(Math.abs(change))}` : `-${smartNumber(Math.abs(change))}`}
            </Box>
          ))}
      </Box>
    );
  }
  
  function Currency({ c }) {
    if (c === 'USD') return <Box className="dollar-currency">$</Box>;
    return <Box as="span">{c} </Box>;
  }
  
  const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

