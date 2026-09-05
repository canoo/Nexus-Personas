import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const personasDir = path.join(rootDir, 'personas');
const outputPath = path.join(rootDir, 'registry.json');

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const yamlBlock = match[1];
  const data = {};
  
  let currentKey = null;
  let inList = false;

  for (const line of yamlBlock.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- ') && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(trimmed.slice(2).replace(/^['"]|['"]$/g, ''));
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      currentKey = key;
      if (val === '') {
        // List might follow
        continue;
      }
      val = val.replace(/^['"]|['"]$/g, '');
      data[key] = val;
    }
  }
  return data;
}

const files = fs.readdirSync(personasDir).filter(f => f.endsWith('.md') && !f.startsWith('.'));
const registry = [];

for (const file of files) {
  const fullPath = path.join(personasDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const id = path.basename(file, '.md');
  const fm = parseFrontmatter(content);

  registry.push({
    id,
    name: fm.name || id,
    description: fm.description || '',
    emoji: fm.emoji || '🤖',
    color: fm.color || 'blue',
    vibe: fm.vibe || fm.description || '',
    allowedTools: Array.isArray(fm.allowedTools) ? fm.allowedTools : [],
    path: `personas/${file}`,
    rawUrl: `https://raw.githubusercontent.com/canoo/Nexus-Personas/main/personas/${file}`
  });
}

registry.sort((a, b) => a.id.localeCompare(b.id));

const catalog = {
  version: "1.0.0",
  updatedAt: new Date().toISOString(),
  count: registry.length,
  personas: registry
};

fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`Generated registry with ${registry.length} personas at ${outputPath}`);
