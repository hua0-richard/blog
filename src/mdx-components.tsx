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
      <h1 className="text-4xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold tracking-tight mt-10 mb-4 text-gray-900 dark:text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold tracking-tight mt-8 mb-4 text-gray-900 dark:text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold tracking-tight mt-6 mb-2 text-gray-900 dark:text-white">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="leading-7 mb-6 text-gray-700 dark:text-gray-300">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-8 mb-6 text-gray-700 dark:text-gray-300">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 dark:border-gray-800 pl-4 italic my-6 text-gray-700 dark:text-gray-300">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:text-gray-200">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6 text-sm font-mono">{children}</pre>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        className="rounded-lg my-6"
        {...(props as ImageProps)}
      />
    ),
    a: ({ href, children, ...props }) => (
      <LinkPreview 
        href={href || '#'} 
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium hover:underline"
        {...props}
      >
        {children}
      </LinkPreview>
    ),
    hr: () => (
      <hr className="my-8 border-t border-gray-200 dark:border-gray-800" />
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-gray-200 dark:border-gray-800 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border-b border-gray-200 dark:border-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300">{children}</td>
    ),
    ...components,
  }
}