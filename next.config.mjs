import createMDX from '@next/mdx'
import remarkWikiLink from 'remark-wiki-link'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeMermaid from 'rehype-mermaid'
import remarkCallout from 'remark-callout'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkCallout,
      [remarkWikiLink, {
        aliasDivider: '|',
        pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
        hrefTemplate: (permalink) => `/${permalink}`,
        wikiLinkClassName: 'wiki-link',
      }]
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypeMermaid, { 
        strategy: 'inline-svg',
        mermaidConfig: {
          theme: 'neutral',
        },
      }],
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)