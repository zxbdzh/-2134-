<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import type { LineData } from '../../types';

const props = defineProps<{
  data: LineData[];
  series: string[];
  title?: string;
}>();

const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartContainer.value) return;
  
  chart = echarts.init(chartContainer.value);
  
  const colors = [
    '#7e57c2', '#ff4081', '#4dd0e1', '#ffb74d', '#9ccc65',
    '#5c6bc0', '#ec407a', '#26c6da', '#ffa726', '#8bc34a'
  ];
  
  const seriesData = props.series.map((seriesName, index) => ({
    name: seriesName,
    type: 'line',
    data: props.data.map(item => item.values[seriesName] || 0),
    smooth: true,
    lineStyle: {
      width: 3,
      color: colors[index % colors.length]
    },
    itemStyle: {
      color: colors[index % colors.length]
    }
  }));
  
  const option = {
    backgroundColor: 'transparent',
    title: props.title ? {
      text: props.title,
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      left: 'center'
    } : undefined,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: props.series,
      textStyle: {
        color: '#fff'
      },
      top: props.title ? 25 : 5
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: props.title ? '15%' : '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.data.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: seriesData
  };
  
  chart.setOption(option);
  
  window.addEventListener('resize', () => {
    chart?.resize();
  });
};

watch([() => props.data, () => props.series], () => {
  if (chart) {
    chart.dispose();
  }
  initChart();
}, { deep: true });

onMounted(() => {
  initChart();
});
</script>