import type { APIRoute } from 'astro';
import { projetsTries } from '../lib';

// Plan du site pour Google : la liste de toutes les pages publiques.
export const GET: APIRoute = async ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const projets = await projetsTries();
  const chemins = ['/', '/travaux/', '/a-propos/', '/contact/', ...projets.map((p) => `/projets/${p.id}/`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chemins.map((c) => `  <url><loc>${base}${c}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
