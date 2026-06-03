import { defineConfig } from "astro/config";

// Deploy target: GitHub Pages at https://m8seven.github.io/shipexpo-landing/
// `base` must match the repository name so assets resolve under the subpath.
// No Tailwind: the landing is hand-written custom CSS (see src/styles/global.css).
export default defineConfig({
  output: "static",
  site: "https://m8seven.github.io",
  base: "/shipexpo-landing",
});
