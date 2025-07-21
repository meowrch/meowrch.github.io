const fs = require('fs');
const path = require('path');

function getTitleFromFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
            const titleMatch = frontmatterMatch[1].match(/title:\s*(.+)/);
            if (titleMatch) {
                return titleMatch[1].trim().replace(/["']/g, '');
            }
        }
        return path.basename(filePath, '.md');
    } catch {
        return path.basename(filePath, '.md');
    }
}

function generateSidebar(directory, basePath = '/') {
    const items = [];
    const files = fs.readdirSync(directory);

    // Sort directories first, then files
    files.sort((a, b) => {
        const aPath = path.join(directory, a);
        const bPath = path.join(directory, b);
        const aIsDir = fs.lstatSync(aPath).isDirectory();
        const bIsDir = fs.lstatSync(bPath).isDirectory();
        
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
    });

    files.forEach(file => {
        const absolutePath = path.join(directory, file);
        let relativePath = path.join(basePath, file).replace(/\\/g, '/');
        
        if (fs.lstatSync(absolutePath).isDirectory()) {
            // Skip locale directories at root level (en, ru, etc.)
            if (basePath === '/' && ['en', 'ru'].includes(file)) {
                return;
            }
            
            const childItems = generateSidebar(absolutePath, relativePath + '/');
            if (childItems.length > 0) {
                items.push({
                    label: file.charAt(0).toUpperCase() + file.slice(1), // Capitalize first letter
                    items: childItems
                });
            }
        } else if (file.endsWith('.md') && file !== 'index.mdx') {
            const title = getTitleFromFile(absolutePath);
            const link = relativePath.replace('.md', '/');
            
            items.push({
                label: title,
                link: link
            });
        }
    });

    return items;
}

// Generate sidebar for each locale
const locales = ['en', 'ru'];
const result = {};

locales.forEach(locale => {
    const localeDir = path.join(__dirname, 'src/content/docs', locale);
    if (fs.existsSync(localeDir)) {
        result[locale] = generateSidebar(localeDir, `/${locale}/`);
    }
});

fs.writeFileSync(
    path.join(__dirname, 'sidebar-config.js'),
    `// Auto-generated sidebar configuration
export const generatedSidebar = ${JSON.stringify(result, null, 2)};`
);

console.log('Sidebar generated successfully for all locales!');
