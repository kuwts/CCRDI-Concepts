// usage: node frtypo.cjs <projectDir>
// French typography (OQLF) in the built French pages (dist/fr): a non-breaking space before
// ":" and inside « », a narrow non-breaking space before ";", "?" and "!", curly apostrophes.
// Reads visible text, alt text and aria labels; skips English passages (lang="en", e.g. press
// releases), [CLIENT TO PROVIDE: ...] placeholders, scripts and styles.
const fs = require('fs');
const path = require('path');
const [, , projectDir] = process.argv;
const root = path.join(projectDir, 'dist/fr');
const files = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') && files.push(path.join(d, e.name))));
walk(root);

const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const rules = [
  [/[^ ]:(?=\s|$)/, 'needs a non-breaking space before ":"'],
  [/[^  ][;?!](?=\s|$)/, 'needs a narrow non-breaking space before ; ? !'],
  [/«(?! )|(?<! )»/, 'needs non-breaking spaces inside « »'],
  [/\w'\w/, 'straight apostrophe (use ’)'],
];
let problems = 0;
for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  html = html.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/g, '');
  // English passages: the element with lang="en" and its content
  html = html.replace(/<(\w+)\b[^>]*\blang="en[^"]*"[^>]*>[\s\S]*?<\/\1>/g, '');
  const texts = [];
  html.replace(/\b(?:alt|aria-label|title|placeholder)="([^"]*)"/g, (_, t) => texts.push(t));
  html.replace(/<head>[\s\S]*?<\/head>/, (h) => { h.replace(/<title>([^<]*)/, (_, t) => texts.push(t)); h.replace(/name="description" content="([^"]*)"/, (_, t) => texts.push(t)); return ''; });
  html.replace(/<body[\s\S]*<\/body>/, (body) => body.replace(/<[^>]+>/g, '\n').split('\n').forEach((t) => texts.push(t)));
  const seen = new Set();
  for (let t of texts.map(decode)) {
    t = t.replace(/\[CLIENT TO PROVIDE:[^\]]*\]/g, '').trim();
    if (!t || seen.has(t) || /^https?:/.test(t)) continue;
    seen.add(t);
    for (const [re, msg] of rules) if (re.test(t)) { problems++; console.log(`${path.relative(projectDir, f)}: ${msg}: "${t.slice(0, 90)}"`); }
  }
}
console.log(`\n${files.length} French pages, ${problems} problem(s)`);
process.exit(problems ? 1 : 0);
