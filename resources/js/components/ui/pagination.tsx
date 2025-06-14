import * as React from 'react';
import { cn } from '@/lib/utils';

export const Pagination = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex justify-center", className)}
      {...props}
    >
      <ul className="flex items-center gap-1">{children}</ul>
    </nav>
  );
};

export const PaginationContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const PaginationItem = ({ children }: { children: React.ReactNode }) => {
  return <li>{children}</li>;
};

export const PaginationLink = ({
  className,
  isActive,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }) => {
  return (
    <a
      className={cn(
        'px-3 py-1.5 text-sm rounded-md border transition-colors',
        isActive
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
        className
      )}
      {...props}
    />
  );
};

export const PaginationPrevious = ({
  href = '#',
  isActive = false,
}: {
  href?: string;
  isActive?: boolean;
}) => (
  <PaginationItem>
    <PaginationLink href={href} isActive={isActive}>
      ←
    </PaginationLink>
  </PaginationItem>
);

export const PaginationNext = ({
  href = '#',
  isActive = false,
}: {
  href?: string;
  isActive?: boolean;
}) => (
  <PaginationItem>
    <PaginationLink href={href} isActive={isActive}>
      →
    </PaginationLink>
  </PaginationItem>
);
