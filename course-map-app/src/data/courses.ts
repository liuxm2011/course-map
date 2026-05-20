import type { Course } from '../types';

export const initialCourses: Course[] = [
  // === 通识教育课程 ===
  // 思政系列
  { id: 'mks', name: '马克思主义基本原理', credits: '3学分', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'xljk', name: '大学生心理健康教育', credits: '2学分', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'ldjy', name: '劳动教育概论', credits: '1学分', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'sdyz', name: '思想道德与法治', credits: '3学分', semester: 3, category: 'general', status: 'active', section: 'general' },
  { id: 'xsyzc', name: '形势与政策Ⅱ', credits: '1学分', semester: 3, category: 'general', status: 'active', section: 'general' },
  { id: 'zgdj', name: '中国近现代史纲要', credits: '3学分', semester: 4, category: 'general', status: 'active', section: 'general' },
  { id: 'xjp', name: '习近平新时代中国特色社会主义思想概论', credits: '3学分', semester: 4, category: 'general', status: 'active', section: 'general' },
  { id: 'xsszc', name: '形势与政策Ⅲ', credits: '', semester: 4, category: 'general', status: 'active', section: 'general' },
  { id: 'mzd', name: '毛泽东思想和中国特色社会主义理论体系概论', credits: '5学分', semester: 5, category: 'general', status: 'active', section: 'general' },
  { id: 'dangshi', name: '中国共产党党史', credits: '2学分', semester: 5, category: 'general', status: 'active', section: 'general' },
  { id: 'xsszd', name: '形势与政策Ⅳ', credits: '', semester: 5, category: 'general', status: 'active', section: 'general' },

  // 体育/外语/职业
  { id: 'xsyz', name: '形势与政策Ⅰ', credits: '1学分', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'ty1', name: '大学体育1', credits: '', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'wy1', name: '大学外语1', credits: '', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'zyfz', name: '大学生职业发展与就业指导', credits: '', semester: 1, category: 'general', status: 'active', section: 'general' },
  { id: 'ty2', name: '大学体育2', credits: '', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'wy2', name: '大学外语2', credits: '', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'cyjc', name: '创业基础', credits: '', semester: 2, category: 'general', status: 'active', section: 'general' },
  { id: 'ty3', name: '大学体育3', credits: '', semester: 3, category: 'general', status: 'active', section: 'general' },
  { id: 'wy3', name: '大学外语3', credits: '', semester: 3, category: 'general', status: 'active', section: 'general' },
  { id: 'yzg', name: '艺术中国', credits: '', semester: 3, category: 'general', status: 'active', section: 'general' },
  { id: 'ty4', name: '大学体育4', credits: '', semester: 4, category: 'general', status: 'active', section: 'general' },
  { id: 'wy4', name: '大学外语4', credits: '', semester: 4, category: 'general', status: 'active', section: 'general' },
  { id: 'ggyx', name: '公共艺术', credits: '', semester: 4, category: 'general', status: 'active', section: 'general' },
  { id: 'ty5', name: '大学体育5', credits: '', semester: 5, category: 'general', status: 'active', section: 'general' },
  { id: 'tzjk', name: '大学生体质健康测试', credits: '', semester: 7, category: 'general', status: 'active', section: 'general' },
  { id: 'zyyy', name: '专业英语', credits: '2学分', semester: 7, category: 'general', badge: 'keep', status: 'active', section: 'general' },
  { id: 'bysx', name: '毕业实习', credits: '4学分', semester: 8, category: 'practice', status: 'active', section: 'general' },

  // === 数学基础课程 ===
  { id: 'gs1', name: '高等数学Ⅰ', credits: '5学分', semester: 1, category: 'math', badge: 'keep', status: 'active', section: 'math' },
  { id: 'gs2', name: '高等数学Ⅱ', credits: '4学分', semester: 2, category: 'math', badge: 'keep', status: 'active', section: 'math' },
  { id: 'xdd', name: '线性代数', credits: '3学分', semester: 2, category: 'math', badge: 'keep', status: 'active', section: 'math' },
  { id: 'gltj', name: '概率论与数理统计', credits: '3学分', semester: 3, category: 'math', badge: 'keep', status: 'active', section: 'math' },
  { id: 'dlsy', name: '大学物理实验', credits: '1.5学分', semester: 3, category: 'math', status: 'active', section: 'math' },
  { id: 'ls', name: '离散数学', credits: '4学分', semester: 4, category: 'math', badge: 'keep', status: 'active', section: 'math' },

  // === 专业基础课程 ===
  { id: 'jsjdl', name: '计算机导论', credits: '3学分', semester: 1, category: 'base', badge: 'keep', status: 'active', section: 'base' },
  { id: 'cyy', name: '程序设计基础（C语言）', credits: '5学分', semester: 1, category: 'reformed', badge: 'reformed', status: 'active', section: 'base' },
  { id: 'sjk', name: '数据库技术与应用', credits: '3学分', semester: 2, category: 'reformed', badge: 'reformed', status: 'active', section: 'base' },
  { id: 'wl1', name: '大学物理1', credits: '3学分', semester: 2, category: 'base', status: 'active', section: 'base' },
  { id: 'sjjg', name: '数据结构与算法', credits: '3学分', semester: 3, category: 'base', badge: 'keep', status: 'active', section: 'base' },
  { id: 'wl2', name: '大学物理2', credits: '3学分', semester: 3, category: 'base', status: 'active', section: 'base' },
  { id: 'linux', name: 'Linux实践', credits: '1学分', semester: 3, category: 'base', badge: 'keep', status: 'active', section: 'base' },
  { id: 'mcu', name: '单片机与微机接口技术', credits: '3学分', semester: 4, category: 'base', status: 'active', section: 'base' },
  { id: 'jsjwl', name: '计算机网络', credits: '3学分', semester: 5, category: 'base', badge: 'keep', status: 'active', section: 'base' },
  { id: 'czxt', name: '操作系统', credits: '3学分', semester: 6, category: 'base', badge: 'keep', status: 'active', section: 'base' },

  // 编程与AI入门 (row 2 of 专业基础)
  { id: 'bcx', name: '编程思维与人工智能导论', credits: '2学分', semester: 1, category: 'base', status: 'active', section: 'base' },
  { id: 'dzyz', name: '电脑与电子线路', credits: '2学分', semester: 1, category: 'base', status: 'active', section: 'base' },
  { id: 'aigc', name: 'AI辅助编程与工具工程', credits: '2学分·全实践', semester: 2, category: 'new', badge: 'new', status: 'active', section: 'base' },
  { id: 'java-del', name: 'Java程序设计', credits: '3学分', semester: 2, category: 'base', badge: 'deleted', status: 'deleted', section: 'base' },
  { id: 'ailunli', name: 'AI伦理、法规与负责任数据实践', credits: '1.5学分', semester: 3, category: 'new', badge: 'new', status: 'active', section: 'base' },
  { id: 'szdz', name: '数字电子技术', credits: '3学分', semester: 3, category: 'base', status: 'active', section: 'base' },
  { id: 'javaweb-del', name: 'JavaWeb应用开发', credits: '3学分', semester: 3, category: 'base', badge: 'deleted', status: 'deleted', section: 'base' },
  { id: 'jqxx', name: '机器学习', credits: '3学分', semester: 4, category: 'base', badge: 'reformed', status: 'active', section: 'base' },
  { id: 'web', name: 'Web交互开发技术', credits: '3学分', semester: 4, category: 'base', status: 'active', section: 'base' },
  { id: 'jqxx5', name: '机器学习', credits: '3学分', semester: 5, category: 'base', badge: 'reformed', status: 'active', section: 'base' },

  // === 专业核心课程 ===
  { id: 'sjkyy', name: '数据库原理与应用', credits: '3学分', semester: 2, category: 'base', status: 'active', section: 'core' },
  { id: 'csj', name: 'C程序设计', credits: '3学分', semester: 2, category: 'base', status: 'active', section: 'core' },
  { id: 'python', name: 'Python数据采集与网络爬虫', credits: '3学分', semester: 3, category: 'reformed', badge: 'reformed', status: 'active', section: 'core' },
  { id: 'zsjt', name: '智能视听技术概论', credits: '2学分', semester: 3, category: 'base', status: 'active', section: 'core' },
  { id: 'dmx', name: '大模型原理与工程应用', credits: '3学分', semester: 4, category: 'new', badge: 'new', status: 'active', section: 'core' },
  { id: 'dsjj', name: '大数据技术与应用', credits: '3学分·选修', semester: 4, category: 'reformed', badge: 'reformed', status: 'active', section: 'core' },
  { id: 'sjzl', name: '智能数据管理与知识检索', credits: '3学分·选修', semester: 5, category: 'reformed', badge: 'reformed', status: 'active', section: 'core' },
  { id: 'sjfx', name: '数据分析与应用（校企合作）', credits: '3学分', semester: 5, category: 'campus', badge: 'reformed', status: 'active', section: 'core' },
  { id: 'sjkh', name: '大数据可视化', credits: '1.5学分·选修', semester: 5, category: 'base', badge: 'adjusted', status: 'active', section: 'core' },
  { id: 'dsjs', name: '大数据实时计算', credits: '2.5学分·选修', semester: 6, category: 'reformed', badge: 'reformed', status: 'active', section: 'core' },
  { id: 'wlaq', name: '网络应用与安全（校企合作）', credits: '2.5学分', semester: 6, category: 'campus', badge: 'keep', status: 'active', section: 'core' },
  { id: 'aixx-del', name: '人工智能与信息社会', credits: '2学分·必修', semester: 7, category: 'base', badge: 'deleted', status: 'deleted', section: 'core' },
  { id: 'sjkh-del', name: '大数据可视化', credits: '1.5学分·选修', semester: 7, category: 'base', badge: 'adjusted', status: 'deleted', section: 'core' },
  // AI方向已移除
  { id: 'ai-del', name: '（原AI方向选修已整体移除）人工智能导论/深度学习/计算机视觉/AI教育应用', credits: '', semester: 5, category: 'base', badge: 'deleted', status: 'deleted', section: 'core' },

  // === 集中实践教学环节 ===
  { id: 'cxzl', name: '程序设计能力训练', credits: '2学分', semester: 1, category: 'practice', status: 'active', section: 'practice' },
  { id: 'yyjc', name: '专业应用基础实训', credits: '2学分', semester: 4, category: 'practice', status: 'active', section: 'practice' },
  { id: 'sjkf', name: '数据分析项目开发实训', credits: '2学分·2周', semester: 5, category: 'reformed', badge: 'reformed', status: 'active', section: 'practice' },
  { id: 'dszh', name: '大数据综合实践', credits: '4学分·4周', semester: 6, category: 'reformed', badge: 'reformed', status: 'active', section: 'practice' },
  { id: 'yyzh', name: '专业应用综合实训', credits: '2学分', semester: 6, category: 'practice', status: 'active', section: 'practice' },
  { id: 'bysj', name: '毕业设计（AI系统开发类）', credits: '8学分', semester: 8, category: 'reformed', badge: 'reformed', status: 'active', section: 'practice' },
];
