/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
}

const STANDARD_MAJORS = [
  { base: 'bigdata',  name: '数据科学与大数据技术' },
  { base: 'software', name: '软件工程' },
  { base: 'ai',       name: '人工智能' },
];

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get('year') ?? String(new Date().getFullYear()), 10);

    let { results } = await env.DB
      .prepare('SELECT id, name, year FROM majors WHERE year = ? ORDER BY created_at')
      .bind(year)
      .all();

    if (results.length === 0) {
      await env.DB.batch(
        STANDARD_MAJORS.map(m =>
          env.DB
            .prepare('INSERT OR IGNORE INTO majors (id, name, year) VALUES (?, ?, ?)')
            .bind(`${m.base}-${year}`, m.name, year)
        )
      );
      ({ results } = await env.DB
        .prepare('SELECT id, name, year FROM majors WHERE year = ? ORDER BY created_at')
        .bind(year)
        .all());
    }

    return Response.json({ data: results });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
};
