export default {
  layout: "post.njk",
  permalink: (data) => `schrijven/${data.page.fileSlug}.html`,
  eleventyComputed: {
    title: (data) => `${data.titel} | Met Marit`,
    description: (data) => data.samenvatting || "Een stuk van Marit Brandsma.",
    slug: (data) => `schrijven/${data.page.fileSlug}`,
    active: () => "schrijven",
  },
};
