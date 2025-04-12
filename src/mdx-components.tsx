import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import LinkPreview from './components/LinkPreview'
import { ReactNode } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

// Custom component for callouts (used by remark-callout)
const Callout = ({ children, type = 'note' }: { children: ReactNode; type?: string }) => {
  const typeToStyles: Record<string, { bgColor: string; borderColor: string; titleColor: string }> = {
    note: { 
      bgColor: 'bg-blue-50 dark:bg-blue-950/50', 
      borderColor: 'border-blue-200 dark:border-blue-800', 
      titleColor: 'text-blue-800 dark:text-blue-300' 
    },
    tip: { 
      bgColor: 'bg-green-50 dark:bg-green-950/50', 
      borderColor: 'border-green-200 dark:border-green-800', 
      titleColor: 'text-green-800 dark:text-green-300' 
    },
    warning: { 
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/50', 
      borderColor: 'border-yellow-200 dark:border-yellow-800', 
      titleColor: 'text-yellow-800 dark:text-yellow-300' 
    },
    danger: { 
      bgColor: 'bg-red-50 dark:bg-red-950/50', 
      borderColor: 'border-red-200 dark:border-red-800', 
      titleColor: 'text-red-800 dark:text-red-300' 
    },
    info: { 
      bgColor: 'bg-purple-50 dark:bg-purple-950/50', 
      borderColor: 'border-purple-200 dark:border-purple-800', 
      titleColor: 'text-purple-800 dark:text-purple-300' 
    },
  };

  const styles = typeToStyles[type.toLowerCase()] || typeToStyles.note;

  return (
    <div className={`${styles.bgColor} ${styles.borderColor} border-l-4 rounded-md p-4 my-6`}>
      <div className={`font-medium mb-2 capitalize ${styles.titleColor}`}>{type}</div>
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
};

// Code block with syntax highlighting
const CodeBlock = ({ children, className }: { children: string; className?: string }) => {
  // Extract language from className (format: language-*)
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  return (
    <Highlight 
      theme={themes.nightOwl} 
      code={children.trim()} 
      language={language || 'text'}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="text-sm rounded-lg p-4 overflow-x-auto mb-6" style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

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
    code: ({ children, className }) => {
      // If it has a language class, it's a code block
      if (className?.includes('language-')) {
        return <CodeBlock className={className}>{children as string}</CodeBlock>;
      }
      
      // Otherwise it's an inline code element
      return (
        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:text-gray-200">
          {children}
        </code>
      );
    },
    pre: ({ children }) => {
      // For pre elements, just pass through to our custom handling in the code component
      return <>{children}</>;
    },
    img: (props) => {
      // Special handling for Mermaid SVG images
      if (props.src && props.src.startsWith('data:image/svg+xml')) {
        return (
          <div 
            className="mermaid my-6 overflow-auto hidden dark:block"
            dangerouslySetInnerHTML={{ __html: decodeURIComponent(props.src.replace('data:image/svg+xml,', '')) }}
          />
        );
      }
      
      return (
        <Image
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          className="rounded-lg my-6"
          {...(props as ImageProps)}
        />
      );
    },
    a: ({ href, children, className, ...props }) => {
      // Special styling for wiki links
      if (className === 'wiki-link') {
        return (
          <a
            href={href || '#'}
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium hover:underline"
            {...props}
          >
            {children}
          </a>
        );
      }
      
      return (
        <LinkPreview 
          href={href || '#'} 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium hover:underline"
          {...props}
        >
          {children}
        </LinkPreview>
      );
    },
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
    // Add support for callout component
    Callout,
    ...components,
  }
}