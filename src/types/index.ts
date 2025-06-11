// 学生信息类型
export interface Student {
  id: string;
  name: string;
  studentId: string;
  avatarUrl?: string;
  class?: string;
}

// 雷达图数据类型
export interface RadarData {
  indicator: Array<{ name: string; max: number }>;
  value: number[];
}

// 学习情况数据类型
export interface StudyData {
  name: string;
  value: number;
  percentage: number;
}

// 饼图数据类型
export interface PieData {
  name: string;
  value: number;
}

// 柱状图数据类型
export interface BarData {
  name: string;
  value: number;
}

// 折线图数据类型
export interface LineData {
  date: string;
  values: { [key: string]: number };
}