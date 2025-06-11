<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
  data: Array<{ name: string; value: number; color?: string }>;
  title?: string;
  horizontal?: boolean;
}>();

const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartContainer.value) return;
  
  chart = echarts.init(chartContainer.value);
  
  const colors = props.data.map(item => item.color || '#1e88e5');
  
  const option: echarts.EChartsOption = {
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
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: props.title ? '15%' : '3%',
      containLabel: true
    },
    xAxis: props.horizontal ? {
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
    } : {
      type: 'category',
      data: props.data.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    yAxis: props.horizontal ? {
      type: 'category',
      data: props.data.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    } : {
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
    series: [{
      name: '数值',
      type: 'bar',
      data: props.horizontal ? 
        props.data.map((item, index) => ({
          value: item.value,
          itemStyle: {
            color: colors[index]
          }
        })) :
        props.data.map((item, index) => ({
          value: item.value,
          itemStyle: {
            color: colors[index]
          }
        })),
      barWidth: props.horizontal ? 15 : '40%',
      label: {
        show: true,
        position: props.horizontal ? 'right' : 'top',
        color: '#fff'
      }
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