/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
}

const ALLOWED_FIELDS = [
  'code', 'name', 'credits', 'hours_theory', 'hours_practice',
  'hours_weekly', 'weeks_teaching', 'semester', 'section',
  'category', 'badge', 'status', 'notes',
];

export const onRequest: PagesFunction<Env> = async ({ request, env, params }) => {
  const majorId = params.majorId as string;
  const id = params.id as string;
  const db = env.DB;

  try {
    if (request.method === 'PUT') {
      const body = await request.json() as Record<string, unknown>;
      const sets: string[] = [];
      const values: unknown[] = [];

      for (const key of ALLOWED_FIELDS) {
        if (key in body) {
          sets.push(`${key} = ?`);
          values.push(body[key]);
        }
      }

      if (sets.length === 0) {
        return new Response('No valid fields to update', { status: 400 });
      }

      values.push(id, majorId);
      await db
        .prepare(`UPDATE courses SET ${sets.join(', ')} WHERE id = ? AND major_id = ?`)
        .bind(...values)
        .run();

      return Response.json({ ok: true });
    }

    if (request.method === 'DELETE') {
      await db
        .prepare('DELETE FROM courses WHERE id = ? AND major_id = ?')
        .bind(id, majorId)
        .run();
      return Response.json({ ok: true });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
};
