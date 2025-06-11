<template>
  <div class="student-dashboard">
    <header class="dashboard-header">
      <h1>学生个人成长画像—李培洪</h1>
      <div class="header-actions">
        <div class="search-box">
          <input type="text" placeholder="搜索学生..." v-model="searchQuery" @keyup.enter="searchStudent" />
          <button @click="searchStudent">搜索</button>
        </div>
        <button class="switch-btn" @click="$router.push('/class')">班级视图</button>
      </div>
    </header>
    
    <div class="dashboard-container">
      <!-- 学生基本信息 -->
      <div class="dashboard-panel student-info-panel">
        <h2 class="panel-title">个人基本信息</h2>
        <div class="student-info">
          <div class="avatar">
            <div class="avatar">
              <!-- 创建一个CSS样式的头像占位符 -->
              <div class="avatar-placeholder">{{ studentInfo.name?.[0] || '李' }}</div>
            </div>
          </div>
          <div class="info-details">
            <h3>{{ studentInfo.name || '李培洪' }}</h3>
            <p>学号：{{ studentInfo.studentId || '2134280149' }}</p>
            <p>班级：{{ studentInfo.class || '信息技术2134（网络班组）' }}</p>
          </div>
        </div>
      </div>
      
      <!-- 能力雷达图 -->
      <div class="dashboard-panel radar-panel">
        <h2 class="panel-title">综合能力评估</h2>
        <RadarChart :data="radarData" />
      </div>
      
      <!-- 学习情况柱状图 -->
      <div class="dashboard-panel study-panel">
        <h2 class="panel-title">学习情况分析</h2>
        <div class="study-stats">
          <div v-for="(item, index) in studyData" :key="index" class="study-item">
            <div class="study-circle" :style="{ backgroundColor: getStudyColor(index) }">
              <span>{{ item.percentage }}%</span>
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      
      <!-- 入校考评 -->
      <div class="dashboard-panel evaluation-panel">
        <h2 class="panel-title">入校考评</h2>
        <div class="evaluation-chart">
          <div class="chart-wrapper">
            <BarChart 
              :data="evaluationData" 
              :horizontal="false" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import RadarChart from '../components/charts/RadarChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import { getStudentInfo, getStudentRadarData, getStudyData } from '../utils/csvLoader';
import type { Student, RadarData, StudyData } from '../types';

const searchQuery = ref('');
const studentInfo = ref<Student>({
  id: '2134280149',
  name: '李培洪',
  studentId: '2134280149',
  class: '信息技术2134（网络班组）'
});

const radarData = ref<RadarData>({
  indicator: [
    { name: '编程设计', max: 100 },
    { name: '逻辑思维', max: 100 },
    { name: '问题解决', max: 100 },
    { name: '团队协作', max: 100 },
    { name: '学习能力', max: 100 },
    { name: '实践操作', max: 100 }
  ],
  value: [85, 90, 75, 80, 85, 70]
});

const studyData = ref<StudyData[]>([
  { name: '课堂学习', value: 90, percentage: 100 },
  { name: '课前预习', value: 85, percentage: 100 },
  { name: '课后复习', value: 95, percentage: 100 },
  { name: '课堂测试', value: 88, percentage: 100 }
]);

const evaluationData = ref([
  { name: '基础知识', value: 85, color: '#7e57c2' },
  { name: '编程能力', value: 78, color: '#ff4081' },
  { name: '解决问题', value: 92, color: '#4dd0e1' },
  { name: '实践操作', value: 88, color: '#ffb74d' },
  { name: '文档能力', value: 76, color: '#9ccc65' }
]);

const getStudyColor = (index: number) => {
  const colors = ['#4fc3f7', '#81c784', '#ffb74d', '#4dd0e1'];
  return colors[index % colors.length];
};

const searchStudent = async () => {
  if (!searchQuery.value) return;
  
  try {
    const student = await getStudentInfo(searchQuery.value);
    if (student) {
      studentInfo.value = student;
      
      // 加载学生的雷达图数据
      const radar = await getStudentRadarData(student.studentId);
      if (radar) {
        radarData.value = radar;
      }
      
      // 加载学生的学习情况数据
      const study = await getStudyData(student.studentId);
      if (study.length > 0) {
        studyData.value = study;
      }
    } else {
      alert('未找到该学生信息');
    }
  } catch (error) {
    console.error('搜索学生失败:', error);
  }
};

onMounted(async () => {
  try {
    // 默认加载示例学生数据
    const student = await getStudentInfo('2134280149');
    if (student) {
      studentInfo.value = student;
      
      // 加载学生的雷达图数据
      const radar = await getStudentRadarData(student.studentId);
      if (radar) {
        radarData.value = radar;
      }
      
      // 加载学生的学习情况数据
      const study = await getStudyData(student.studentId);
      if (study.length > 0) {
        studyData.value = study;
      }
    }
  } catch (error) {
    console.error('加载学生数据失败:', error);
  }
});
</script>

<style scoped>
.student-dashboard {
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.dashboard-header h1 {
  font-size: 24px;
  color: #fff;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.search-box {
  display: flex;
}

.search-box input {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-box button,
.switch-btn {
  padding: 8px 15px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.switch-btn {
  border-radius: 4px;
}

.student-info-panel {
  grid-column: 1;
  grid-row: 1;
}

.radar-panel {
  grid-column: 2;
  grid-row: 1;
}

.study-panel {
  grid-column: 3;
  grid-row: 1;
}

.evaluation-panel {
  grid-column: 1 / span 3;
  grid-row: 2;
}

.student-info {
  display: flex;
  align-items: center;
  padding: 10px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  border: 2px solid var(--primary-color);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-details h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.info-details p {
  margin: 5px 0;
  color: rgba(255, 255, 255, 0.8);
}

.study-stats {
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  padding: 20px 0;
}

.study-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.study-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.evaluation-chart {
  height: 300px;
}

.chart-wrapper {
  height: 100%;
}
</style>