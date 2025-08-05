import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'src/popup/index.html'),
                view: resolve(__dirname, 'src/view/index.html'),
                background: resolve(__dirname, 'src/background.js'),
                content: resolve(__dirname, 'src/content.js')
            },
            output: {
                entryFileNames: (chunk) => {
                if (chunk.name === 'background') return 'background.js';
                if (chunk.name === 'content') return 'content.js';
                return 'assets/[name].js';
                }
            }
        }
    }
});
