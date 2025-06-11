<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import type { RadarData } from '../../types';

const props = defineProps<{
  data: RadarData;
}>();

const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartContainer.value) return;
  
  chart = echarts.init(chartContainer.value);
  
  const option = {
    backgroundColor: 'transparent',
    radar: {
      indicator: props.data.indicator,
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#fff',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      }
    },
    series: [{
      name: '能力分析',
      type: 'radar',
      data: [{
        value: props.data.value,
        name: '能力值',
        areaStyle: {
          color: 'rgba(30, 136, 229, 0.6)'
        },
        lineStyle: {
          color: '#1e88e5',
          width: 2
        },
        itemStyle: {
          color: '#1e88e5'
        }
      }]
    }]
  };
  
  chart.setOption(option);
  
  window.addEventListener('resize', () => {
    chart?.resize();
  });
};

watch(() => props.data, () => {
  if (chart) {
    chart.dispose();
  }
  initChart();
}, { deep: true });

onMounted(() => {
  initChart();
});
</script>