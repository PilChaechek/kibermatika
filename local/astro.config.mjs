// @ts-check
import { defineConfig } from 'astro/config';

//import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: "https://dinar.neermilov.ru",
	vite: {
		css: {
			devSourcemap: true, // Ensured to be true for development
		},

		//plugins: [tailwindcss()],
	},
});