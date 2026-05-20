/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const { results } = await env.DB
      .prepare('SELECT id, name FROM majors ORDER BY created_at')
      .all();
    return Response.json({ data: results });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
};
