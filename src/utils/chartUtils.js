import { bigTickFormatter } from '../utils.js';
import { ColorType, CrosshairMode } from 'lightweight-charts';
export const minZeroAutoScalingProvider = (original) => {
    const res = original();
    if (res != null) {
        return {
            ...res,
            priceRange: {
                minValue: Math.max(res.priceRange.minValue, 0),
                maxValue: res.priceRange.maxValue,
            },

        }
    }
    return res;

}

export const customAutoScalingProvider = (original, min, max) => {
    const res = original();
    if (res != null) {
        return {
            ...res,
            priceRange: {
                minValue: min,
                maxValue: max,
            },

        }
    }
    return res;

}


export const defaultChartOptions = {
    layout: {
        textColor: '#8893a8',
        borderColor: '#8893a8',
        background: { type: ColorType.Solid, color: 'transparent' },
    },
    height: 150,
    grid: {
        vertLines: {
            visible: false,
        },
        horzLines: {
            visible: false,
        },
    },
    timeScale: {
        visible: false,
    },
    crosshair: {
        mode: CrosshairMode.Normal,
    },
    rightPriceScale: {
        ticksVisible: true,
        visible: true,
        minimumWidth: 60,
        borderVisible: false,
        scaleMargins: {
            top: 0,
            bottom: 0
        }
    },
    // localization: {
    //     priceFormatter: bigTickFormatter,
    // },
    handleScroll: false,
    handleScale: false,
}

// Function to get candle width options based on period
export const getValidCandleWidthOptions = (period) => {

    const candleWidths = {
        "5m": { label: "5 minutes", value: "5m" },
        "30m": { label: "30 minutes", value: "30m" },
        "1h": { label: "1 hour", value: "1h" },
        "3h": { label: "3 hours", value: "3h" },
        "1d": { label: "1 day", value: "1d" },
        "3d": { label: "3 days", value: "3d" },
        "7d": { label: "7 days", value: "7d" },
        "1m": { label: "1 month", value: "1m" }
    }
    if (period == 1) {
        return [candleWidths['5m'], candleWidths['30m'], candleWidths['1h'], candleWidths['3h']];
    } else if (period <= 7) {
        return [candleWidths['5m'], candleWidths['30m'], candleWidths['1h'], candleWidths['3h'], candleWidths['1d']];
    } else if (period <= 31) {
        return [candleWidths['1d'], candleWidths['3d']];
    } else {
        return [candleWidths['3d'], candleWidths['7d']];
    }
};

// Function to check if the candleWidth is valid for the given period
export const checkValidCandleWidth = (period, candleWidth) => {
    const validCandleWidths = getValidCandleWidthOptions(period);
    return validCandleWidths.some(option => option.value === candleWidth);
};