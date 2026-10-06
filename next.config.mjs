// Static export so the site can be hosted on GitHub Pages.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default {
  output: "export",
  basePath: base,
  trailingSlash: true,
  images: { unoptimized: true },
};
