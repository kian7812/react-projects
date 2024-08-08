import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

export const useCharts = (): [ // 返回类型需要约束下
  React.RefObject<HTMLDivElement>, // 鼠标悬浮到 chartRef 有类型提示
  echarts.ECharts | undefined
] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>()

  useEffect(() => {
    if (!chartInstance) {
      const chart = echarts.init(chartRef.current as HTMLElement)
      setChartInstance(chart)
    }

  }, [])

  return [chartRef, chartInstance]
}