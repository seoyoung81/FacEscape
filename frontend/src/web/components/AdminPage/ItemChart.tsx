import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
    id: string;
    width: string;
    height: string;
  }

const ItemChart: React.FC = () => {
      
    const chartRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const chartDom = chartRef.current;
        if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option: echarts.EChartsOption = {
            tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            },
            grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            },
            xAxis: [
            {
                type: 'category',
                data: ['하트', '악마', '불', '게임'],
                axisTick: {
                alignWithLabel: true,
                },
                axisLabel: {
                    fontFamily: 'MyFont',
                    fontSize: '18px'
                },
            }
            ],
            yAxis: [
            {
                type: 'value',
                axisLabel: {
                    fontFamily: 'MyFont',
                    fontSize: '12px'
                },
            },
            ],
            series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 10, 15, 22],
                itemStyle: {
                    color: '#3479AD',
                    borderRadius: [5, 5, 0, 0],
                  },
            },
            ],
        };
    
        option && myChart.setOption(option);
        }
    }, []);
    
    return (
        <div>
            <div ref={chartRef} id="main" style={{ width: '600px', height: '400px' }}></div>
        </div>
    );
    };


export default ItemChart;
