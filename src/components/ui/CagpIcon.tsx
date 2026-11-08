import React from 'react';
import { getCagpIconPaths, type CagpIconName } from '@/lib/cagpIcons';

export type { CagpIconName };

interface CagpIconProps {
  name: CagpIconName;
  className?: string;
  size?: number;
  title?: string;
}

export const CagpIcon: React.FC<CagpIconProps> = ({
  name,
  className = 'w-5 h-5',
  size,
  title,
}) => {
  const pathsHtml = getCagpIconPaths(name);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <g dangerouslySetInnerHTML={{ __html: pathsHtml }} />
    </svg>
  );
};
