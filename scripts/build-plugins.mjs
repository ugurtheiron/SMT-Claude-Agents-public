#!/usr/bin/env node
// Generates the Claude Code plugin marketplace from the team definitions.
//
//   node scripts/build-plugins.mjs           # (re)write plugins/ + marketplace.json
//   node scripts/build-plugins.mjs --check   # exit 1 if generated output would differ
//
// Source of truth: library/en/teams/<slug>.md. Each team becomes
// plugins/<plugin>/ with .claude-plugin/plugin.json plus verbatim copies of
// its member agents (agents/<slug>.md) and skills (skills/<slug>/SKILL.md plus
// any LICENSE*/NOTICE* files from the skill's source folder).
// MCP-server members are dependency metadata only and are not copied.
// Never edit plugins/ or .claude-plugin/marketplace.json by hand.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import matter from 'gray-matter';

const MARKETPLACE_NAME = 'safemate-agents';
const OWNER = { name: 'SafeMate AI Hub', url: 'https://github.com/ugurtheiron' };

const CHECK = process.argv.includes('--check');
const root = join(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');

const teamsDir = join(root, 'library/en/teams');
const teamFiles = existsSync(teamsDir) ? readdirSync(teamsDir).filter((f) => f.endsWith('.md')).sort() : [];

// path (relative, /-separated) -> content
const out = new Map();
const marketplacePlugins = [];

for (const file of teamFiles) {
    const slug = file.replace(/\.md$/, '');
    const fm = matter(readFileSync(join(teamsDir, file), 'utf8')).data || {};
    const plugin = fm.plugin || slug;
    const members = Array.isArray(fm.members) ? fm.members : [];

    const copied = [];
    for (const id of members) {
        let m;
        if ((m = id.match(/^(?:bwc|smt)-agent-(.+)$/))) {
            const src = join(root, `library/en/agents/${m[1]}.md`);
            if (!existsSync(src)) fail(`${file}: member ${id} → library/en/agents/${m[1]}.md not found`);
            out.set(`plugins/${plugin}/agents/${m[1]}.md`, readFileSync(src, 'utf8'));
            copied.push(id);
        } else if ((m = id.match(/^(?:bwc|smt)-skill-(.+)$/))) {
            const src = join(root, `library/en/skills/${m[1]}/SKILL.md`);
            if (!existsSync(src)) fail(`${file}: member ${id} → library/en/skills/${m[1]}/SKILL.md not found`);
            out.set(`plugins/${plugin}/skills/${m[1]}/SKILL.md`, readFileSync(src, 'utf8'));
            // Ship license/notice files with the skill so redistributed bundles keep their terms.
            const skillDir = dirname(src);
            for (const f of readdirSync(skillDir).sort()) {
                if (/^(LICENSE|NOTICE)/i.test(f) && statSync(join(skillDir, f)).isFile()) {
                    out.set(`plugins/${plugin}/skills/${m[1]}/${f}`, readFileSync(join(skillDir, f), 'utf8'));
                }
            }
            copied.push(id);
        }
        // mcp-server / other member types: dependency metadata only.
    }

    out.set(`plugins/${plugin}/.claude-plugin/plugin.json`, JSON.stringify({
        name: plugin,
        description: String(fm.description || '').trim(),
        author: { name: OWNER.name }
    }, null, 2) + '\n');

    out.set(`plugins/${plugin}/README.md`,
        `# ${fm.name || plugin}\n\n` +
        `${String(fm.description || '').trim()}\n\n` +
        `Generated from [\`library/en/teams/${file}\`](../../library/en/teams/${file}) — do not edit by hand.\n\n` +
        `Install:\n\n\`\`\`\n/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public\n/plugin install ${plugin}@${MARKETPLACE_NAME}\n\`\`\`\n`);

    marketplacePlugins.push({
        name: plugin,
        source: `./plugins/${plugin}`,
        description: String(fm.description || '').trim(),
        category: fm.category || undefined,
        keywords: Array.isArray(fm.tags) ? fm.tags.slice(0, 8) : undefined,
        author: { name: OWNER.name }
    });
}

out.set('.claude-plugin/marketplace.json', JSON.stringify({
    name: MARKETPLACE_NAME,
    owner: OWNER,
    description: 'Curated Claude Code multi-agent teams from the SafeMate AI Hub library',
    plugins: marketplacePlugins
}, null, 2) + '\n');

if (CHECK) {
    const drift = [];
    for (const [rel, content] of out) {
        const abs = join(root, rel);
        if (!existsSync(abs)) drift.push(`missing: ${rel}`);
        else if (readFileSync(abs, 'utf8') !== content) drift.push(`stale: ${rel}`);
    }
    // Extra files under plugins/ that the generator would not produce.
    const walk = (dir, base) => {
        if (!existsSync(dir)) return;
        for (const e of readdirSync(dir)) {
            const abs = join(dir, e);
            const rel = `${base}/${e}`;
            if (statSync(abs).isDirectory()) walk(abs, rel);
            else if (!out.has(rel)) drift.push(`unexpected: ${rel}`);
        }
    };
    walk(join(root, 'plugins'), 'plugins');
    if (drift.length) {
        console.error('[build-plugins] drift detected — run `node scripts/build-plugins.mjs` and commit:');
        for (const d of drift) console.error('  ' + d);
        process.exit(1);
    }
    console.log(`[build-plugins] check OK — ${teamFiles.length} teams, ${out.size} generated files in sync.`);
} else {
    rmSync(join(root, 'plugins'), { recursive: true, force: true });
    for (const [rel, content] of out) {
        const abs = join(root, rel);
        mkdirSync(dirname(abs), { recursive: true });
        writeFileSync(abs, content);
    }
    console.log(`[build-plugins] wrote ${out.size} files for ${teamFiles.length} teams.`);
}

function fail(msg) {
    console.error('[build-plugins] ' + msg);
    process.exit(1);
}
