import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { p2i, i2t, candleIntervalToMinutes } from '../utils';
import { bigTickFormatter } from '../utils.js';
import { dexColors } from '../utils/colors.js';

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

  const chart1ContainerRef = useRef();
  const chart2ContainerRef = useRef();
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chart1ContainerRef.current.clientWidth });
    };

    const chart = createChart(chart1ContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8893a8',
        borderColor: '#8893a8',
      },
      width: chart1ContainerRef.current.clientWidth,
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
      },
      handleScroll: false,
      handleScale: false,
    });
    chart.timeScale().fitContent();

    // const maSeries = chart.addLineSeries({ color: '#2962FF', lineWidth: 1 });
    // maSeries.setData(maData);

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
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

    const chart2 = createChart(chart2ContainerRef.current, {
      layout: {
        textColor: '#8893a8',
        borderColor: '#8893a8',
        background: { type: ColorType.Solid, color: 'transparent' },
      },
      width: chart2ContainerRef.current.clientWidth,
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
      },
      localization: {
        priceFormatter: bigTickFormatter,
      },
      handleScroll: false,
      handleScale: false,
    });
    const areaSeries = chart2.addAreaSeries({
      lineColor: dexColors[0],
      lineVisible: false,
      topColor: dexColors[0],
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });

    areaSeries.setData(
      data.map(d => {
        return { value: d.v0, time: d.t };
      })
    );

    chart2.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    chart.subscribeCrosshairMove(param => {
      const dataPoint = getCrosshairDataPoint(candlestickSeries, param);
      syncCrosshair(chart2, areaSeries, dataPoint);
    });
    chart2.subscribeCrosshairMove(param => {
      const dataPoint = getCrosshairDataPoint(areaSeries, param);
      syncCrosshair(chart, candlestickSeries, dataPoint);
    });

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
      chart2.remove();
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
      <div ref={chart1ContainerRef} />
      <div ref={chart2ContainerRef} />
    </>
  );
};

export default function TradingViewWidget(props) {
  return <ChartComponent {...props}></ChartComponent>;
}
