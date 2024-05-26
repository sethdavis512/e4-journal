import { type ReactNode } from 'react';
import { BORDER_CLASS_NAME } from '~/constants';
import { cn } from '~/utils';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export default function Card({ className, children }: CardProps) {
    const cardClassName = cn(`${BORDER_CLASS_NAME} p-4 rounded-lg`, className);

    return <div className={cardClassName}>{children}</div>;
}
