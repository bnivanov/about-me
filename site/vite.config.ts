import { defineConfig } from "vite";

export default defineConfig({
  // Relative asset paths so the build works from file://, GitHub Pages
  // project subpaths, or any static host without configuration.
  base: "./",
});
