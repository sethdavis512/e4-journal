import { ButtonGroup, Input } from '@lemonsqueezy/wedges';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

interface NumberInputProps {
    name: string;
    initialValue?: number;
}

export default function NumberInput({
    initialValue = 1,
    name
}: NumberInputProps) {
    const [value, setValue] = useState<number>(initialValue);

    const increment = () => setValue(value + 1);
    const decrement = () => setValue(value - 1);

    return (
        <ButtonGroup>
            <ButtonGroup.Item onClick={decrement} type="button">
                <MinusIcon />
            </ButtonGroup.Item>
            <Input
                type="text"
                id="quantity-input"
                name={name}
                aria-describedby="helper-text-explanation"
                placeholder="0"
                required
                value={value}
                className="border-0 max-w-20 text-center"
            />
            <ButtonGroup.Item onClick={increment} type="button">
                <PlusIcon />
            </ButtonGroup.Item>
        </ButtonGroup>
    );
}
