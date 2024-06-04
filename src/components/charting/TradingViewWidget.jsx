import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { p2i, i2t, candleIntervalToMinutes } from '../../utils.js';
import { bigTickFormatter } from '../../utils.js';
import { areaSeriesBottomOpacity, dexColors, hexToRgba } from '../../utils/colors.js';
import { customAutoScalingProvider, defaultChartOptions, minZeroAutoScalingProvider } from '../../utils/chartUtils.js';
import ChartWrapper from './ChartWrapper.jsx';

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
    const block = rawData.slice(i, i + blockSize + 1);
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
  if (dataPoint && series && chart) {
    chart.setCrosshairPosition(dataPoint.value, dataPoint.time, series);
    return;
  }
  chart?.clearCrosshairPosition();
}

export const ChartComponent = props => {
  const {
    data,
    noOfPaths,
    period,
    selectedCandleInterval,
    symbol,
    isDex,
    locking,
    colors: {
      backgroundColor = 'white',
      lineColor = 'red',
      textColor = '"#8893a8"',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
  } = props;

  //References for each chart in the stack
  const candleChartContainerRef = useRef();
  const volume24ChartContainerRef = useRef();
  const depth100ChartContainerRef = useRef();
  const depth50ChartContainerRef = useRef();
  const treasuryTokenChartContainerRef = useRef();
  const treasuryICPChartContainerRef = useRef();
  const totalLockedChartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      candleChart.applyOptions({ width: candleChartContainerRef.current.clientWidth });
    };

    // ------------------------------------
    // candleSeries plot
    // ------------------------------------

    const candleChart = createChart(candleChartContainerRef.current, {
      ...defaultChartOptions,
      width: candleChartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        visible: true,
      },
    });
    const calculatedCandleData = convertRawDataToCandleData({
      rawData: data,
      noOfPaths: noOfPaths,
      period: period,
      selectedCandleInterval: selectedCandleInterval,
    });

    //manually calculate min and max, to pass to auto scaler and limit Y-axis
    let priceMinGreaterThanZero = Number.MAX_SAFE_INTEGER;
    let priceMaxGreaterThanZero = Number.MIN_SAFE_INTEGER;
    calculatedCandleData.forEach((candle) => {
      if (candle.open == 0 || candle.close == 0 || candle.high == 0 || candle.low == 0) {

      } else {
        if (candle.low < priceMinGreaterThanZero) priceMinGreaterThanZero = candle.low;
        if (candle.high > priceMaxGreaterThanZero) priceMaxGreaterThanZero = candle.high;
      }
    })
    const candlestickSeries = candleChart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      autoscaleInfoProvider: (original) => customAutoScalingProvider(original, priceMinGreaterThanZero, priceMaxGreaterThanZero),
      localization: {
        priceFormatter: bigTickFormatter,
      },
    });
    //candlestickSeries.setData(barData);
    candlestickSeries.setData(
      calculatedCandleData
    );

    candleChart.timeScale().fitContent();
    // ------------------------------------
    // volume24 plot
    // ------------------------------------

    /**
     * volumeSeries0 , is the volume series on the first path (index 0)
     * it is added outside the follwing loop, to maintain reference for syncing crosshair across graphs
     */

    const volume24Chart = createChart(volume24ChartContainerRef.current, {
      ...defaultChartOptions,
      width: volume24ChartContainerRef.current.clientWidth,
      localization: {
        priceFormatter: bigTickFormatter,
      },
    });

    // chart volume24 for other paths, without maintaining the reference
    if (noOfPaths > 1) {
      for (let idx = 1; idx < noOfPaths; idx++) {
        let a = volume24Chart.addAreaSeries({
          lineColor: dexColors[idx],
          lineVisible: true,
          lineWidth: 1,
          priceLineVisible: false,
          topColor: dexColors[idx],
          bottomColor: hexToRgba(dexColors[idx], areaSeriesBottomOpacity),
          autoscaleInfoProvider: minZeroAutoScalingProvider,
          priceFormat: {
            type: 'volume'
          },
        });

        a.setData(
          data.map(d => {
            return { value: d[`v${idx}`], time: d.t };
          })
        );
      }
    }

    const volumeSeries0 = volume24Chart.addAreaSeries({
      lineColor: dexColors[0],
      lineVisible: true,
      lineWidth: 1,
      topColor: dexColors[0],
      priceLineVisible: false,
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

    volume24Chart.timeScale().fitContent();


    // ------------------------------------
    // depth 100 (Ask) plot
    // ------------------------------------

    /**
     * depth100Series0 , is the depth100 (Ask) series on the first path (index 0)
     * it is added outside the follwing loop, to maintain reference for syncing crosshair across graphs
     */

    const depth100Chart = isDex ? createChart(depth100ChartContainerRef.current, {
      ...defaultChartOptions,
      width: depth100ChartContainerRef.current.clientWidth,
      height: 100,
      rightPriceScale: {
        ...defaultChartOptions.rightPriceScale,
        invertScale: true,
      },
      localization: {
        priceFormatter: bigTickFormatter,
      },
    }) : null;

    // chart depth100 for other paths, without maintaining the reference
    if (noOfPaths > 1 && isDex) {
      for (let idx = 1; idx < noOfPaths; idx++) {
        let a = depth100Chart.addAreaSeries({
          lineColor: dexColors[idx],
          lineVisible: true,
          lineWidth: 1,
          priceLineVisible: false,
          bottomColor: dexColors[idx],
          topColor: hexToRgba(dexColors[idx], areaSeriesBottomOpacity),
          autoscaleInfoProvider: minZeroAutoScalingProvider,
          priceFormat: {
            type: 'volume'
          },
          invertFilledArea: true,
        });

        a.setData(
          data.map(d => {
            return { value: d[`la${idx}`], time: d.t };
          })
        );
      }
    }

    const depth100Series0 = isDex ? depth100Chart.addAreaSeries({
      lineColor: dexColors[0],
      lineVisible: true,
      lineWidth: 1,
      priceLineVisible: false,
      bottomColor: dexColors[0],
      topColor: hexToRgba(dexColors[0], areaSeriesBottomOpacity),
      autoscaleInfoProvider: minZeroAutoScalingProvider,
      priceFormat: {
        type: 'volume'
      },
      invertFilledArea: true,
    }) : null;

    if (isDex) {
      depth100Series0.setData(
        data.map(d => {
          return { value: d['la0'], time: d.t };
        })
      );

      depth100Chart.timeScale().fitContent();
    }

    // ------------------------------------
    // depth 50 (Bid) plot
    // ------------------------------------

    /**
     * depth50Series0 , is the depth100 (Ask) series on the first path (index 0)
     * it is added outside the follwing loop, to maintain reference for syncing crosshair across graphs
     */

    const depth50Chart = isDex ? createChart(depth50ChartContainerRef.current, {
      ...defaultChartOptions,
      width: depth50ChartContainerRef.current.clientWidth,
      height: 100,
      localization: {
        priceFormatter: bigTickFormatter,
      },
    }) : null;

    // chart depth50 for other paths, without maintaining the reference
    if (noOfPaths > 1 && isDex) {
      for (let idx = 1; idx < noOfPaths; idx++) {
        let a = depth50Chart.addAreaSeries({
          lineColor: dexColors[idx],
          lineVisible: true,
          lineWidth: 1,
          priceLineVisible: false,
          topColor: dexColors[idx],
          bottomColor: hexToRgba(dexColors[idx], areaSeriesBottomOpacity),
          autoscaleInfoProvider: minZeroAutoScalingProvider,
          priceFormat: {
            type: 'volume'
          },
        });

        a.setData(
          data.map(d => {
            return { value: d[`l${idx}`], time: d.t };
          })
        );
      }
    }

    const depth50Series0 = isDex ? depth50Chart.addAreaSeries({
      lineColor: dexColors[0],
      lineVisible: true,
      lineWidth: 1,
      priceLineVisible: false,
      topColor: dexColors[0],
      bottomColor: hexToRgba(dexColors[0], areaSeriesBottomOpacity),
      autoscaleInfoProvider: minZeroAutoScalingProvider,
      priceFormat: {
        type: 'volume'
      },
    }) : null;

    if (isDex) {
      depth50Series0.setData(
        data.map(d => {
          return { value: d['l0'], time: d.t };
        })
      );

      depth50Chart.timeScale().fitContent();
    }

    // ------------------------------------
    // treasury token movement plot
    // ------------------------------------

    const treasuryTokenChart = (isDex && locking) ? createChart(treasuryTokenChartContainerRef.current, {
      ...defaultChartOptions,
      width: treasuryTokenChartContainerRef.current.clientWidth,
      height: 50,
      localization: {
        priceFormatter: bigTickFormatter,
      },
    }) : null;

    const treasuryTokenMovementLineSeries = (isDex && locking) ? treasuryTokenChart.addLineSeries({
      color: '#446600',
      lineVisible: true,
      lineWidth: 1,
      priceLineVisible: false,
      //autoscaleInfoProvider: minZeroAutoScalingProvider,
      priceFormat: {
        type: 'volume'
      },
    }) : null;

    if (isDex && locking) {
      treasuryTokenMovementLineSeries.setData(
        data.map(d => {
          return { value: d['tt'], time: d.t };
        })
      );

      treasuryTokenChart.timeScale().fitContent();
    }

    // ------------------------------------
    // treasury ICP movement plot
    // ------------------------------------

    const treasuryICPChart = (isDex && locking) ? createChart(treasuryICPChartContainerRef.current, {
      ...defaultChartOptions,
      width: treasuryICPChartContainerRef.current.clientWidth,
      height: 50,
      localization: {
        priceFormatter: bigTickFormatter,
      },
    }) : null;

    const treasuryICPMovementLineSeries = (isDex && locking) ? treasuryICPChart.addLineSeries({
      color: '#446600',
      lineVisible: true,
      lineWidth: 1,
      priceLineVisible: false,
      //autoscaleInfoProvider: minZeroAutoScalingProvider,
      priceFormat: {
        type: 'volume'
      },
    }) : null;

    if (isDex && locking) {
      treasuryICPMovementLineSeries.setData(
        data.map(d => {
          return { value: d['ticp'], time: d.t };
        })
      );

      treasuryICPChart.timeScale().fitContent();
    }


    // ------------------------------------
    // total locked movement plot
    // ------------------------------------

    const totalLockedMovementChart = (isDex && locking) ? createChart(totalLockedChartContainerRef.current, {
      ...defaultChartOptions,
      width: totalLockedChartContainerRef.current.clientWidth,
      height: 50,
      localization: {
        priceFormatter: bigTickFormatter,
      },
    }) : null;

    const totalLockedMovementSeries = (isDex && locking) ? totalLockedMovementChart.addBaselineSeries({
      topLineColor: '#445566',
      bottomLineColor: '#445566',
      lineVisible: true,
      lineWidth: 1,
      priceLineVisible: false,
      topFillColor1: '#445566',
      topFillColor2: hexToRgba('#445566', areaSeriesBottomOpacity),
      bottomFillColor2: '#445566',
      bottomFillColor1: hexToRgba('#445566', areaSeriesBottomOpacity),
      //autoscaleInfoProvider: minZeroAutoScalingProvider,
      priceFormat: {
        type: 'volume'
      },
      baseValue: {
        type: 'price',
        price: 0,
      }
    }) : null;

    if (isDex && locking) {
      totalLockedMovementSeries.setData(
        data.map(d => {
          return { value: d['cs'], time: d.t };
        })
      );

      totalLockedMovementChart.timeScale().fitContent();

    }

    // ------------------------------------
    // Sync all charts
    // ------------------------------------

    window.addEventListener('resize', handleResize);

    candleChart.subscribeCrosshairMove(param => {
      const dataPoint = getCrosshairDataPoint(candlestickSeries, param);
      //syncCrosshair(candleChart, candlestickSeries, dataPoint);
      syncCrosshair(volume24Chart, volumeSeries0, dataPoint);
      syncCrosshair(depth100Chart, depth100Series0, dataPoint);
      syncCrosshair(depth50Chart, depth50Series0, dataPoint);
      syncCrosshair(treasuryTokenChart, treasuryTokenMovementLineSeries, dataPoint);
      syncCrosshair(treasuryICPChart, treasuryICPMovementLineSeries, dataPoint);
      syncCrosshair(totalLockedMovementChart, totalLockedMovementSeries, dataPoint);
    });
    volume24Chart.subscribeCrosshairMove(param => {
      const dataPoint = getCrosshairDataPoint(volumeSeries0, param);
      syncCrosshair(candleChart, candlestickSeries, dataPoint);
      //syncCrosshair(volume24Chart, volumeSeries0, dataPoint);
      syncCrosshair(depth100Chart, depth100Series0, dataPoint);
      syncCrosshair(depth50Chart, depth50Series0, dataPoint);
      syncCrosshair(treasuryTokenChart, treasuryTokenMovementLineSeries, dataPoint);
      syncCrosshair(treasuryICPChart, treasuryICPMovementLineSeries, dataPoint);
      syncCrosshair(totalLockedMovementChart, totalLockedMovementSeries, dataPoint);
    });

    if (isDex) {
      depth100Chart.subscribeCrosshairMove(param => {
        const dataPoint = getCrosshairDataPoint(depth100Series0, param);
        syncCrosshair(candleChart, candlestickSeries, dataPoint);
        syncCrosshair(volume24Chart, volumeSeries0, dataPoint);
        //syncCrosshair(depth100Chart, depth100Series0, dataPoint);
        syncCrosshair(depth50Chart, depth50Series0, dataPoint);
        syncCrosshair(treasuryTokenChart, treasuryTokenMovementLineSeries, dataPoint);
        syncCrosshair(treasuryICPChart, treasuryICPMovementLineSeries, dataPoint);
        syncCrosshair(totalLockedMovementChart, totalLockedMovementSeries, dataPoint);
      });

      depth50Chart.subscribeCrosshairMove(param => {
        const dataPoint = getCrosshairDataPoint(depth50Series0, param);
        syncCrosshair(candleChart, candlestickSeries, dataPoint);
        syncCrosshair(volume24Chart, volumeSeries0, dataPoint);
        syncCrosshair(depth100Chart, depth100Series0, dataPoint);
        //syncCrosshair(depth50Chart, depth50Series0, dataPoint);
        syncCrosshair(treasuryTokenChart, treasuryTokenMovementLineSeries, dataPoint);
        syncCrosshair(treasuryICPChart, treasuryICPMovementLineSeries, dataPoint);
        syncCrosshair(totalLockedMovementChart, totalLockedMovementSeries, dataPoint);
      });
    }

    if (isDex && locking) {
      treasuryTokenChart.subscribeCrosshairMove(param => {
        const dataPoint = getCrosshairDataPoint(treasuryTokenMovementLineSeries, param);
        syncCrosshair(candleChart, candlestickSeries, dataPoint);
        syncCrosshair(volume24Chart, volumeSeries0, dataPoint);
        syncCrosshair(depth100Chart, depth100Series0, dataPoint);
        syncCrosshair(depth50Chart, depth50Series0, dataPoint);
        //syncCrosshair(treasuryTokenChart, treasuryTokenMovementLineSeries, dataPoint);
        syncCrosshair(treasuryICPChart, treasuryICPMovementLineSeries, dataPoint);
        syncCrosshair(totalLockedMovementChart, totalLockedMovementSeries, dataPoint);
      });

      treasuryICPChart.subscribeCrosshairMove(param => {
        const dataPoint = getCrosshairDataPoint(treasuryICPMovementLineSeries, param);
        syncCrosshair(candleChart, candlestickSeries, dataPoint);
        syncCrosshair(volume24Chart, volumeSeries0, dataPoint);
        syncCrosshair(depth100Chart, depth100Series0, dataPoint);
        syncCrosshair(depth50Chart, depth50Series0, dataPoint);
        syncCrosshair(treasuryTokenChart, treasuryTokenMovementLineSeries, dataPoint);
        //syncCrosshair(treasuryICPChart, treasuryICPMovementLineSeries, dataPoint);
        syncCrosshair(totalLockedMovementChart, totalLockedMovementSeries, dataPoint);
      });

      totalLockedMovementChart.subscribeCrosshairMove(param => {
        const dataPoint = getCrosshairDataPoint(totalLockedMovementSeries, param);
        syncCrosshair(candleChart, candlestickSeries, dataPoint);
        syncCrosshair(volume24Chart, volumeSeries0, dataPoint);
        syncCrosshair(depth100Chart, depth100Series0, dataPoint);
        syncCrosshair(depth50Chart, depth50Series0, dataPoint);
        syncCrosshair(treasuryTokenChart, treasuryTokenMovementLineSeries, dataPoint);
        syncCrosshair(treasuryICPChart, treasuryICPMovementLineSeries, dataPoint);
        //syncCrosshair(totalLockedMovementChart, totalLockedMovementSeries, dataPoint);
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      // ------------------------------------
      // Cleanup all charts
      // ------------------------------------
      candleChart.remove();
      volume24Chart.remove();
      depth100Chart?.remove();
      depth50Chart?.remove();
      treasuryTokenChart?.remove();
      treasuryICPChart?.remove();
      totalLockedMovementChart?.remove();
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
      {isDex && <>
        <ChartWrapper title="Depth +100% (Ask)">
          <div ref={depth100ChartContainerRef} />
        </ChartWrapper>
        <ChartWrapper title="Depth -50% (Bid)">
          <div ref={depth50ChartContainerRef} />
        </ChartWrapper>
      </>}
      <ChartWrapper title="Volume24h">
        <div ref={volume24ChartContainerRef} />
      </ChartWrapper>
      {(isDex && locking) &&
        <>
          <ChartWrapper title={`Treasury ${symbol} movement`}>
            <div ref={treasuryTokenChartContainerRef} />
          </ChartWrapper>
          <ChartWrapper title={`Treasury ICP movement`}>
            <div ref={treasuryICPChartContainerRef} />
          </ChartWrapper>
          <ChartWrapper title={`Total locked movement`}>
            <div ref={totalLockedChartContainerRef} />
          </ChartWrapper>
        </>
      }

    </>
  );
};

export default function TradingViewWidget(props) {
  return <ChartComponent {...props}></ChartComponent>;
}