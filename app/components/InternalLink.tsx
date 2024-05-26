import { Link } from '@remix-run/react';
import { type ReactNode } from 'react';
import { cn } from '~/utils';

interface InternalLinkProps {
    children: ReactNode;
    to: string | object;
    className?: string;
}

export default function InternalLink({
    children,
    className,
    to
}: InternalLinkProps) {
    const internalLinkClassName = cn(`underline hover:text-primary`, className);

    return (
        <Link to={to} className={internalLinkClassName}>
            {children}
        </Link>
    );
}
