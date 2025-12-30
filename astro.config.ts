import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	experimental: {
		fonts: [
			{
				name: "Geist Mono",
				provider: fontProviders.fontsource(),
				cssVariable: "--font-geist-mono",
				weights: [400, 700],
				fallbacks: ["monospace"],
			},
			{
				provider: "local",
				name: "PP Neue Montreal",
				cssVariable: "--font-pp-neue-montreal",
				variants: [
					{
						weight: 100,
						style: "normal",
						src: ["./src/assets/fonts/PPNeueMontreal-Thin.woff2"],
					},
					{
						weight: 400,
						style: "normal",
						src: ["./src/assets/fonts/PPNeueMontreal-Book.woff2"],
					},
					{
						weight: 400,
						style: "italic",
						src: ["./src/assets/fonts/PPNeueMontreal-Italic.woff2"],
					},
					{
						weight: 500,
						style: "normal",
						src: ["./src/assets/fonts/PPNeueMontreal-Medium.woff2"],
					},
					{
						weight: 600,
						style: "italic",
						src: ["./src/assets/fonts/PPNeueMontreal-SemiBolditalic.woff2"],
					},
					{
						weight: 700,
						style: "normal",
						src: ["./src/assets/fonts/PPNeueMontreal-Bold.woff2"],
					},
				],
			},
		],
	},
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							if (id.includes("@react-three")) {
								return "vendor-react-three";
							}
							if (id.includes("three")) {
								return "vendor-three";
							}
						}
					},
				},
			},
		},
	},
});
