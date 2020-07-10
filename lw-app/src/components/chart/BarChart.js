'use strict';

import React from 'react';
import { View } from 'react-native';
import {Svg, Rect, G} from 'react-native-svg';
import AbstractChart from './AbstractChart';

const BarChart = (props) => {

    const BaseChart = new AbstractChart(props);
    const paddingTop = 16;
    const paddingRight = 40;
    const barWidth = 32;

    const chartData = props.chartData.datasets[0].data;

    const renderBars = () => {

        const baseHeight = BaseChart.calcBaseHeight(chartData, props.height);
        return chartData.map((x, i) => {

            const barHeight = BaseChart.calcHeight(x, chartData, props.height);
            
            return (
                <Rect
                    key={Math.random()}
                    x={
                        paddingRight +
                        (i * (props.width - paddingRight)) / chartData.length +
                        barWidth / 2
                    }
                    y={
                        ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
                        paddingTop + 8
                    }
                    width={barWidth}
                    height={(Math.abs(barHeight) / 4) * 3}
                    fill="url(#fillShadowGradient)"
                />
            )
        })
    }

    const renderBarTops = () => {
        const {width, height} = props;
        const baseHeight = BaseChart.calcBaseHeight(chartData, height)
        return chartData.map((x, i) => {
            const barHeight = BaseChart.calcHeight(x, chartData, height)
            return (
            <Rect
                key={Math.random()}
                x={
                paddingRight +
                (i * (width - paddingRight)) / chartData.length +
                barWidth / 2
                }
                y={((baseHeight - barHeight) / 4) * 3 + paddingTop + 8}
                width={barWidth}
                height={2}
                fill={BaseChart.props.chartConfig.color(0.6)}
            />
            )
        })
    }

    const config = {
        height: props.height,
        width: props.width,
    }

    return (
        <View style={props.containerStyle}>
            <Svg height={props.height} width={props.width}>
                {BaseChart.renderDefs({
                    ...config,
                    ...props.chartConfig
                })}
                <Rect
                    width="100%"
                    height={props.height}
                    rx={props.borderRadius}
                    ry={props.borderRadius}
                    fill="url(#backgroundGradient)"
                />
                <G>
                    {renderBars()}
                </G>
                {BaseChart.renderHorizontalLines({
                  ...config,
                  count: 5,
                  paddingTop,
                  paddingRight
                })}
                <G>
                    {
                        BaseChart.renderHorizontalLabels({
                        ...config,
                        count: 5,
                        data: chartData,
                        paddingTop,
                        paddingRight
                        })
                    }
                </G>
                <G>
                    {
                        BaseChart.renderVerticalLabels({
                          ...config,
                          labels: props.chartData.labels,
                          paddingRight,
                          paddingTop,
                          horizontalOffset: barWidth
                        })
                    }
                </G>
                <G>
                    {renderBarTops()}
                </G>
            </Svg>
        </View>
    )
}

export default BarChart;
