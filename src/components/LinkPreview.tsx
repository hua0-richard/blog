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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle transition animation
  useEffect(() => {
    if (showPreview) {
      // Small delay to ensure DOM is ready before animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showPreview]);

  useEffect(() => {
    if (showPreview && !previewContent && !loading) {
      setLoading(true);
      
      // Only fetch if it's an internal link
      if (href.startsWith('/')) {
        fetch(href)
          .then(response => {
            if (!response.ok) {
              throw new Error('Page not found');
            }
            return response.text();
          })
          .then(html => {
            // Extract content from HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('main')?.innerHTML || '';
            setPreviewContent(mainContent || 'No content available');
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching preview:', error);
            setPreviewContent('Preview not available');
            setLoading(false);
          });
      } else {
        // Don't show any preview for external links
        setShowPreview(false);
        setLoading(false);
      }
    }
  }, [href, showPreview, previewContent, loading]);

  const handleMouseEnter = () => {
    // Skip preview for external links
    if (!href.startsWith('/')) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    // Use a timeout to allow moving from link to preview portal
    timeoutRef.current = setTimeout(() => {
      setShowPreview(false);
    }, 300); // Short delay to allow mouse movement to preview
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Link 
        ref={linkRef}
        href={href}
        className={`text-blue-500 hover:text-blue-700 transition-colors ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
      
      {isMounted && showPreview && createPortal(
        <div
          ref={previewRef}
          className="fixed preview-portal z-50 w-96 max-h-[60vh] shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 ease-in-out"
          style={{
            left: linkRef.current ? `${linkRef.current.getBoundingClientRect().left}px` : '0px',
            top: linkRef.current ? `${linkRef.current.getBoundingClientRect().bottom + 10}px` : '0px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-4 h-full overflow-y-auto text-sm">
            {loading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600 dark:border-gray-300"></div>
              </div>
            ) : (
              previewContent ? (
                <div className="overflow-y-auto max-h-96" dangerouslySetInnerHTML={{ __html: previewContent }}></div>
              ) : (
                <div className="text-sm opacity-70">Preview not available</div>
              )
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
} 