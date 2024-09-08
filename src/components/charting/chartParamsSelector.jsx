import React, { useState } from 'react';
import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    HStack,
    Divider,
    useColorModeValue,
    Collapse,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdOutlineSsidChart, MdCandlestickChart } from "react-icons/md";

const CustomParamsSelector = () => {
    const [chartType, setChartType] = useState('line');
    const [selectedPeriod, setSelectedPeriod] = useState('1D');
    const [candleWidth, setCandleWidth] = useState('5m');

    // Colors for light and dark mode
    const borderColor = useColorModeValue('gray.300', 'gray.600');
    const bgColor = useColorModeValue('white', 'gray.700');

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

    const periods = ['1D', '7D', '1M', '1Y', 'All'];

    const handleChartTypeSelect = (value) => {
        setChartType(value);
    };

    const handleCandleWidthSelect = (value) => {
        setCandleWidth(value);
    };

    return (
        <Box
            p={2}
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            bg={bgColor}
            width={'fit-content'}
        >
            <HStack>
                {/* Chart Type Selector */}
                <Menu>
                    <MenuButton as={Button}>
                        {chartType === 'line' ? <MdOutlineSsidChart /> : <MdCandlestickChart />}
                    </MenuButton>
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
                        <MenuButton as={Button}>
                            {candleWidth}
                        </MenuButton>
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
                <Divider orientation="vertical" height="50px" borderColor={borderColor} />

                {/* Period Selector */}
                <HStack spacing={2}>
                    {periods.map((period) => (
                        <Button
                            key={period}
                            variant={selectedPeriod === period ? 'solid' : 'outline'}
                            colorScheme="blue"
                            onClick={() => setSelectedPeriod(period)}
                        >
                            {period}
                        </Button>
                    ))}
                </HStack>
            </HStack>
        </Box>
    );
};

export default CustomParamsSelector;
