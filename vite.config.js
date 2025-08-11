import { defineConfig } from "vite";
import { resolve } from "node:path";


export default defineConfig(({mode}) => {

	if(mode === 'content-js') return {
		build: {
			outDir: "dist",
			copyPublicDir: false,
			emptyOutDir: false,
			rollupOptions: {
				input: {
					content: resolve(__dirname, "src/content.js"),
				},
				output: {
					entryFileNames: (chunk) => {

						if(chunk.name === "content") return "content.js";
					},
					inlineDynamicImports: true,
				}
			},
			minify: false
		}
	};

	return {
		build: {
			outDir: "dist",
			rollupOptions: {
				input: {
					popup: resolve(__dirname, "src/popup/index.html"),
					view: resolve(__dirname, "src/view/index.html"),
					config: resolve(__dirname, "src/config/index.html"),
					background: resolve(__dirname, "src/background.js"),
				},
				output: {
					entryFileNames: (chunk) => {

						if(chunk.name === "background") return "background.js";

						return "assets/[name].js";
					}
				}
			}
		}
	};
});

