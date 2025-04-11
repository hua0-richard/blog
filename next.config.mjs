import createMDX from '@next/mdx'
import remarkWikiLink from 'remark-wiki-link'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      [remarkWikiLink, {
        aliasDivider: '|',
        pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
        hrefTemplate: (permalink) => `/leetcode/${permalink}`,
      }]
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)