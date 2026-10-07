// Builds the static site from src/ into site/.
// Each page in src/pages starts with a front-matter comment:
//   <!--
//   title: Page title
//   description: Meta description
//   nav: services
//   -->
// Pages can include partials with {{> name}} (from src/partials).
// Run: node build.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src';
const OUT = 'site';

const NAV = [
  { key: 'services', href: 'services.html', label: 'Services' },
  { key: 'work', href: 'our-work.html', label: 'Our work' },
  { key: 'about', href: 'about.html', label: 'About' },
  { key: 'faqs', href: 'faqs.html', label: 'FAQs' },
  { key: 'contact', href: 'contact.html', label: 'Contact' },
];

const layout = readFileSync(join(SRC, 'layout.html'), 'utf8');
const partial = (name) => readFileSync(join(SRC, 'partials', `${name}.html`), 'utf8');

function parse(file) {
  const raw = readFileSync(join(SRC, 'pages', file), 'utf8');
  const match = raw.match(/^<!--\n([\s\S]*?)\n-->\n/);
  if (!match) throw new Error(`${file} is missing its front-matter comment`);
  const meta = Object.fromEntries(
    match[1].split('\n').map((line) => {
      const i = line.indexOf(':');
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
  );
  return { meta, body: raw.slice(match[0].length) };
}

function navLinks(active) {
  return NAV.map(({ key, href, label }) =>
    `<li><a href="${href}"${key === active ? ' aria-current="page"' : ''}>${label}</a></li>`,
  ).join('\n          ');
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);

const pages = readdirSync(join(SRC, 'pages')).filter((f) => f.endsWith('.html'));
for (const file of pages) {
  const { meta, body } = parse(file);
  const content = body.replace(/\{\{> (\w[\w-]*)\}\}/g, (_, name) => partial(name));
  const html = layout
    .replaceAll('{{title}}', meta.title)
    .replaceAll('{{description}}', meta.description)
    .replaceAll('{{nav}}', navLinks(meta.nav))
    .replace('{{content}}', content);
  writeFileSync(join(OUT, file), html);
}

for (const asset of ['styles.css', 'script.js', 'assets']) {
  cpSync(join(SRC, asset), join(OUT, asset), { recursive: true });
}

console.log(`Built ${pages.length} pages into ${OUT}/`);
