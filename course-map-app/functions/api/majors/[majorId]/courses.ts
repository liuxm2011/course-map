/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async ({ request, env, params }) => {
  const majorId = params.majorId as string;
  const db = env.DB;

  try {
    if (request.method === 'GET') {
      const { results } = await db
        .prepare('SELECT * FROM courses WHERE major_id = ? ORDER BY semester, section')
        .bind(majorId)
        .all();
      return Response.json({ data: results });
    }

    if (request.method === 'POST') {
      const body = await request.json() as Record<string, unknown>;
      await db
        .prepare(`
          INSERT INTO courses
            (id, major_id, code, name, credits, hours_theory, hours_practice,
             hours_weekly, weeks_teaching, semester, section, category, badge, status, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .bind(
          body.id, majorId,
          body.code ?? '', body.name,
          body.credits ?? 0,
          body.hours_theory ?? 0, body.hours_practice ?? 0,
          body.hours_weekly ?? 0, body.weeks_teaching ?? 0,
          body.semester, body.section,
          body.category ?? body.section,
          body.badge ?? null,
          body.status ?? 'active',
          body.notes ?? ''
        )
        .run();
      return Response.json({ data: body }, { status: 201 });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
};
