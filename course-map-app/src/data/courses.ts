import type { Course } from '../types';

export const initialCourses: Course[] = [
  // === 通识必修类 ===
  { id: 'sxdd', name: '思想道德与法治', credits: '3学分', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'zgjxd', name: '中国近现代史纲要', credits: '3学分', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'mks', name: '马克思主义基本原理', credits: '3学分', semester: 3, category: 'general', status: 'active', section: 'general' },
  { id: 'mzd', name: '毛泽东思想和中国特色社会主义理论体系概论', credits: '3学分', semester: 4, category: 'general', status: 'active', section: 'general' },
  { id: 'xjp', name: '习近平新时代中国特色社会主义思想概论', credits: '3学分', semester: 6, category: 'general', status: 'active', section: 'general' },
  { id: 'hswh', name: '红色文化', credits: '1学分', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'xsyzc', name: '形势与政策', credits: '2学分', semester: 1, category: 'general', status: 'active', section: 'general' }, // 1-4学期
  { id: 'gjaq', name: '国家安全教育', credits: '1学分', semester: 3, category: 'general', status: 'active', section: 'general' },
  
  { id: 'dxyy1', name: '大学英语Ⅰ', credits: '3学分', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'dxyy2', name: '大学英语Ⅱ', credits: '3学分', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'dxyy3', name: '大学英语Ⅲ', credits: '2学分', semester: 3, category: 'general', status: 'active', section: 'general' },
  
  { id: 'dxty1', name: '大学体育Ⅰ', credits: '1学分', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'dxty2', name: '大学体育Ⅱ', credits: '1学分', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'dxty3', name: '大学体育Ⅲ', credits: '1学分', semester: 3, category: 'general', status: 'active', section: 'general' },
  { id: 'dxty4', name: '大学体育Ⅳ', credits: '1学分', semester: 4, category: 'general', status: 'active', section: 'general' },

  { id: 'xl1', name: '大学生心理健康教育Ⅰ', credits: '1学分', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'xl2', name: '大学生心理健康教育Ⅱ', credits: '1学分', semester: 2, category: 'general', status: 'active', section: 'general' },

  { id: 'zygh', name: '大学生职业生涯规划', credits: '0.5学分', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'jyzd', name: '大学生就业指导', credits: '0.5学分', semester: 5, category: 'general', status: 'active', section: 'general' },
  { id: 'cxcy', name: '创新创业基础', credits: '1.5学分', semester: 4, category: 'general', status: 'active', section: 'general' },

  { id: 'ldll', name: '劳动教育理论', credits: '0.5学分', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'jsll', name: '军事理论', credits: '2学分', semester: 1, category: 'general', status: 'active', section: 'general' },

  // === 工程基础课 & 专业基础课 (统称数学基础/基础) ===
  { id: 'gs1', name: '高等数学Ⅰ', credits: '4学分', semester: 1, category: 'math', status: 'active', section: 'math' },
  { id: 'gs2', name: '高等数学Ⅱ', credits: '4学分', semester: 2, category: 'math', status: 'active', section: 'math' },
  { id: 'dxwl', name: '大学物理', credits: '4学分', semester: 2, category: 'math', status: 'active', section: 'math' },
  { id: 'wlsy', name: '大学物理实验', credits: '1学分', semester: 2, category: 'math', status: 'active', section: 'math' },
  
  { id: 'xd2', name: '线性代数Ⅱ', credits: '3学分', semester: 2, category: 'math', status: 'active', section: 'math' },
  { id: 'ls', name: '离散数学', credits: '4学分', semester: 3, category: 'math', status: 'active', section: 'math' },
  { id: 'gl2', name: '概率论与数理统计Ⅱ', credits: '3学分', semester: 4, category: 'math', status: 'active', section: 'math' },

  // === 专业类课程 (分为 base 和 core) ===
  { id: 'jsjdl', name: '计算机导论', credits: '3学分', semester: 1, category: 'base', status: 'active', section: 'base' },
  { id: 'cxj', name: '程序设计基础', credits: '5学分', semester: 1, category: 'base', status: 'active', section: 'base' },
  { id: 'sjk', name: '数据库技术与应用', credits: '3学分', semester: 2, category: 'base', status: 'active', section: 'base' },
  { id: 'java', name: 'Java程序设计', credits: '3学分', semester: 2, category: 'base', status: 'deleted', section: 'base' },
  { id: 'linux', name: 'Linux实践', credits: '1学分', semester: 3, category: 'base', status: 'active', section: 'base' },
  { id: 'javaweb', name: 'JavaWeb应用开发', credits: '3学分', semester: 3, category: 'base', status: 'deleted', section: 'base' },
  
  { id: 'zyyy', name: '专业英语', credits: '2学分', semester: 4, category: 'core', status: 'active', section: 'core' },
  { id: 'python', name: 'Python数据采集', credits: '3学分', semester: 4, category: 'core', status: 'active', section: 'core' },
  { id: 'sjjg', name: '数据结构与算法', credits: '3学分', semester: 4, category: 'core', status: 'active', section: 'core' },
  { id: 'dsjjs', name: '大数据技术与应用', credits: '3学分', semester: 4, category: 'core', status: 'active', section: 'core' },
  
  { id: 'wl', name: '计算机网络', credits: '3学分', semester: 5, category: 'core', status: 'active', section: 'core' },
  { id: 'jqxx', name: '机器学习', credits: '3学分', semester: 5, category: 'core', status: 'active', section: 'core' },
  { id: 'dxsjk', name: '大型数据库技术与数据挖掘', credits: '3学分', semester: 5, category: 'core', status: 'active', section: 'core' },
  
  { id: 'czxt', name: '操作系统', credits: '3学分', semester: 6, category: 'core', status: 'active', section: 'core' },
  { id: 'dsjss', name: '大数据实时计算', credits: '2.5学分', semester: 6, category: 'core', status: 'active', section: 'core' },
  
  { id: 'aixx', name: '人工智能与信息社会', credits: '2学分', semester: 7, category: 'core', status: 'deleted', section: 'core' },
  { id: 'aicode', name: 'AI辅助编程与工具工程', credits: '2学分', semester: 2, category: 'core', status: 'active', section: 'core' },
  { id: 'aiethics', name: 'AI伦理、法规与负责任数据实践', credits: '1.5学分', semester: 3, category: 'core', status: 'active', section: 'core' },
  { id: 'llm', name: '大模型原理与工程应用', credits: '3学分', semester: 4, category: 'core', status: 'active', section: 'core' },
  { id: 'dsjksh', name: '大数据可视化', credits: '1.5学分', semester: 5, category: 'core', status: 'active', section: 'core' },

  // 校企合作课程
  { id: 'sjfx', name: '数据分析与应用', credits: '3学分', semester: 5, category: 'campus', status: 'active', section: 'core' },
  { id: 'wlaq', name: '网络应用与安全', credits: '2.5学分', semester: 6, category: 'campus', status: 'active', section: 'core' },

  // === 实践教育课程 ===
  { id: 'jsjn', name: '军事技能', credits: '2学分', semester: 1, category: 'practice', status: 'active', section: 'practice' },
  { id: 'shsj', name: '社会实践', credits: '2学分', semester: 4, category: 'practice', status: 'active', section: 'practice' },
  { id: 'sjfxsx', name: '数据分析项目开发实训', credits: '2学分', semester: 5, category: 'practice', status: 'active', section: 'practice' },
  { id: 'ldsj', name: '劳动教育实践', credits: '1学分', semester: 6, category: 'practice', status: 'active', section: 'practice' }, // 1-6学期完成，展示在第6学期
  { id: 'dsjzh', name: '大数据综合实践', credits: '4学分', semester: 6, category: 'practice', status: 'active', section: 'practice' },
  { id: 'aizh', name: '人工智能综合实践', credits: '4学分', semester: 6, category: 'practice', status: 'active', section: 'practice' },
  { id: 'bysx', name: '毕业实习', credits: '8学分', semester: 7, category: 'practice', status: 'active', section: 'practice' },
  { id: 'bysj', name: '毕业设计（论文）', credits: '16学分', semester: 8, category: 'practice', status: 'active', section: 'practice' },
  { id: 'cxcyhd', name: '创新创业实践活动', credits: '2学分', semester: 8, category: 'practice', status: 'active', section: 'practice' },
  { id: 'dekt', name: '第二课堂', credits: '2学分', semester: 8, category: 'practice', status: 'active', section: 'practice' },
];
