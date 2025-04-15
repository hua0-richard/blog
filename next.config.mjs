import createMDX from "@next/mdx";
import remarkWikiLink from "remark-wiki-link";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import remarkCallout from "remark-callout";
import remarkFrontmatter from "remark-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      remarkMath,
      remarkCallout,
      [
        remarkWikiLink,
        {
          aliasDivider: "|",
          pageResolver: (name) => [name.replace(/ /g, "-").toLowerCase()],
          hrefTemplate: (permalink) => `/all-md-notes/${permalink}`,
          wikiLinkClassName: "wiki-link",
        },
      ],
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeMermaid,
        {
          strategy: "inline-svg",
          mermaidConfig: {
            theme: "base",
            themeVariables: {
              "background": "#111111",
              "primaryColor": "#1e1e1e",
              "primaryTextColor": "#ffffff",
              "primaryBorderColor": "#2a2a2a",
              "lineColor": "#888888",
              "fontSize": "18px",
              "fontFamily": "Inter, sans-serif",
              "nodePadding": "20",
              "edgeLabelBackground": "#111111",
              "tertiaryColor": "#1a1a1a",
              "secondaryColor": "#1c1c1c",
              "textColor": "#e0e0e0"
            },
          },
        },
      ],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
