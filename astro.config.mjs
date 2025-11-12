// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";
import starlightVersions from 'starlight-versions';

// https://astro.build/config
export default defineConfig({
	site: 'https://meowrch.github.io',
	base: '/',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'Meowrch Wiki',
			logo: {
				src: './src/assets/logo.png',
				replacesTitle: true,
			},
			defaultLocale: 'en',
			locales: {
				en: {
					label: 'English',
					lang: 'en',
				},
				ru: {
					label: 'Русский',
					lang: 'ru',
				},
			},
			sidebar: [
				{
					label: 'Introduction',
					translations: { ru: 'Введение' },
					autogenerate: { directory: 'introduction' }
				},
				{
					label: 'Installation',
					translations: { ru: 'Установка' },
					autogenerate: { directory: 'installation' }
				},
				{
					label: 'Customization', 
					translations: { ru: 'Кастомизация' },
					autogenerate: { directory: 'customization' }
				},
				{
					label: 'Usage',
					translations: { ru: 'Использование' },
					autogenerate: { directory: 'usage' }
				},
				{
					label: 'Optimization',
					translations: { ru: 'Оптимизация' },
					autogenerate: { directory: 'optimization' }
				}
			],
			customCss: [
				'./src/styles/fonts.css',
				'./src/styles/custom.css',
			],
			head: [
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://meowrch.github.io/og-cover.png'
					}
				},
				{
					tag: 'meta',
					attrs: {
						name: 'color-scheme',
						content: 'light dark'
					}
				},
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#1e1e2e',
						media: '(prefers-color-scheme: dark)'
					}
				},
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#eff1f5',
						media: '(prefers-color-scheme: light)'
					}
				},
				{
					tag: 'script',
					content: `
						(function() {
							const theme = localStorage.getItem('starlight-theme') || 
								(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
							document.documentElement.setAttribute('data-theme', theme);
							
							// Управляем DarkReader в зависимости от темы
							function manageDarkReader(currentTheme) {
								// Ищем или создаем meta тег для darkreader-lock
								let darkReaderMeta = document.querySelector('meta[name="darkreader-lock"]');
								if (!darkReaderMeta) {
									darkReaderMeta = document.createElement('meta');
									darkReaderMeta.name = 'darkreader-lock';
									document.head.appendChild(darkReaderMeta);
								}
								
								if (currentTheme === 'dark') {
									// Темная тема - блокируем DarkReader
									darkReaderMeta.content = '';
									document.documentElement.setAttribute('data-darkreader-lock', '');
								} else {
									// Светлая тема - разрешаем DarkReader
									darkReaderMeta.remove();
									document.documentElement.removeAttribute('data-darkreader-lock');
									
									// Принудительно уведомляем DarkReader об изменениях
									// Метод 1: Диспатчим события
									setTimeout(() => {
										window.dispatchEvent(new Event('resize'));
										document.dispatchEvent(new Event('DOMContentLoaded'));
									}, 100);
									
									// Метод 2: Принудительная перерисовка
									setTimeout(() => {
										const body = document.body;
										body.style.display = 'none';
										body.offsetHeight; // Принудительный reflow
										body.style.display = '';
									}, 200);
								}
								
								// Обновляем остальные meta теги
								const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
								if (metaColorScheme) {
									metaColorScheme.setAttribute('content', currentTheme === 'dark' ? 'dark' : 'light');
								}
								
								// Обновляем theme-color
								const themeColors = document.querySelectorAll('meta[name="theme-color"]');
								themeColors.forEach(meta => {
									const media = meta.getAttribute('media');
									if (media) {
										if (currentTheme === 'dark' && media.includes('dark')) {
											meta.setAttribute('content', '#1e1e2e');
										} else if (currentTheme === 'light' && media.includes('light')) {
											meta.setAttribute('content', '#eff1f5');
										}
									}
								});
							}
							
							manageDarkReader(theme);
							
							// Наблюдаем за изменениями темы
							const observer = new MutationObserver(function(mutations) {
								mutations.forEach(function(mutation) {
									if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
										const newTheme = document.documentElement.getAttribute('data-theme');
										manageDarkReader(newTheme);
									}
								});
							});
							
							observer.observe(document.documentElement, {
								attributes: true,
								attributeFilter: ['data-theme']
							});
							
							// Слушаем изменения системной темы
							window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
								if (!localStorage.getItem('starlight-theme')) {
									const newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
									document.documentElement.setAttribute('data-theme', newTheme);
									manageDarkReader(newTheme);
								}
							});
						})();
					`
				},
				{
					tag: 'script',
					attrs: {
						src: '/modal.js',
						defer: true
					}
				},
				{
					tag: 'script',
					attrs: {
						src: '/tilt.js',
						defer: true
					}
				},
				{
					tag: 'script',
					content: `
						// Отслеживание изменений языка через Starlight
						document.addEventListener('DOMContentLoaded', function() {
							// Сохраняем текущий язык при загрузке страницы
							const currentPath = window.location.pathname;
							let currentLang = 'en'; // по умолчанию
							
							if (currentPath.startsWith('/ru/')) {
								currentLang = 'ru';
							} else if (currentPath.startsWith('/en/')) {
								currentLang = 'en';
							}
							
							// Сохраняем в localStorage
							localStorage.setItem('meowrch-language', currentLang);
							
							// Отслеживаем клики по ссылкам смены языка
							function handleLanguageLinks() {
								const languageLinks = document.querySelectorAll('a[href*="/en/"], a[href*="/ru/"]');
								languageLinks.forEach(link => {
									link.addEventListener('click', function() {
										const href = this.getAttribute('href');
										if (href.includes('/ru/')) {
											localStorage.setItem('meowrch-language', 'ru');
										} else if (href.includes('/en/')) {
											localStorage.setItem('meowrch-language', 'en');
										}
									});
								});
							}
							
							// Вызываем сразу и при изменениях DOM
							handleLanguageLinks();
							
							// Наблюдаем за изменениями DOM для динамически добавляемых ссылок
							const observer = new MutationObserver(function(mutations) {
								mutations.forEach(function(mutation) {
									if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
										handleLanguageLinks();
									}
								});
							});
							
							observer.observe(document.body, {
								childList: true,
								subtree: true
							});
						});
					`
				}
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/meowrch/meowrch' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/meowrch' },
			],
			plugins: [
				starlightVersions({
					current: { label: '3.0' },
					versions: [
						{ slug: '2.0', redirect: 'root' }
					],
				}),
				catppuccin({
					dark: { flavor: "mocha", accent: "mauve" },
					light: { flavor: "latte", accent: "mauve" }
				})
			]
		}),
	],
});
