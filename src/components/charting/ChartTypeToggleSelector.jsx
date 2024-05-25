import React, { useState } from 'react';
import {
  Flex,
  IconButton,
  Box,
  useColorModeValue,
  Select,
  Divider,
} from '@chakra-ui/react';
import { MdOutlineSsidChart, MdCandlestickChart } from "react-icons/md";


const ToggleSelector = ({
  selectedOption,
  setSelectedOption,
  selectedCandleInterval,
  setSelectedCandleInterval,
  candleIntervalOptions,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const wrapperColor = useColorModeValue('gray.100', 'gray.700');
  const iconColor = useColorModeValue('gray.500', 'gray.400');
  const activeIconColor = useColorModeValue('blue.500', 'blue.200');

  const dividerColor = useColorModeValue('gray.300', 'gray.600');

  const buttonSize = 'md';
  const buttonHeight = '40px';
  const buttonWidth = '40px';

  const handleSelectOption = option => {
    setSelectedOption(option);
  };

  return (
    <Box bg={wrapperColor} borderRadius="md" display="inline-block" p={1}>
      <Flex alignItems="center">
        <IconButton
          icon={<MdOutlineSsidChart />}
          color={selectedOption === 'line' ? activeIconColor : iconColor}
          bg={selectedOption === 'line' ? bgColor : 'transparent'}
          onClick={() => handleSelectOption('line')}
          _hover={{ bg: bgColor }}
          _active={{ bg: bgColor }}
          size={buttonSize}
        />
        <IconButton
          icon={<MdCandlestickChart />}
          color={selectedOption === 'candlestick' ? activeIconColor : iconColor}
          bg={selectedOption === 'candlestick' ? bgColor : 'transparent'}
          onClick={() => handleSelectOption('candlestick')}
          _hover={{ bg: bgColor }}
          _active={{ bg: bgColor }}
          size={buttonSize}
        />
        {selectedOption === 'candlestick' && (
          <>
            <Divider
              orientation="vertical"
              mx={2}
              height="20px"
              borderColor={dividerColor}
            />
            {candleIntervalOptions.map(interval => (
              <CandleIntervalOption
                interval={interval}
                selectedCandleInterval={selectedCandleInterval}
                setSelectedCandleInterval={setSelectedCandleInterval}
                bgColor={bgColor}
                buttonHeight={buttonHeight}
                buttonWidth={buttonWidth}
                buttonSize={buttonSize}
              />
            ))}
          </>
        )}
      </Flex>
    </Box>
  );
};

function CandleIntervalOption({
  interval,
  selectedCandleInterval,
  setSelectedCandleInterval,
  bgColor,
  buttonHeight,
  buttonWidth,
  buttonSize,
}) {
  return (
    <Box
      bg={selectedCandleInterval === interval ? bgColor : 'transparent'}
      borderRadius="md"
      cursor="pointer"
      onClick={() => setSelectedCandleInterval(interval)}
      _hover={{ bg: bgColor }}
      size={buttonSize}
      height={buttonHeight}
      width={buttonWidth}
      lineHeight={buttonHeight}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <span>{interval}</span>
    </Box>
  );
}
export default ToggleSelector;
