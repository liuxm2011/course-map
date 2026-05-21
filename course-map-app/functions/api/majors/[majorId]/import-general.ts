/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
}

interface GeneralCourse {
  code: string; name: string;
  credits: number;
  hours_theory: number; hours_practice: number;
  hours_weekly: number; weeks_teaching: number;
  semester: number; notes: string;
}

const GENERAL_COURSES: GeneralCourse[] = [
  { code: '27101017', name: '思想道德与法治',                           credits: 3.0, hours_theory: 28, hours_practice: 14, hours_weekly: 3, weeks_teaching: 14, semester: 1, notes: '每周2节面授，1节实践' },
  { code: '27101007', name: '中国近现代史纲要',                         credits: 3.0, hours_theory: 34, hours_practice: 17, hours_weekly: 3, weeks_teaching: 17, semester: 2, notes: '' },
  { code: '27101008', name: '马克思主义基本原理',                       credits: 3.0, hours_theory: 34, hours_practice: 17, hours_weekly: 3, weeks_teaching: 17, semester: 3, notes: '每周2节面授，1节实践' },
  { code: '27101022', name: '毛泽东思想和中国特色社会主义理论体系概论', credits: 3.0, hours_theory: 34, hours_practice: 17, hours_weekly: 3, weeks_teaching: 17, semester: 4, notes: '每周2节面授，1节实践' },
  { code: '27101019', name: '习近平新时代中国特色社会主义思想概论',     credits: 3.0, hours_theory: 34, hours_practice: 17, hours_weekly: 3, weeks_teaching: 17, semester: 6, notes: '' },
  { code: '27100002', name: '红色文化',                                 credits: 1.0, hours_theory: 10, hours_practice:  6, hours_weekly: 2, weeks_teaching:  5, semester: 2, notes: '理论课排课5周' },
  { code: '27101003', name: '形势与政策',                               credits: 2.0, hours_theory: 32, hours_practice:  0, hours_weekly: 2, weeks_teaching: 16, semester: 1, notes: '1-4学期，视频资料学习' },
  { code: '09010009', name: '国家安全教育',                             credits: 1.0, hours_theory:  0, hours_practice:  0, hours_weekly: 0, weeks_teaching:  0, semester: 3, notes: '慕课形式，课外32学时' },
  { code: '19101011', name: '大学英语Ⅰ',                               credits: 3.0, hours_theory: 36, hours_practice: 20, hours_weekly: 4, weeks_teaching: 14, semester: 1, notes: '' },
  { code: '19101012', name: '大学英语Ⅱ',                               credits: 3.0, hours_theory: 44, hours_practice: 24, hours_weekly: 4, weeks_teaching: 17, semester: 2, notes: '' },
  { code: '19101013', name: '大学英语Ⅲ',                               credits: 2.0, hours_theory: 34, hours_practice:  0, hours_weekly: 2, weeks_teaching: 17, semester: 3, notes: '' },
  { code: '22101001', name: '大学体育Ⅰ',                               credits: 1.0, hours_theory:  8, hours_practice: 20, hours_weekly: 2, weeks_teaching: 14, semester: 1, notes: '' },
  { code: '22101002', name: '大学体育Ⅱ',                               credits: 1.0, hours_theory:  8, hours_practice: 26, hours_weekly: 2, weeks_teaching: 17, semester: 2, notes: '' },
  { code: '22101003', name: '大学体育Ⅲ',                               credits: 1.0, hours_theory:  8, hours_practice: 26, hours_weekly: 2, weeks_teaching: 17, semester: 3, notes: '' },
  { code: '22101004', name: '大学体育Ⅳ',                               credits: 1.0, hours_theory:  8, hours_practice: 26, hours_weekly: 2, weeks_teaching: 17, semester: 4, notes: '' },
  { code: '25101001', name: '大学生心理健康教育Ⅰ',                     credits: 1.0, hours_theory:  8, hours_practice:  8, hours_weekly: 4, weeks_teaching:  4, semester: 1, notes: '排课4周' },
  { code: '25101002', name: '大学生心理健康教育Ⅱ',                     credits: 1.0, hours_theory:  8, hours_practice:  8, hours_weekly: 4, weeks_teaching:  4, semester: 2, notes: '排课4周' },
  { code: '36101003', name: '大学生职业生涯规划',                       credits: 0.5, hours_theory:  0, hours_practice:  4, hours_weekly: 2, weeks_teaching:  6, semester: 1, notes: '慕课形式' },
  { code: '36101004', name: '大学生就业指导',                           credits: 0.5, hours_theory:  8, hours_practice:  4, hours_weekly: 4, weeks_teaching:  4, semester: 5, notes: '排课4周' },
  { code: '27101015', name: '创新创业基础',                             credits: 1.5, hours_theory: 16, hours_practice: 16, hours_weekly: 4, weeks_teaching:  8, semester: 4, notes: '排课8周' },
  { code: '27100003', name: '劳动教育理论',                             credits: 0.5, hours_theory:  8, hours_practice:  0, hours_weekly: 2, weeks_teaching:  8, semester: 1, notes: '慕课形式' },
  { code: '36100001', name: '军事理论',                                 credits: 2.0, hours_theory: 12, hours_practice:  0, hours_weekly: 2, weeks_teaching:  6, semester: 1, notes: '排课6周' },
];

function genId(): string {
  return 'gen_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
}

export const onRequestPost: PagesFunction<Env> = async ({ env, params }) => {
  const majorId = params.majorId as string;
  const db = env.DB;

  try {
    await db.prepare("DELETE FROM courses WHERE major_id = ? AND section = 'general'").bind(majorId).run();

    const inserts = GENERAL_COURSES.map(c =>
      db.prepare(`
        INSERT INTO courses
          (id, major_id, code, name, credits, hours_theory, hours_practice,
           hours_weekly, weeks_teaching, semester, section, category, badge, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'general', 'general', NULL, 'active', ?)
      `).bind(
        genId(), majorId,
        c.code, c.name, c.credits,
        c.hours_theory, c.hours_practice,
        c.hours_weekly, c.weeks_teaching,
        c.semester, c.notes
      )
    );

    await db.batch(inserts);

    const { results } = await db
      .prepare("SELECT * FROM courses WHERE major_id = ? AND section = 'general' ORDER BY semester")
      .bind(majorId)
      .all();

    return Response.json({ data: results }, { status: 201 });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
};
