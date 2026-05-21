/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get('year') ?? String(new Date().getFullYear()), 10);

    const { results } = await env.DB
      .prepare('SELECT id, name, year FROM majors WHERE year = ? ORDER BY created_at')
      .bind(year)
      .all();
    return Response.json({ data: results });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
};
