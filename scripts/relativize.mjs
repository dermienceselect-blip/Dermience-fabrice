// Transforme les liens absolus ("/travaux/") en liens relatifs pour l'aperçu hébergé dans un sous-dossier.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';
const racine = process.argv[2];
const fichiers = [];
(function parcourir(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? parcourir(p) : f.endsWith('.html') && fichiers.push(p); } })(racine);
for (const f of fichiers) {
  const prefixe = relative(dirname(f), racine).split('\\').join('/') || '.';
  let h = readFileSync(f, 'utf8');
  h = h.replace(/(href|src|srcset|action)="\/(?!\/)([^"]*)"/g, (m, attr, chemin) => {
    let [p, ancre] = chemin.split('#');
    if (attr === 'href' && (p === '' )) p = 'index.html';
    else if (attr === 'href' && p.endsWith('/') && !p.startsWith('assets')) p = p.slice(0, -1) + '.html';
    return `${attr}="${posix.join(prefixe, p)}${ancre !== undefined ? '#' + ancre : ''}"`;
  });
  // srcset avec plusieurs URL
  h = h.replace(/srcset="([^"]*)"/g, (m, v) => `srcset="${v.replace(/(^|,\s*)\/assets\//g, `$1${prefixe}/assets/`)}"`);
  // URL des grandes photos dans le JSON de la lightbox
  h = h.replace(/"src":"\/assets\//g, `"src":"${prefixe}/assets/`);
  writeFileSync(f, h);
}
console.log(`${fichiers.length} pages converties`);
