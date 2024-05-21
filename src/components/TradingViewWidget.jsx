import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { p2i, i2t, candleIntervalToMinutes } from '../utils';
import { bigTickFormatter } from '../utils.js';
import { areaSeriesBottomOpacity, dexColors, hexToRgba } from '../utils/colors.js';
import { minZeroAutoScalingProvider } from '../utils/chartUtils.js';

// function generateCandleData(numberOfPoints = 250, endDate) {
//   const lineData = generateLineData(numberOfPoints, endDate);
//   let lastClose = lineData[0].value;
//   return lineData.map(d => {
//     const candle = randomBar(lastClose);
//     lastClose = candle.close;
//     return {
//       time: d.time,
//       low: candle.low,
//       high: candle.high,
//       open: candle.open,
//       close: candle.close,
//     };
//   });
// }
// const barData = generateCandleData(500);

// const maData = calculateMovingAverageSeriesData(barData, 20);

function calculateMovingAverageSeriesData(candleData, maLength) {
  const maData = [];

  for (let i = 0; i < candleData.length; i++) {
    if (i < maLength) {
      // Provide whitespace data points until the MA can be calculated
      maData.push({ time: candleData[i].time });
    } else {
      // Calculate the moving average, slow but simple way
      let sum = 0;
      for (let j = 0; j < maLength; j++) {
        sum += candleData[i - j].close;
      }
      const maValue = sum / maLength;
      maData.push({ time: candleData[i].time, value: maValue });
    }
  }

  return maData;
}

function convertRawDataToCandleData({
  rawData,
  noOfPaths,
  period,
  selectedCandleInterval,
}) {
  //rawData is received from props as an array of the following format

  /**
   * @typedef {Object} MergedElement
   * @property {number} t - Timestamp
   * @property {number} tt - Treasury token accumulation
   * @property {number} ticp - Treasury ICP accumulation
   * @property {number} cs - Circulating supply difference
   * @property {...number} pN - Price of the Nth path
   * @property {...number} vN - Volume of the Nth path converted to USD
   * @property {...number} lN - Depth of bid of the Nth path
   * @property {...number} laN - Depth of ask of the Nth path
   */

  // It needs to be converted to the following format for tradingView :

  /**
     * {
            time: d.time, 
            low: candle.low,
            high: candle.high,
            open: candle.open,
            close: candle.close,
        };
     */

  let candleTimeFrame = candleIntervalToMinutes(selectedCandleInterval); // how many minutes a single candle should represent

  let tickerInterval = p2i(period);
  let tickerTimeFrame = i2t(tickerInterval) / 60;

  let blockSize = Math.floor(candleTimeFrame / tickerTimeFrame);
  let candleChartData = [];

  for (let i = 0; i < rawData.length; i += blockSize) {
    const block = rawData.slice(i, i + blockSize);
    candleChartData.push(
      calculateSingleCandleDataFromPriceSubArray(block, noOfPaths)
    );
  }

  return candleChartData;
}

function calculateSingleCandleDataFromPriceSubArray(priceSubArray, noOfPaths) {
  /**
     * This function calculates the following values for a single candlestick from the priceSubArray
     @property {number} open : average of open prices on each path , in that time frame
     @property {number} close : average of closing prices on each path, in that time frame
     @property {number} high : the highest price in any path that I can find in that time frame
     @property {number} low : the lowest price I can find in any of the paths , in that time frame
     */

  let low = Number.MAX_SAFE_INTEGER;
  let high = Number.MIN_SAFE_INTEGER;
  let open = 0;
  let close = 0;

  priceSubArray.forEach((d, index) => {
    for (let i = 0; i < noOfPaths; i++) {
      if (index == 0) {
        open += d[`p${i}`];
      }
      if (index == priceSubArray.length - 1) {
        close += d[`p${i}`];
      }
      if (d[`p${i}`] < low) {
        low = d[`p${i}`];
      }
      if (d[`p${i}`] > high) {
        high = d[`p${i}`];
      }
    }
  });

  if (low == Number.MAX_SAFE_INTEGER || high == Number.MIN_SAFE_INTEGER) {
    low = 0;
    high = 0;
  }

  return {
    time: moment(
      priceSubArray[Math.floor(priceSubArray.length / 2)].t
    ).valueOf(),
    open: open / noOfPaths,
    close: close / noOfPaths,
    high: high,
    low: low,
  };
}

function getCrosshairDataPoint(series, param) {
  if (!param.time) {
    return null;
  }
  const dataPoint = param.seriesData.get(series);
  return dataPoint || null;
}

function syncCrosshair(chart, series, dataPoint) {
  if (dataPoint) {
    chart.setCrosshairPosition(dataPoint.value, dataPoint.time, series);
    return;
  }
  chart.clearCrosshairPosition();
}

export const ChartComponent = props => {
  const {
    data,
    noOfPaths,
    period,
    selectedCandleInterval,
    colors: {
      backgroundColor = 'white',
      lineColor = 'red',
      textColor = '"#8893a8"',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
  } = props;

  const candleChartContainerRef = useRef();
  const volume24ChartContainerRef = useRef();
  const depth100ChartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      candleChart.applyOptions({ width: candleChartContainerRef.current.clientWidth });
    };

    // ------------------------------------
    // candleSeries plot
    // ------------------------------------

    const candleChart = createChart(candleChartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8893a8',
        borderColor: '#8893a8',
      },
      width: candleChartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        allowBoldLabels: false,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        ticksVisible: true,
        borderVisible: false,
        width: 10,
        scaleMargins: {
          top: 0,
          bottom: 0
        }
      },
      handleScroll: false,
      handleScale: false,
    });
    candleChart.timeScale().fitContent();

    const candlestickSeries = candleChart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      autoscaleInfoProvider: minZeroAutoScalingProvider,
      localization: {
        priceFormatter: bigTickFormatter,
      },
    });
    //candlestickSeries.setData(barData);
    candlestickSeries.setData(
      convertRawDataToCandleData({
        rawData: data,
        noOfPaths: noOfPaths,
        period: period,
        selectedCandleInterval: selectedCandleInterval,
      })
    );

    const volume24Chart = createChart(volume24ChartContainerRef.current, {
      layout: {
        textColor: '#8893a8',
        borderColor: '#8893a8',
        background: { type: ColorType.Solid, color: 'transparent' },
      },
      width: volume24ChartContainerRef.current.clientWidth,
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
      //   priceFormatter: bigTickFormatter,
      // },
      handleScroll: false,
      handleScale: false,
    });


    // ------------------------------------
    // volume24 plot
    // ------------------------------------

    /**
     * volumeSeries0 , is the volume series on the first path (index 0)
     * it is added outside the follwing loop, to maintain reference for syncing crosshair across graphs
     */

    const volumeSeries0 = volume24Chart.addAreaSeries({
      lineColor: dexColors[0],
      lineVisible: false,
      topColor: dexColors[0],
      bottomColor: hexToRgba(dexColors[0], areaSeriesBottomOpacity),
      autoscaleInfoProvider: minZeroAutoScalingProvider,
      priceFormat: {
        type: 'volume'
      }
    });

    volumeSeries0.setData(
      data.map(d => {
        return { value: d['v0'], time: d.t };
      })
    );

    // chart volume24 for other paths, without maintaining the reference
    if (noOfPaths > 1) {
      for (let idx = 1; idx < noOfPaths; idx++) {
        let a = volume24Chart.addAreaSeries({
          lineColor: dexColors[idx],
          lineVisible: false,
          topColor: dexColors[idx],
          bottomColor: hexToRgba(dexColors[idx], areaSeriesBottomOpacity),
          autoscaleInfoProvider: minZeroAutoScalingProvider,
          priceFormat: {
            type: 'volume'
          }
        });

        a.setData(
          data.map(d => {
            return { value: d[`v${idx}`], time: d.t };
          })
        );
      }
    }


    volume24Chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);



    // ------------------------------------
    // Sync all charts
    // ------------------------------------

    candleChart.subscribeCrosshairMove(param => {
      const dataPoint = getCrosshairDataPoint(candlestickSeries, param);
      syncCrosshair(volume24Chart, volumeSeries0, dataPoint);
    });
    volume24Chart.subscribeCrosshairMove(param => {
      const dataPoint = getCrosshairDataPoint(volumeSeries0, param);
      syncCrosshair(candleChart, candlestickSeries, dataPoint);
    });

    return () => {
      window.removeEventListener('resize', handleResize);

      candleChart.remove();
      volume24Chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <>
      <div ref={candleChartContainerRef} />
      <div ref={volume24ChartContainerRef} />
    </>
  );
};

export default function TradingViewWidget(props) {
  return <ChartComponent {...props}></ChartComponent>;
}
