import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Divider,
  useColorModeValue,
  Collapse,
  Tooltip,
} from '@chakra-ui/react';
import { MdOutlineSsidChart, MdCandlestickChart } from 'react-icons/md';

const CustomParamsSelector = ({
  chartType,
  setChartType,
  days_from_start,
  candleWidth,
  setCandleWidth,
  candleWidthOptions,
  onChangePeriod,
  period,
}) => {
  // Colors for light and dark mode
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const bgColor = useColorModeValue('white', 'gray.700');
  const tooltipBgColor = useColorModeValue('gray.100', 'gray.600'); // Tooltip background to match color mode
  const tooltipTextColor = useColorModeValue('black', 'white'); // Tooltip text color to match color mode

  const chartTypes = [
    { label: 'Line Chart', icon: MdOutlineSsidChart, value: 'line' },
    { label: 'Candle Chart', icon: MdCandlestickChart, value: 'candle' },
  ];

  const periods = [
    { label: '1 Day', value: '1D', days: 1 },
    { label: '7 Days', value: '7D', days: 7 },
    { label: '1 Month', value: '1M', days: 30 },
    { label: '1 Year', value: '1Y', days: 365 },
    { label: 'All Time', value: 'All', days: days_from_start },
  ];

  const handleChartTypeSelect = value => {
    setChartType(value);
  };

  const handleCandleWidthSelect = value => {
    setCandleWidth(value);
  };

  return (
    <Box
      p={2}
      borderWidth="1px"
      borderRadius="md"
      borderColor={borderColor}
      bg={bgColor}
      width={'fit-content'}
    >
      <HStack>
        {/* Chart Type Selector */}
        <Menu>
          <Tooltip
            label={chartType === 'line' ? 'Line Chart' : 'Candle Chart'}
            bg={tooltipBgColor}
            color={tooltipTextColor}
            aria-label="Chart Type Tooltip"
          >
            <MenuButton as={Button} size={'sm'} onFocus={e => e.preventDefault()}>
              {chartType === 'line' ? (
                <MdOutlineSsidChart />
              ) : (
                <MdCandlestickChart />
              )}
            </MenuButton>
          </Tooltip>
          <MenuList zIndex="popover">
            {chartTypes.map(type => (
              <MenuItem
                key={type.value}
                icon={<type.icon />}
                onClick={() => handleChartTypeSelect(type.value)}
              >
                {type.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        {/* Conditionally render Candle Width Selector with transition */}
        <Collapse in={chartType === 'candle'} animateOpacity>
          <Menu>
            <Tooltip
              label={
                candleWidthOptions.find(w => w.value === candleWidth)?.label
              }
              bg={tooltipBgColor}
              color={tooltipTextColor}
              aria-label="Candle Width Tooltip"
            >
              <MenuButton as={Button} size={'sm'} onFocus={e => e.preventDefault()}>
                {candleWidth}
              </MenuButton>
            </Tooltip>
            <MenuList zIndex="popover">
              {candleWidthOptions.map(width => (
                <MenuItem
                  key={width.value}
                  onClick={() => handleCandleWidthSelect(width.value)}
                >
                  {width.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Collapse>

        {/* Divider */}
        <Divider
          orientation="vertical"
          height="20px"
          borderColor={borderColor}
        />

        {/* Period Selector */}
        <ButtonGroup isAttached={true}>
          {periods.map(p => (
            <Tooltip
              key={p.value}
              label={p.label}
              bg={tooltipBgColor}
              color={tooltipTextColor}
              aria-label={`Period Tooltip ${p.label}`}
            >
              <Button
                variant={period === p.days ? 'solid' : 'outline'}
                colorScheme="blue"
                size="sm"
                onClick={() => onChangePeriod(p.days)}
              >
                {p.value}
              </Button>
            </Tooltip>
          ))}
        </ButtonGroup>
      </HStack>
    </Box>
  );
};

export default CustomParamsSelector;
