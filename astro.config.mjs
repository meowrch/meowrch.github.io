// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
	site: 'https://meowrch.github.io',
	base: '/wiki',
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
					label: 'Guides',
					translations: {
						ru: 'Гайды'
					},
					items: [
						{
							label: 'Builder',
							translations: {
								ru: 'Установщик'
							},
							link: '/guides/builder/'
						},
						{
							label: 'Customization',
							translations: {
								ru: 'Кастомизация'
							},
							link: '/guides/customization/'
						},
						{
							label: 'Hotkeys',
							translations: {
								ru: 'Горячие клавиши'
							},
							link: '/guides/hotkeys/'
						},
						{
							label: 'Optimizing',
							translations: {
								ru: 'Оптимизация'
							},
							link: '/guides/optimizing/'
						}
					]
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
