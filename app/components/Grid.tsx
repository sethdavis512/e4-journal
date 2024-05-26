import { type ReactNode } from 'react';

interface GridProps {
    children: ReactNode;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
}

export default function Grid({ as = 'div', children, className }: GridProps) {
    const Component = as;

    return (
        <Component className={`grid grid-cols-12 ${className}`}>
            {children}
        </Component>
    );
}
