// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
	site: 'https://meowrch.github.io',
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
				}
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/meowrch/meowrch' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/meowrch' },
			],
			plugins: [
				catppuccin({
					dark: { flavor: "mocha", accent: "mauve" },
					light: { flavor: "latte", accent: "mauve" }
				})
			]
		}),
	],
});
