import { type ReactNode } from 'react';
import { cn } from '~/utils';

interface FlexProps {
    children: ReactNode;
    className?: string;
}

export default function Flex({ children, className }: FlexProps) {
    const flexClassName = cn('flex gap-2', className);

    return <div className={flexClassName}>{children}</div>;
}
