import { type ReactNode } from 'react';
import { cn } from '~/utils';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    const containerClassName = cn(
        `container mx-auto py-4 px-2 md:px-4`,
        className
    );

    return <div className={containerClassName}>{children}</div>;
}
