import { promises as fs } from 'node:fs';
import path from 'node:path';

const DEFAULT_SITE_META = {
	site: 'https://meowrch.github.io',
	title: 'Meowrch Wiki',
	description: 'Beautiful dots for Arch hyprland and bspwm.',
};
const LANGUAGES = ['en', 'ru'];

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'src', 'content', 'docs');
const OUTPUT_PATH = path.join(ROOT, 'public', 'llms.txt');
const CONFIG_PATH = path.join(ROOT, 'astro.config.mjs');

const EXCLUDED_PATH_SEGMENTS = new Set(['2.0']);
const EXCLUDED_ROUTES = new Set(['/404/', '/404']);

const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n/;

function normalizeRoute(route) {
	let cleaned = route.replace(/\/{2,}/g, '/');
	if (!cleaned.startsWith('/')) cleaned = `/${cleaned}`;
	if (!cleaned.endsWith('/')) cleaned = `${cleaned}/`;
	return cleaned;
}
function normalizeSite(site) {
	return site.replace(/\/$/, '');
}

async function loadSiteMeta() {
	try {
		const configText = await fs.readFile(CONFIG_PATH, 'utf8');
		const match = configText.match(/siteMeta\s*=\s*\{([\s\S]*?)\}\s*;/);
		if (!match) return { ...DEFAULT_SITE_META };
		const objectLiteral = `{${match[1]}}`;
		const parsed = Function(`"use strict"; return (${objectLiteral});`)();
		return { ...DEFAULT_SITE_META, ...parsed };
	} catch {
		return { ...DEFAULT_SITE_META };
	}
}

function extractSlug(frontmatter) {
	if (!frontmatter) return null;
	const lines = frontmatter.split('\n');
	for (const line of lines) {
		const match = line.match(/^slug:\s*(.+)\s*$/);
		if (!match) continue;
		let slug = match[1].trim();
		slug = slug.replace(/^['"]|['"]$/g, '');
		slug = slug.replace(/^\//, '');
		return slug || null;
	}
	return null;
}

async function collectMarkdownFiles(dir, result = []) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await collectMarkdownFiles(fullPath, result);
			continue;
		}
		if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
			result.push(fullPath);
		}
	}
	return result;
}

function isExcludedRoute(route, filePath) {
	if (EXCLUDED_ROUTES.has(route)) return true;
	if (filePath.endsWith('404.mdx') || filePath.endsWith('404.md')) return true;
	for (const segment of EXCLUDED_PATH_SEGMENTS) {
		if (route.includes(`/${segment}/`) || filePath.split(path.sep).includes(segment)) {
			return true;
		}
	}
	return false;
}

function routeFromPath(filePath) {
	const relative = path.relative(DOCS_DIR, filePath).split(path.sep).join('/');
	const withoutExt = relative.replace(/\.(md|mdx)$/i, '');
	if (withoutExt.endsWith('/index')) {
		return normalizeRoute(withoutExt.slice(0, -'/index'.length));
	}
	return normalizeRoute(withoutExt);
}

async function getRouteForFile(filePath) {
	const content = await fs.readFile(filePath, 'utf8');
	const frontmatterMatch = content.match(FRONTMATTER_REGEX);
	const frontmatter = frontmatterMatch ? frontmatterMatch[1] : null;
	const slug = extractSlug(frontmatter);
	if (slug) {
		return normalizeRoute(slug);
	}
	return routeFromPath(filePath);
}

function buildLlmsText(routes, meta) {
	const site = normalizeSite(meta.site ?? DEFAULT_SITE_META.site);
	const title = meta.title ?? DEFAULT_SITE_META.title;
	const description = meta.description ?? DEFAULT_SITE_META.description;
	const sitemap = `${site}/sitemap-index.xml`;
	const lines = [];
	lines.push('# Meowrch Wiki (LLMs)');
	lines.push('# Auto-generated. Do not edit manually.');
	lines.push(`site: ${site}`);
	lines.push(`title: ${title}`);
	lines.push(`description: ${description}`);
	lines.push(`languages: ${LANGUAGES.join(', ')}`);
	lines.push(`sitemap: ${sitemap}`);
	lines.push('');
	lines.push('## Preferred entry points');
	lines.push('/en/');
	lines.push('/ru/');
	lines.push('');
	lines.push('## Topics');
	lines.push('Arch Linux, Hyprland, BSPWM, dotfiles, ricing, customization, optimization, troubleshooting, installation, hotkeys');

	const en = routes.filter((route) => route.startsWith('/en/')).sort();
	const ru = routes.filter((route) => route.startsWith('/ru/')).sort();
	const other = routes.filter(
		(route) => !route.startsWith('/en/') && !route.startsWith('/ru/')
	).sort();

	if (en.length) {
		lines.push('');
		lines.push('## Key pages (EN)');
		lines.push(...en);
	}

	if (ru.length) {
		lines.push('');
		lines.push('## Key pages (RU)');
		lines.push(...ru);
	}

	if (other.length) {
		lines.push('');
		lines.push('## Key pages (Other)');
		lines.push(...other);
	}

	lines.push('');
	return lines.join('\n');
}

async function main() {
	const meta = await loadSiteMeta();
	const files = await collectMarkdownFiles(DOCS_DIR);
	const routes = new Set();

	for (const filePath of files) {
		const route = await getRouteForFile(filePath);
		if (!route || isExcludedRoute(route, filePath)) continue;
		routes.add(route);
	}

	const content = buildLlmsText([...routes], meta);
	await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
	await fs.writeFile(OUTPUT_PATH, content, 'utf8');
	console.log(`llms.txt generated (${routes.size} routes) -> ${OUTPUT_PATH}`);
}

main().catch((error) => {
	console.error('Failed to generate llms.txt');
	console.error(error);
	process.exitCode = 1;
});
