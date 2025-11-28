'use client';

export default function ExternalLink({ href, children, className = '' }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

