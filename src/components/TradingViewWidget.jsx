import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { p2i, i2t } from '../utils';

let randomFactor = 25 + Math.random() * 25;
const samplePoint = i =>
  i *
    (0.5 +
      Math.sin(i / 10) * 0.2 +
      Math.sin(i / 20) * 0.4 +
      Math.sin(i / randomFactor) * 0.8 +
      Math.sin(i / 500) * 0.5) +
  200;

function generateLineData(numberOfPoints = 500, endDate) {
  randomFactor = 25 + Math.random() * 25;
  const res = [];
  const date = endDate || new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
  date.setUTCDate(date.getUTCDate() - numberOfPoints - 1);
  for (let i = 0; i < numberOfPoints; ++i) {
    const time = date.getTime() / 1000;
    const value = samplePoint(i);
    res.push({
      time,
      value,
    });

    date.setUTCDate(date.getUTCDate() + 1);
  }

  return res;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomBar(lastClose) {
  const open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
  const close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
  const high = +randomNumber(
    Math.max(open, close),
    Math.max(open, close) * 1.1
  ).toFixed(2);
  const low = +randomNumber(
    Math.min(open, close) * 0.9,
    Math.min(open, close)
  ).toFixed(2);
  return {
    open,
    high,
    low,
    close,
  };
}

function generateCandleData(numberOfPoints = 250, endDate) {
  const lineData = generateLineData(numberOfPoints, endDate);
  let lastClose = lineData[0].value;
  return lineData.map(d => {
    const candle = randomBar(lastClose);
    lastClose = candle.close;
    return {
      time: d.time,
      low: candle.low,
      high: candle.high,
      open: candle.open,
      close: candle.close,
    };
  });
}
const barData = generateCandleData(500);

const maData = calculateMovingAverageSeriesData(barData, 20);

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

function convertRawDataToCandleData({ rawData, noOfPaths, period }) {
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
  console.log(period);
  let candleTimeFrame = 1 * 60; // 1 hr
  if (period <= 7) {
    candleTimeFrame = 3 * 60; // 3 hrs
  } else if (period <= 31) {
    candleTimeFrame = 24 * 60; // 24 hrs
  } else if (period <= 365) {
    candleTimeFrame = 7 * 24 * 60; // 7 days
  } else {
    candleTimeFrame = 30 * 24 * 60; // 30 days
  }

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

export const ChartComponent = props => {
  const {
    data,
    noOfPaths,
    period,
    colors: {
      backgroundColor = 'white',
      lineColor = 'red',
      textColor = '"#8893a8"',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8893a8',
        borderColor: '#8893a8',
      },
      width: chartContainerRef.current.clientWidth,
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

        minimumWidth: 10,
      },
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
      })
    );

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

export default function TradingViewWidget(props) {
  return <ChartComponent {...props}></ChartComponent>;
}
