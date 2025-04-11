import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import LinkPreview from './components/LinkPreview'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 style={{ color: 'blue', fontSize: '48px' }}>{children}</h1>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    a: ({ href, children, ...props }) => (
      <LinkPreview href={href || '#'} className="text-blue-400 hover:underline">
        {children}
      </LinkPreview>
    ),
    ...components,
  }
}