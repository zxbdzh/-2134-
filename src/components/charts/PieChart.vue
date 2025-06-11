<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import type { PieData } from '../../types';

const props = defineProps<{
  data: PieData[];
  title?: string;
  doughnut?: boolean;
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
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: '#fff'
      },
      data: props.data.map(item => item.name)
    },
    series: [{
      name: '数据分布',
      type: 'pie',
      radius: props.doughnut ? ['50%', '70%'] : '70%',
      center: ['40%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#0a1a35',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}: {d}%',
        color: '#fff'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '16',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true
      },
      data: props.data.map((item, index) => ({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: colors[index % colors.length]
        }
      }))
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