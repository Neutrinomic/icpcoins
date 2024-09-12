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
    Tooltip
} from '@chakra-ui/react';
import { MdOutlineSsidChart, MdCandlestickChart } from "react-icons/md";

const CustomParamsSelector = () => {
    const [chartType, setChartType] = useState('line');
    const [selectedPeriod, setSelectedPeriod] = useState('1D');
    const [candleWidth, setCandleWidth] = useState('5m');

    // Colors for light and dark mode
    const borderColor = useColorModeValue('gray.300', 'gray.600');
    const bgColor = useColorModeValue('white', 'gray.700');
    const tooltipBgColor = useColorModeValue('gray.100', 'gray.600'); // Tooltip background to match color mode
    const tooltipTextColor = useColorModeValue('black', 'white'); // Tooltip text color to match color mode

    const chartTypes = [
        { label: 'Line Chart', icon: MdOutlineSsidChart, value: 'line' },
        { label: 'Candle Chart', icon: MdCandlestickChart, value: 'candle' },
    ];

    const candleWidths = [
        { label: '5 minutes', value: '5m' },
        { label: '30 minutes', value: '30m' },
        { label: '1 hour', value: '1h' },
        { label: '1 day', value: '1D' },
        { label: '7 days', value: '7D' },
        { label: '1 month', value: '1M' },
    ];

    const periods = [
        { label: '1 Day', value: '1D' },
        { label: '7 Days', value: '7D' },
        { label: '1 Month', value: '1M' },
        { label: '1 Year', value: '1Y' },
        { label: 'All Time', value: 'All' },
    ];

    const handleChartTypeSelect = (value) => {
        setChartType(value);
    };

    const handleCandleWidthSelect = (value) => {
        setCandleWidth(value);
    };

    const handlePeriodSelect = (value) => {
        setSelectedPeriod(value);
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
                    <Tooltip label={chartType === 'line' ? 'Line Chart' : 'Candle Chart'}
                        bg={tooltipBgColor}
                        color={tooltipTextColor}
                        aria-label="Chart Type Tooltip">
                        <MenuButton as={Button} size={'sm'}>
                            {chartType === 'line' ? <MdOutlineSsidChart /> : <MdCandlestickChart />}
                        </MenuButton>
                    </Tooltip>
                    <MenuList>
                        {chartTypes.map((type) => (
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
                        <Tooltip label={candleWidths.find(w => w.value === candleWidth)?.label}
                            bg={tooltipBgColor}
                            color={tooltipTextColor}
                            aria-label="Candle Width Tooltip">
                            <MenuButton as={Button} size={'sm'}>
                                {candleWidth}
                            </MenuButton>
                        </Tooltip>
                        <MenuList>
                            {candleWidths.map((width) => (
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
                <Divider orientation="vertical" height="20px" borderColor={borderColor} />

                {/* Period Selector */}
                <ButtonGroup isAttached={true}>
                    {periods.map((period) => (
                        <Tooltip key={period.value}
                            label={period.label}
                            bg={tooltipBgColor}
                            color={tooltipTextColor}
                            aria-label={`Period Tooltip ${period.label}`}>
                            <Button
                                variant={selectedPeriod === period.value ? 'solid' : 'outline'}
                                colorScheme="blue"
                                size="sm"
                                onClick={() => handlePeriodSelect(period.value)}
                            >
                                {period.value}
                            </Button>
                        </Tooltip>
                    ))}
                </ButtonGroup>
            </HStack>
        </Box>
    );
};

export default CustomParamsSelector;
