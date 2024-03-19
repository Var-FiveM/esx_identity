// vite.config.js
import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'custom-html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /(<\/head>)/,
          '  <link rel="stylesheet" href="./variables.css">\n$1'
        );
      },
    },
  ],
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'build',
  },
});
