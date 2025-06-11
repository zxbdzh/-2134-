import Papa from 'papaparse';
import type { Student, RadarData, StudyData, PieData, BarData, LineData } from '../types';

// 加载CSV文件
export async function loadCsvData(filePath: string) {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV data:', error);
    throw error;
  }
}

// 获取学生信息
export async function getStudentInfo(studentId: string): Promise<Student | null> {
  try {
    const data: any[] = await loadCsvData('/职业学校全年级数据总表_最终版的最终版的最终版.csv');
    const student = data.find(item => item.学号 === studentId);
    
    if (!student) return null;
    
    return {
      id: student.学号,
      name: student.姓名,
      studentId: student.学号,
      class: student.班级
    };
  } catch (error) {
    console.error('Error getting student info:', error);
    return null;
  }
}

// 获取学生能力雷达图数据
export async function getStudentRadarData(studentId: string): Promise<RadarData | null> {
  try {
    const data: any[] = await loadCsvData('/职业学校全年级数据总表_最终版的最终版的最终版.csv');
    const student = data.find(item => item.学号 === studentId);
    
    if (!student) return null;
    
    // 根据CSV中的数据结构调整这些字段名
    return {
      indicator: [
        { name: '编程设计', max: 100 },
        { name: '逻辑思维', max: 100 },
        { name: '问题解决', max: 100 },
        { name: '团队协作', max: 100 },
        { name: '学习能力', max: 100 },
        { name: '实践操作', max: 100 }
      ],
      value: [
        parseInt(student.编程设计 || '0'),
        parseInt(student.逻辑思维 || '0'),
        parseInt(student.问题解决 || '0'),
        parseInt(student.团队协作 || '0'),
        parseInt(student.学习能力 || '0'),
        parseInt(student.实践操作 || '0')
      ]
    };
  } catch (error) {
    console.error('Error getting radar data:', error);
    return null;
  }
}

// 获取学习情况数据
export async function getStudyData(studentId: string): Promise<StudyData[]> {
  try {
    const data: any[] = await loadCsvData('/职业学校全年级数据总表_最终版的最终版的最终版.csv');
    const student = data.find(item => item.学号 === studentId);
    
    if (!student) return [];
    
    return [
      { name: '课堂学习', value: parseInt(student.课堂学习 || '0'), percentage: 100 },
      { name: '课前预习', value: parseInt(student.课前预习 || '0'), percentage: 100 },
      { name: '课后复习', value: parseInt(student.课后复习 || '0'), percentage: 100 },
      { name: '课堂测试', value: parseInt(student.课堂测试 || '0'), percentage: 100 }
    ];
  } catch (error) {
    console.error('Error getting study data:', error);
    return [];
  }
}

// 获取班级数据
export async function getClassData(): Promise<any> {
  try {
    const data: any[] = await loadCsvData('/职业学校全年级数据总表_最终版的最终版的最终版.csv');
    const classData = data.filter(item => item.班级 === '信息技术2134');
    
    return {
      students: classData,
      count: classData.length
    };
  } catch (error) {
    console.error('Error getting class data:', error);
    return { students: [], count: 0 };
  }
}