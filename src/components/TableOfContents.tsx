'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
}

export default function TableOfContents({ contentSelector = '.blog-content' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    const headingElements = contentElement.querySelectorAll('h2, h3, h4');
    const headingsData: Heading[] = [];

    headingElements.forEach((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.charAt(1));
      
      let id = heading.id;
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        if (!id) id = `heading-${index}`;
        heading.id = id;
      }

      headingsData.push({ id, text, level });
    });

    setHeadings(headingsData);

    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [contentSelector]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <List size={18} className="text-gold-500" />
        <h3 className="text-lg font-bold text-navy-900">Table of Contents</h3>
      </div>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`
              block text-sm py-1.5 px-3 rounded-lg transition-all duration-200
              ${heading.level === 2 ? 'pl-3' : ''}
              ${heading.level === 3 ? 'pl-6' : ''}
              ${heading.level === 4 ? 'pl-9' : ''}
              ${
                activeId === heading.id
                  ? 'bg-gold-50 text-gold-700 font-medium border-l-2 border-gold-500'
                  : 'text-gray-600 hover:bg-navy-50 hover:text-navy-800 border-l-2 border-transparent'
              }
            `}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
