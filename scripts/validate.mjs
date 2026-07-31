#!/usr/bin/env node
// Structural validation for the library. Run before every PR:
//   npm run validate
//
// Checks: frontmatter parses; required fields per type; id format and
// id↔directory agreement; duplicate ids; EN↔TR file parity (both ways);
// TR files carry name+description; team members resolve; requires label
// format; mcp-servers.json shape + unique ids; marketplace integrity.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import matter from 'gray-matter';

const root = join(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const errors = [];
const err = (msg) => errors.push(msg);

// Kebab-case, with underscores tolerated only for legacy bwc-* seeds
// (two seeded commands predate the rule). New smt-* items must be kebab.
const SLUG_RE = /^[a-z0-9][a-z0-9_-]*$/;
const REQUIRES_RE = /^(mcp|plugin|connection|tool):[a-z0-9][a-z0-9._-]*$/;
const REQUIRES_OBJECT_KEYS = ['mcp', 'plugins', 'connections', 'env', 'bins'];
const TYPES = [
    { type: 'skill',   en: 'library/en/skills',   nested: true },
    { type: 'agent',   en: 'library/en/agents',   nested: false },
    { type: 'command', en: 'library/en/commands', nested: false },
    { type: 'hook',    en: 'library/en/hooks',    nested: false },
    { type: 'team',    en: 'library/en/teams',    nested: false },
    { type: 'bundle',  en: 'library/en/bundles',  nested: false }
];

const allIds = new Map();  // id -> file
const teams = [];          // { file, members, plugin }

// ---- EN markdown ---------------------------------------------------------

for (const { type, en, nested } of TYPES) {
    const dir = join(root, en);
    if (!existsSync(dir)) continue;
    const slugs = nested
        ? readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
        : readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));

    for (const slug of slugs) {
        const rel = nested ? `${en}/${slug}/SKILL.md` : `${en}/${slug}.md`;
        const abs = join(root, rel);
        if (!existsSync(abs)) { err(`${rel}: expected file missing`); continue; }
        if (!SLUG_RE.test(slug)) err(`${rel}: slug '${slug}' is not kebab-case`);

        let fm;
        try {
            fm = matter(readFileSync(abs, 'utf8')).data || {};
        } catch (e) {
            err(`${rel}: frontmatter failed to parse — ${e.message}`);
            continue;
        }

        if (!fm.id) err(`${rel}: missing required 'id'`);
        else {
            const m = String(fm.id).match(/^(bwc|smt)-([a-z-]+?)-([a-z0-9][a-z0-9_-]*)$/);
            if (!m) err(`${rel}: id '${fm.id}' does not match (bwc|smt)-<type>-<slug>`);
            else {
                if (m[2] !== type) err(`${rel}: id type '${m[2]}' does not match directory type '${type}'`);
                if (m[1] === 'smt' && m[3].includes('_')) err(`${rel}: new smt-* ids must be kebab-case (no underscores)`);
            }
            if (allIds.has(fm.id)) err(`${rel}: duplicate id '${fm.id}' (also in ${allIds.get(fm.id)})`);
            else allIds.set(fm.id, rel);
        }
        if (!fm.description) err(`${rel}: missing required 'description'`);
        if (type === 'hook' && !fm.event) err(`${rel}: hooks require 'event'`);
        if (type === 'team') {
            if (!Array.isArray(fm.members) || fm.members.length === 0) err(`${rel}: teams require a non-empty 'members' list`);
            else teams.push({ file: rel, members: fm.members, plugin: fm.plugin || slug });
        }
        if (type === 'bundle' && !fm.homepage) err(`${rel}: bundles require 'homepage'`);
        if (fm.requires !== undefined) {
            if (Array.isArray(fm.requires)) {
                for (const label of fm.requires) {
                    if (!REQUIRES_RE.test(String(label))) err(`${rel}: invalid requires label '${label}' (expected mcp:|plugin:|connection:|tool: + kebab name)`);
                }
            } else if (fm.requires && typeof fm.requires === 'object') {
                // Legacy object form ({ mcp: [...], env: [...], bins: [...] })
                // is tolerated; the scraper flattens it. Canonical is the list.
                for (const key of Object.keys(fm.requires)) {
                    if (!REQUIRES_OBJECT_KEYS.includes(key)) err(`${rel}: unknown requires key '${key}' (allowed: ${REQUIRES_OBJECT_KEYS.join(', ')})`);
                    else if (!Array.isArray(fm.requires[key])) err(`${rel}: requires.${key} must be a list`);
                }
            } else {
                err(`${rel}: 'requires' must be a list of labels or a { mcp/env/bins } object`);
            }
        }
    }
}

// ---- mcp-servers.json ----------------------------------------------------

const mcpPath = join(root, 'library/en/mcp-servers.json');
if (existsSync(mcpPath)) {
    try {
        const parsed = JSON.parse(readFileSync(mcpPath, 'utf8'));
        const servers = Array.isArray(parsed) ? parsed : parsed.servers;
        if (!Array.isArray(servers)) {
            err('library/en/mcp-servers.json: expected { servers: [...] } (rich array shape)');
        } else {
            for (const s of servers) {
                if (!s.name) { err('library/en/mcp-servers.json: entry without name'); continue; }
                if (!s.id) err(`library/en/mcp-servers.json: '${s.name}' missing stable 'id'`);
                else if (allIds.has(s.id)) err(`library/en/mcp-servers.json: duplicate id '${s.id}'`);
                else allIds.set(s.id, 'library/en/mcp-servers.json');
                if (Array.isArray(s.requires)) {
                    for (const label of s.requires) {
                        if (!REQUIRES_RE.test(String(label))) err(`mcp '${s.name}': invalid requires label '${label}'`);
                    }
                }
            }
        }
    } catch (e) {
        err(`library/en/mcp-servers.json: ${e.message}`);
    }
}

// ---- EN ↔ TR parity ------------------------------------------------------

for (const { type, en, nested } of TYPES) {
    const enDir = join(root, en);
    const trDir = join(root, en.replace('/en/', '/tr/'));
    if (!existsSync(enDir)) continue;
    const enSlugs = new Set(nested
        ? readdirSync(enDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
        : readdirSync(enDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')));
    const trSlugs = new Set(existsSync(trDir)
        ? readdirSync(trDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
        : []);

    for (const s of enSlugs) if (!trSlugs.has(s)) err(`library/tr/${type}s: missing translation for '${s}'`);
    for (const s of trSlugs) if (!enSlugs.has(s)) err(`library/tr/${type}s/${s}.md: orphan — no EN counterpart`);

    for (const s of trSlugs) {
        if (!enSlugs.has(s)) continue;
        const rel = `${en.replace('/en/', '/tr/')}/${s}.md`;
        try {
            const fm = matter(readFileSync(join(root, rel), 'utf8')).data || {};
            if (!fm.name || !fm.description) err(`${rel}: TR files must carry 'name' and 'description'`);
        } catch (e) {
            err(`${rel}: frontmatter failed to parse — ${e.message}`);
        }
    }
}

// ---- team members resolve ------------------------------------------------

for (const t of teams) {
    for (const id of t.members) {
        if (!allIds.has(id)) err(`${t.file}: member '${id}' does not resolve to any library resource`);
    }
}

// ---- marketplace integrity ----------------------------------------------

const mpPath = join(root, '.claude-plugin/marketplace.json');
if (!existsSync(mpPath)) {
    err('.claude-plugin/marketplace.json missing — run node scripts/build-plugins.mjs');
} else {
    try {
        const mp = JSON.parse(readFileSync(mpPath, 'utf8'));
        if (!mp.name || !mp.owner?.name || !Array.isArray(mp.plugins)) err('.claude-plugin/marketplace.json: name, owner.name and plugins[] are required');
        const pluginNames = new Set();
        for (const p of mp.plugins || []) {
            if (!p.name || !p.source) { err(`marketplace.json: plugin entry missing name/source`); continue; }
            if (pluginNames.has(p.name)) err(`marketplace.json: duplicate plugin '${p.name}'`);
            pluginNames.add(p.name);
            if (typeof p.source === 'string') {
                const dir = join(root, p.source);
                if (!existsSync(dir)) err(`marketplace.json: source '${p.source}' does not exist`);
                else {
                    const pj = join(dir, '.claude-plugin/plugin.json');
                    if (!existsSync(pj)) err(`${p.source}: missing .claude-plugin/plugin.json`);
                    else {
                        try {
                            const parsed = JSON.parse(readFileSync(pj, 'utf8'));
                            if (parsed.name !== p.name) err(`${p.source}/plugin.json: name '${parsed.name}' != marketplace entry '${p.name}'`);
                        } catch (e) { err(`${p.source}/plugin.json: ${e.message}`); }
                    }
                }
            }
        }
        for (const t of teams) {
            if (!pluginNames.has(t.plugin)) err(`${t.file}: no marketplace plugin '${t.plugin}' — run node scripts/build-plugins.mjs`);
        }
    } catch (e) {
        err(`.claude-plugin/marketplace.json: ${e.message}`);
    }
}

// ---- report --------------------------------------------------------------

if (errors.length) {
    console.error(`[validate] ${errors.length} problem(s):`);
    for (const e of errors) console.error('  ✗ ' + e);
    process.exit(1);
}
console.log(`[validate] OK — ${allIds.size} resources, ${teams.length} teams, parity clean.`);
