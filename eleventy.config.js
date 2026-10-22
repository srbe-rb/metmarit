// Met Marit — Eleventy setup.
// Pages are built as flat .html files (coaching.html, ...); Cloudflare Pages serves them as /coaching.
// Marit edits writing, work entries and "Wie is Marit?" through Pages CMS (.pages.yml).

const order = (entry) => {
  const tot = String(entry.data.tot || "").toLowerCase();
  const van = parseInt(entry.data.van, 10) || 0;
  return (tot === "heden" ? 100000 : 0) + van;
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets", "src/media": "media" });

  // Relative link from the current page to a root-level path, so the site works on any host.
  eleventyConfig.addFilter("rel", (target, url) => {
    const depth = Math.max(0, String(url || "/").split("/").length - 2);
    return "../".repeat(depth) + target;
  });

  eleventyConfig.addFilter("datum", (d) =>
    new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("isoDatum", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("eerste", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/schrijven/*.md").sort((a, b) => b.date - a.date));

  eleventyConfig.addCollection("werk", (api) =>
    api.getFilteredByGlob("src/werk/*.md").sort((a, b) => order(b) - order(a)));
}

export const config = {
  dir: { input: "src", output: "_site" },
  markdownTemplateEngine: false,
  htmlTemplateEngine: "njk",
};
