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
        borderVisible: false,
        minimumWidth: 10,

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