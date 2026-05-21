-- Course Map Database Schema

CREATE TABLE IF NOT EXISTS majors (
  id         TEXT    PRIMARY KEY,
  name       TEXT    NOT NULL,
  year       INTEGER NOT NULL DEFAULT 2026,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS courses (
  id              TEXT    PRIMARY KEY,
  major_id        TEXT    NOT NULL REFERENCES majors(id) ON DELETE CASCADE,
  code            TEXT    NOT NULL DEFAULT '',
  name            TEXT    NOT NULL,
  credits         REAL    NOT NULL DEFAULT 0,
  hours_theory    INTEGER NOT NULL DEFAULT 0,
  hours_practice  INTEGER NOT NULL DEFAULT 0,
  hours_weekly    INTEGER NOT NULL DEFAULT 0,
  weeks_teaching  INTEGER NOT NULL DEFAULT 0,
  -- hours_total = hours_weekly * weeks_teaching (computed on frontend)
  semester        INTEGER NOT NULL,
  section         TEXT    NOT NULL,
  category        TEXT    NOT NULL,
  badge           TEXT,
  status          TEXT    NOT NULL DEFAULT 'active',
  notes           TEXT    NOT NULL DEFAULT ''
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_courses_major_semester ON courses(major_id, semester);
CREATE INDEX IF NOT EXISTS idx_courses_major_section  ON courses(major_id, section);

-- =====================
-- Seed: Majors
-- =====================
INSERT OR IGNORE INTO majors (id, name, year) VALUES
  ('bigdata',  '数据科学与大数据技术', 2026),
  ('software', '软件工程',             2026),
  ('ai',       '人工智能',             2026);

-- =====================
-- Seed: 数据科学与大数据技术 (bigdata) — 61 courses
-- =====================
INSERT OR IGNORE INTO courses
  (id, major_id, code, name, credits, hours_theory, hours_practice, hours_weekly, weeks_teaching, semester, section, category, badge, status, notes)
VALUES

-- ===== 通识必修类 =====
('sxdd',   'bigdata','27101017','思想道德与法治',                             3.0, 28,14, 3,14, 1,'general','general',NULL,'active','每周2节面授，1节实践'),
('zgjxd',  'bigdata','27101007','中国近现代史纲要',                           3.0, 34,17, 3,17, 2,'general','general',NULL,'active',''),
('mks',    'bigdata','27101008','马克思主义基本原理',                         3.0, 34,17, 3,17, 3,'general','general',NULL,'active','每周2节面授，1节实践'),
('mzd',    'bigdata','27101022','毛泽东思想和中国特色社会主义理论体系概论',   3.0, 34,17, 3,17, 4,'general','general',NULL,'active','每周2节面授，1节实践'),
('xjp',    'bigdata','27101019','习近平新时代中国特色社会主义思想概论',       3.0, 34,17, 3,17, 6,'general','general',NULL,'active',''),
('hswh',   'bigdata','27100002','红色文化',                                   1.0, 10, 6, 2, 5, 2,'general','general',NULL,'active','理论课排课5周'),
('xsyzc',  'bigdata','27101003','形势与政策',                                 2.0, 32, 0, 2,16, 1,'general','general',NULL,'active','1-4学期，视频资料学习'),
('gjaq',   'bigdata','09010009','国家安全教育',                               1.0,  0, 0, 0, 0, 3,'general','general',NULL,'active','慕课形式，课外32学时'),
('dxyy1',  'bigdata','19101011','大学英语Ⅰ',                                 3.0, 36,20, 4,14, 1,'general','general',NULL,'active',''),
('dxyy2',  'bigdata','19101012','大学英语Ⅱ',                                 3.0, 44,24, 4,17, 2,'general','general',NULL,'active',''),
('dxyy3',  'bigdata','19101013','大学英语Ⅲ',                                 2.0, 34, 0, 2,17, 3,'general','general',NULL,'active',''),
('dxty1',  'bigdata','22101001','大学体育Ⅰ',                                 1.0,  8,20, 2,14, 1,'general','general',NULL,'active',''),
('dxty2',  'bigdata','22101002','大学体育Ⅱ',                                 1.0,  8,26, 2,17, 2,'general','general',NULL,'active',''),
('dxty3',  'bigdata','22101003','大学体育Ⅲ',                                 1.0,  8,26, 2,17, 3,'general','general',NULL,'active',''),
('dxty4',  'bigdata','22101004','大学体育Ⅳ',                                 1.0,  8,26, 2,17, 4,'general','general',NULL,'active',''),
('xl1',    'bigdata','25101001','大学生心理健康教育Ⅰ',                       1.0,  8, 8, 4, 4, 1,'general','general',NULL,'active','排课4周'),
('xl2',    'bigdata','25101002','大学生心理健康教育Ⅱ',                       1.0,  8, 8, 4, 4, 2,'general','general',NULL,'active','排课4周'),
('zygh',   'bigdata','36101003','大学生职业生涯规划',                         0.5,  0, 4, 2, 6, 1,'general','general',NULL,'active','慕课形式'),
('jyzd',   'bigdata','36101004','大学生就业指导',                             0.5,  8, 4, 4, 4, 5,'general','general',NULL,'active','排课4周'),
('cxcy',   'bigdata','27101015','创新创业基础',                               1.5, 16,16, 4, 8, 4,'general','general',NULL,'active','排课8周'),
('ldll',   'bigdata','27100003','劳动教育理论',                               0.5,  8, 0, 2, 8, 1,'general','general',NULL,'active','慕课形式'),
('jsll',   'bigdata','36100001','军事理论',                                   2.0, 12, 0, 2, 6, 1,'general','general',NULL,'active','排课6周'),

-- ===== 数学基础 =====
('gs1',    'bigdata','18102001','高等数学Ⅰ',                                 4.0, 70, 0, 5,14, 1,'math','math',NULL,'active',''),
('gs2',    'bigdata','18102002','高等数学Ⅱ',                                 4.0, 68, 0, 4,17, 2,'math','math',NULL,'active',''),
('dxwl',   'bigdata','21102104','大学物理',                                   4.0, 68, 0, 4,17, 2,'math','math',NULL,'active',''),
('wlsy',   'bigdata','21106104','大学物理实验',                               1.0,  2,30, 2,16, 2,'math','math',NULL,'active',''),
('xd2',    'bigdata','18102032','线性代数Ⅱ',                                 3.0, 51, 0, 3,17, 2,'math','math',NULL,'active',''),
('ls',     'bigdata','18102009','离散数学',                                   4.0, 68, 0, 4,17, 3,'math','math',NULL,'active',''),
('gl2',    'bigdata','18102042','概率论与数理统计Ⅱ',                         3.0, 51, 0, 3,17, 4,'math','math',NULL,'active',''),

-- ===== 专业基础 =====
('jsjdl',  'bigdata','23132001','计算机导论',                                 3.0, 28,28, 4,14, 1,'base','base',NULL,'active',''),
('cxj',    'bigdata','23133001','程序设计基础',                               5.0, 56,28, 6,14, 1,'base','base',NULL,'active',''),
('sjk',    'bigdata','23133025','数据库技术与应用',                           3.0, 34,34, 4,17, 2,'base','base',NULL,'active',''),
('java',   'bigdata','23133003','Java程序设计',                               3.0, 34,34, 4,17, 2,'base','base',NULL,'deleted',''),
('linux',  'bigdata','23133041','Linux实践',                                  1.0,  0,34, 2,17, 3,'base','base',NULL,'active',''),
('javaweb','bigdata','23135001','JavaWeb应用开发',                            3.0, 34,34, 4,17, 3,'base','base',NULL,'deleted',''),

-- ===== 专业核心 — 必修 =====
('zyyy',   'bigdata','23132002','专业英语',                                   2.0, 34, 0, 2,17, 4,'core','core',NULL,'active',''),
('python', 'bigdata','23133040','Python数据采集',                             3.0, 34,34, 4,17, 4,'core','core',NULL,'active',''),
('sjjg',   'bigdata','23133022','数据结构与算法',                             3.0, 34,34, 4,17, 4,'core','core',NULL,'active',''),
('dsjjs',  'bigdata','23135040','大数据技术与应用',                           3.0, 34,34, 4,17, 4,'core','core',NULL,'active',''),
('wl',     'bigdata','23133006','计算机网络',                                 3.0, 30,30, 4,15, 5,'core','core',NULL,'active',''),
('jqxx',   'bigdata','23133012','机器学习',                                   3.0, 30,30, 4,15, 5,'core','core',NULL,'active',''),
('dxsjk',  'bigdata','23133018','大型数据库技术与数据挖掘',                   3.0, 30,30, 4,15, 5,'core','core',NULL,'active',''),
('czxt',   'bigdata','23133009','操作系统',                                   3.0, 42,10, 4,13, 6,'core','core',NULL,'active',''),
('dsjss',  'bigdata','23135005','大数据实时计算',                             2.5, 26,26, 4,13, 6,'core','core',NULL,'active',''),
('aixx',   'bigdata','23133042','人工智能与信息社会',                         2.0, 28, 0, 4, 7, 7,'core','core',NULL,'deleted',''),
-- AI新增课程
('aicode',   'bigdata','','AI辅助编程与工具工程',                             2.0, 20,12, 4, 8, 2,'core','core','new','active',''),
('aiethics', 'bigdata','','AI伦理、法规与负责任数据实践',                     1.5, 18,10, 4, 7, 3,'core','core','new','active',''),
('llm',      'bigdata','','大模型原理与工程应用',                             3.0, 34,34, 4,17, 4,'core','core','new','active',''),
('dsjksh', 'bigdata','23135041','大数据可视化',                               1.5, 14,14, 4, 7, 5,'core','core',NULL,'active',''),

-- ===== 专业核心 — 校企合作 =====
('sjfx',   'bigdata','23135010','数据分析与应用',                             3.0, 30,30, 4,15, 5,'core','campus',NULL,'active',''),
('wlaq',   'bigdata','23133020','网络应用与安全',                             2.5, 26,26, 4,13, 6,'core','campus',NULL,'active',''),

-- ===== 集中实践 (weeks_teaching = 集中周数, hours_theory/practice = 0) =====
('jsjn',   'bigdata','36100002','军事技能',                                   2.0, 0,0, 0, 2, 1,'practice','practice',NULL,'active',''),
('shsj',   'bigdata','23136002','社会实践',                                   2.0, 0,0, 0, 2, 4,'practice','practice',NULL,'active',''),
('sjfxsx', 'bigdata','23136003','数据分析项目开发实训',                       2.0, 0,0, 0, 2, 5,'practice','practice',NULL,'active',''),
('ldsj',   'bigdata','09106001','劳动教育实践',                               1.0, 0,0, 0, 1, 6,'practice','practice',NULL,'active','第1-6学期累计完成'),
('dsjzh',  'bigdata','23136004','大数据综合实践',                             4.0, 0,0, 0, 4, 6,'practice','practice',NULL,'active','大数据方向'),
('aizh',   'bigdata','23136012','人工智能综合实践',                           4.0, 0,0, 0, 4, 6,'practice','practice',NULL,'active','人工智能方向'),
('bysx',   'bigdata','23136007','毕业实习',                                   8.0, 0,0, 0, 8, 7,'practice','practice',NULL,'active',''),
('bysj',   'bigdata','23136008','毕业设计（论文）',                          16.0, 0,0, 0,16, 8,'practice','practice',NULL,'active',''),
('cxcyhd', 'bigdata','23136011','创新创业实践活动',                           2.0, 0,0, 0, 2, 8,'practice','practice',NULL,'active',''),
('dekt',   'bigdata','04101001','第二课堂',                                   2.0, 0,0, 0, 2, 8,'practice','practice',NULL,'active','');
