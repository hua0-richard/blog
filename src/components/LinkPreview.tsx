'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

interface LinkPreviewProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function LinkPreview({ href, children, className = '' }: LinkPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPreview && !previewContent && !loading) {
      setLoading(true);
      
      // Only fetch if it's an internal link
      if (href.startsWith('/')) {
        fetch(href)
          .then(response => response.text())
          .then(html => {
            // Extract content from HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('main')?.innerHTML || '';
            setPreviewContent(mainContent);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching preview:', error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [href, showPreview, previewContent, loading]);

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  return (
    <>
      <Link 
        ref={linkRef}
        href={href}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
      
      {showPreview && createPortal(
        <div
          ref={previewRef}
          className="fixed preview-portal z-50 w-96 max-h-80 overflow-auto p-4"
          style={{
            left: linkRef.current ? `${linkRef.current.getBoundingClientRect().left}px` : '0px',
            top: linkRef.current ? `${linkRef.current.getBoundingClientRect().bottom + 10}px` : '0px'
          }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          ) : (
            previewContent ? (
              <div className="preview-content" dangerouslySetInnerHTML={{ __html: previewContent }} />
            ) : (
              <div className="text-sm opacity-70">Preview not available</div>
            )
          )}
        </div>,
        document.body
      )}
    </>
  );
} 