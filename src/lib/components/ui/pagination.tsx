import * as React from 'react';
import { cn } from '@/lib/utils/classname.util';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
);

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-1', className)}
        {...props}
    />
));

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn('cursor-pointer', className)} {...props} />
));

type PaginationLinkProps = {
    isActive?: boolean,
    className?: string,
} & React.ComponentProps<'a'>

const PaginationLink = ({
    className,
    isActive,
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? 'page' : undefined}
        className={cn(className, 'flex items-center justify-center rounded p-1 min-w-9 aria-[current="page"]:border-2 aria-[current="page"]:border-gray-800 dark:aria-[current="page"]:border-gray-500')}
        {...props}
    />
);

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        className={cn('flex gap-1 pl-2.5', className)}
        {...props}
    >
        <span className="inline-flex items-center">
            <span className="inline sm:hidden"><ChevronLeftIcon height={30} width={30} /></span>
            <span className="hidden sm:inline"><ChevronLeftIcon height={20} width={20} /></span>
            <span className="hidden sm:inline">Previous</span>
        </span>
    </PaginationLink>
);

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        className={cn('flex gap-1 pr-2.5', className)}
        {...props}
    >
        <span className="inline-flex items-center">
            <span className="hidden sm:inline">Next</span>
            <span className="hidden sm:inline"><ChevronRightIcon height={20} width={20} /></span>
            <span className="inline sm:hidden"><ChevronRightIcon height={30} width={30} /></span>
        </span>
    </PaginationLink>
);

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<'span'>) => (
    <span
        aria-hidden
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <span>...</span>
        <span className="sr-only">More pages</span>
    </span>
);

Pagination.displayName = 'Pagination';
PaginationContent.displayName = 'PaginationContent';
PaginationItem.displayName = 'PaginationItem';
PaginationLink.displayName = 'PaginationLink';
PaginationPrevious.displayName = 'PaginationPrevious';
PaginationNext.displayName = 'PaginationNext';
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
