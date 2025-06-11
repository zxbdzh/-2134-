<template>
  <div class="class-dashboard">
    <header class="dashboard-header">
      <h1>信息技术2134班学情分析</h1>
      <div class="header-actions">
        <button class="switch-btn" @click="$router.push('/student')">学生视图</button>
      </div>
    </header>
    
    <div class="dashboard-container class-container">
      <!-- 班级学生列表 -->
      <div class="dashboard-panel students-panel">
        <h2 class="panel-title">信息技术2134班-32人（学生列表）</h2>
        <div class="students-grid">
          <div v-for="student in students" :key="student.id" class="student-card">
            <div class="student-avatar"></div>
            <p>{{ student.name }}</p>
          </div>
        </div>
      </div>
      
      <!-- 前置学科成绩 -->
      <div class="dashboard-panel scores-panel">
        <h2 class="panel-title">前置学科成绩</h2>
        <LineChart 
          :data="scoreData" 
          :series="['班级一', '班级二', '班级三']" 
        />
      </div>
      
      <!-- 网络规划与管理能力分析 -->
      <div class="dashboard-panel skills-panel">
        <h2 class="panel-title">网络规划与管理能力分析</h2>
        <BarChart 
          :data="skillsData" 
          :horizontal="true" 
        />
      </div>
      
      <!-- 网络课程分类情况 -->
      <div class="dashboard-panel course-panel">
        <h2 class="panel-title">网络课程分类情况</h2>
        <div class="course-stats">
          <div v-for="(item, index) in courseData" :key="index" class="course-item">
            <div class="course-circle" :style="{ backgroundColor: getCourseColor(index) }">
              <span>{{ item.percentage }}%</span>
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      
      <!-- 技能测试结果 -->
      <div class="dashboard-panel test-panel">
        <h2 class="panel-title">技能测试结果</h2>
        <RadarChart :data="testData" />
      </div>
      
      <!-- 设备操作熟练性问调查 -->
      <div class="dashboard-panel survey-panel">
        <h2 class="panel-title">设备操作熟练性问调查</h2>
        <PieChart :data="surveyData" :doughnut="true" />
      </div>
      
      <!-- 职业素养程度 -->
      <div class="dashboard-panel professional-panel">
        <h2 class="panel-title">职业素养程度</h2>
        <BarChart 
          :data="professionalData" 
          :horizontal="false" 
        />
      </div>
      
      <!-- 网安意识问卷调查 -->
      <div class="dashboard-panel security-panel">
        <h2 class="panel-title">网安意识问卷调查</h2>
        <PieChart :data="securityData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import RadarChart from '../components/charts/RadarChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import { getClassData } from '../utils/csvLoader';

const students = ref([
  { id: '1', name: '张三峰' },
  { id: '2', name: '李四方' },
  { id: '3', name: '王五星' },
  { id: '4', name: '赵六合' },
  { id: '5', name: '钱七彩' },
  { id: '6', name: '孙八方' },
  { id: '7', name: '周九州' },
  { id: '8', name: '吴十全' },
  { id: '9', name: '郑十一' },
  { id: '10', name: '王十二' },
  { id: '11', name: '陈十三' },
  { id: '12', name: '林十四' },
]);

const scoreData = ref([
  { date: '第一周', values: { '班级一': 85, '班级二': 78, '班级三': 82 } },
  { date: '第二周', values: { '班级一': 82, '班级二': 80, '班级三': 85 } },
  { date: '第三周', values: { '班级一': 88, '班级二': 82, '班级三': 80 } },
  { date: '第四周', values: { '班级一': 85, '班级二': 85, '班级三': 83 } },
  { date: '第五周', values: { '班级一': 90, '班级二': 78, '班级三': 84 } },
  { date: '第六周', values: { '班级一': 82, '班级二': 84, '班级三': 82 } },
  { date: '第七周', values: { '班级一': 78, '班级二': 80, '班级三': 79 } },
  { date: '第八周', values: { '班级一': 85, '班级二': 75, '班级三': 80 } },
]);

const skillsData = ref([
  { name: '合格', value: 7, color: '#7e57c2' },
  { name: '较为熟练', value: 11, color: '#ff4081' },
  { name: '不及格', value: 14, color: '#4dd0e1' },
]);

const courseData = ref([
  { name: '网络基础', value: 25, percentage: 25 },
  { name: '网络管理', value: 35, percentage: 35 },
  { name: '网络安全', value: 40, percentage: 40 },
]);

const testData = ref({
  indicator: [
    { name: '编程设计', max: 100 },
    { name: '逻辑思维', max: 100 },
    { name: '问题解决', max: 100 },
    { name: '团队协作', max: 100 },
    { name: '学习能力', max: 100 },
    { name: '实践操作', max: 100 }
  ],
  value: [75, 82, 65, 85, 70, 78]
});

const surveyData = ref([
  { name: '了解', value: 50, color: '#ff4081' },
  { name: '不了解', value: 33, color: '#4dd0e1' },
  { name: '不清楚', value: 17, color: '#7e57c2' },
]);

const professionalData = ref([
  { name: '敬业精神', value: 75, color: '#7e57c2' },
  { name: '职业素养', value: 62.5, color: '#ff4081' },
  { name: '沟通能力', value: 71.88, color: '#4dd0e1' },
  { name: '安全意识', value: 84.38, color: '#ffb74d' },
  { name: '文档能力', value: 78.13, color: '#9ccc65' },
]);

const securityData = ref([
  { name: '高', value: 53.13, color: '#7e57c2' },
  { name: '中', value: 28.13, color: '#ff4081' },
  { name: '低', value: 18.74, color: '#4dd0e1' },
]);

const getCourseColor = (index: number) => {
  const colors = ['#4fc3f7', '#81c784', '#ffb74d'];
  return colors[index % colors.length];
};

onMounted(async () => {
  try {
    const classData = await getClassData();
    if (classData.students.length > 0) {
      students.value = classData.students.map((student: any) => ({
        id: student.学号,
        name: student.姓名
      }));
    }
  } catch (error) {
    console.error('加载班级数据失败:', error);
  }
});
</script>

<style scoped>
.class-dashboard {
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

.switch-btn {
  padding: 8px 15px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.class-container {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto;
}

.students-panel {
  grid-column: 1;
  grid-row: 1;
}

.scores-panel {
  grid-column: 2;
  grid-row: 1;
}

.skills-panel {
  grid-column: 3;
  grid-row: 1;
}

.course-panel {
  grid-column: 1;
  grid-row: 2;
}

.test-panel {
  grid-column: 2;
  grid-row: 2;
}

.survey-panel {
  grid-column: 3;
  grid-row: 2;
}

.professional-panel {
  grid-column: 1 / span 2;
  grid-row: 3;
}

.security-panel {
  grid-column: 3;
  grid-row: 3;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.student-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

.student-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  margin-bottom: 5px;
}

.student-card p {
  font-size: 12px;
  text-align: center;
  margin: 0;
}

.course-stats {
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  padding: 20px 0;
}

.course-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.course-circle {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>