import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	experimental: {
		fonts: [
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
	},
});
