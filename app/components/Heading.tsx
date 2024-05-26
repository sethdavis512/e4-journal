import { VariantProps, cva } from 'cva';
import { type ReactNode } from 'react';
import { cn } from '~/utils';

interface HeadingProps {
    children: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    weight?: VariantProps<typeof headingVariants>['weight'];
}

const headingVariants = cva({
    base: 'font-bold',
    variants: {
        as: {
            h1: 'text-5xl mb-6',
            h2: 'text-4xl',
            h3: 'text-3xl',
            h4: 'text-2xl',
            h5: 'text-xl',
            h6: 'text-lg'
        },
        weight: {
            thin: 'font-thin',
            bold: 'font-bold'
        }
    },
    defaultVariants: {
        as: 'h2',
        weight: 'bold'
    }
});

export default function Heading({
    as = 'h2',
    children,
    className,
    weight = 'bold'
}: HeadingProps) {
    const Component = as;
    const headingClassName = cn(headingVariants({ as, weight }), className);

    return <Component className={headingClassName}>{children}</Component>;
}
