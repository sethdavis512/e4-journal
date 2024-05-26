import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import {
    Alert,
    Avatar,
    Button,
    Checkbox,
    Input,
    ProgressCircle,
    RadioGroup,
    Slider,
    Switch,
    SwitchGroup,
    Tabs,
    Tag,
    Textarea
} from '@lemonsqueezy/wedges';
import { Form, json } from '@remix-run/react';
import { ArrowLeft, ArrowRight, PlusIcon } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { getThemeSession } from '~/utils/theme.server';
import { BORDER_CLASS_NAME } from '~/constants';
import useEmblaCarousel from 'embla-carousel-react';
import Card from '~/components/Card';
import Heading from '~/components/Heading';

export const meta: MetaFunction = () => {
    return [
        { title: 'Remix & Wedges UI' },
        {
            name: 'description',
            content: 'A Remix boilerplate with Wedges UI 🍋'
        }
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const themeSession = await getThemeSession(request);

    return json({
        theme: themeSession.getTheme()
    });
}

const Slide = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-grow-0 flex-shrink-0 basis-full min-w-0 max-w-full mr-2">
            <Card>{children}</Card>
        </div>
    );
};

const Slides = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({}, []);

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()); // Access API
        }
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="embla-carousel">
            <div className="overflow-hidden mb-4" ref={emblaRef}>
                <div className="flex">
                    <Slide>First</Slide>
                    <Slide>Second</Slide>
                    <Slide>Third</Slide>
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    before={<ArrowLeft />}
                    onClick={scrollPrev}
                    shape="pill"
                    variant="outline"
                />
                <Button
                    before={<ArrowRight />}
                    onClick={scrollNext}
                    shape="pill"
                    variant="outline"
                />
            </div>
        </div>
    );
};

export default function Index() {
    const [sliderValue, setSliderValue] = useState(75);

    return (
        <div className="space-y-4">
            <Heading as="h1">Kitchen sink</Heading>
            <Alert color="primary" title="Alert title">
                Your content appears here...
            </Alert>
            <Alert color="success" title="Alert title">
                Your content appears here...
            </Alert>
            <Alert color="warning" title="Alert title">
                Your content appears here...
            </Alert>
            <Alert color="info" title="Alert title">
                Your content appears here...
            </Alert>
            <Alert color="error" title="Alert title">
                Your content appears here...
            </Alert>
            <div>
                <Slides />
            </div>
            <div>
                <h1 className="text-5xl font-bold mb-4">
                    The quick brown fox jumps over the lazy dog.
                </h1>
                <p className="mb-8">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nesciunt est ratione, deleniti sint fugiat ex, fuga eaque
                    cum iusto necessitatibus inventore delectus impedit illo sed
                    vitae temporibus eligendi rem reiciendis.
                </p>
                <h2 className="text-4xl font-bold mb-4">
                    The quick brown fox jumps over the lazy dog.
                </h2>
                <p className="mb-8">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nesciunt est ratione, deleniti sint fugiat ex, fuga eaque
                    cum iusto necessitatibus inventore delectus impedit illo sed
                    vitae temporibus eligendi rem reiciendis.
                </p>
                <h3 className="text-3xl font-bold mb-4">
                    The quick brown fox jumps over the lazy dog.
                </h3>
                <p className="mb-8">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nesciunt est ratione, deleniti sint fugiat ex, fuga eaque
                    cum iusto necessitatibus inventore delectus impedit illo sed
                    vitae temporibus eligendi rem reiciendis.
                </p>
                <h4 className="text-3xl text-gray-400 mb-4">
                    The quick brown fox jumps over the lazy dog.
                </h4>
                <p className="mb-8">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nesciunt est ratione, deleniti sint fugiat ex, fuga eaque
                    cum iusto necessitatibus inventore delectus impedit illo sed
                    vitae temporibus eligendi rem reiciendis.
                </p>
                <h5 className="text-2xl text-gray-400 mb-4">
                    The quick brown fox jumps over the lazy dog.
                </h5>
                <p className="mb-8">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nesciunt est ratione, deleniti sint fugiat ex, fuga eaque
                    cum iusto necessitatibus inventore delectus impedit illo sed
                    vitae temporibus eligendi rem reiciendis.
                </p>
                <h6 className="text-xl text-gray-400 mb-4">
                    The quick brown fox jumps over the lazy dog.
                </h6>
                <p className="mb-8">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nesciunt est ratione, deleniti sint fugiat ex, fuga eaque
                    cum iusto necessitatibus inventore delectus impedit illo sed
                    vitae temporibus eligendi rem reiciendis.
                </p>
            </div>
            <div className="flex gap-4 items-center py-4">
                <Avatar.Root>
                    <Avatar.Image
                        alt="Seth Davis' GitHub profile"
                        src="https://github.com/sethdavis512.png"
                    />
                    <Avatar.Fallback>S</Avatar.Fallback>
                </Avatar.Root>
                <Button before={<PlusIcon />} variant="primary" shape="pill" />
                <Button
                    before={<PlusIcon />}
                    variant="secondary"
                    shape="pill"
                />
                <Button before={<PlusIcon />} variant="tertiary" shape="pill" />
                <Button before={<PlusIcon />} variant="outline" shape="pill" />
                <Button before={<PlusIcon />} variant="link" shape="pill" />
            </div>
            <div className="flex gap-4">
                <ProgressCircle value={sliderValue} />
                <ProgressCircle value={sliderValue} color="green" />
                <ProgressCircle value={sliderValue} color="blue" />
                <ProgressCircle value={sliderValue} color="red" />
                <ProgressCircle value={sliderValue} color="pink" />
                <ProgressCircle value={sliderValue} color="orange" />
            </div>
            <div>
                <Slider.Root
                    className="max-w-44"
                    value={[sliderValue]}
                    onValueChange={(value) => {
                        const [v] = value;
                        setSliderValue(v);
                    }}
                >
                    <Slider.Track>
                        {/* className="bg-amber-500" */}
                        <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb />
                </Slider.Root>
            </div>
            <Form className={`${BORDER_CLASS_NAME} rounded-lg p-4 space-y-4`}>
                <Switch
                    required
                    alignLabel="end"
                    description="(description)"
                    disabled={false}
                    helperText="Helper Text"
                    label="Label"
                    tooltip="Tooltip example"
                />
                <SwitchGroup
                    alignLabels="end"
                    description="(description)"
                    helperText="Helper text"
                    label="Group Label"
                    tooltip="Tooltip example"
                >
                    <SwitchGroup.Item label="Option 1" />
                    <SwitchGroup.Item label="Option 2" />
                    <SwitchGroup.Item label="Option 3" />
                    <SwitchGroup.Item label="Option 4" />
                </SwitchGroup>
                <Input
                    description="(description)"
                    helperText="Helper text"
                    label="Label"
                    placeholder="Placeholder"
                    required
                />
                <Input
                    description="(description)"
                    helperText="Helper text"
                    label="Label"
                    placeholder="Placeholder"
                    required
                />
                <Checkbox
                    description="description"
                    helperText="Helper text"
                    label="Label"
                    required
                    tooltip="Tooltip example"
                />
                <Textarea label="Label" placeholder="Placeholder" />
                <RadioGroup
                    defaultValue="value-1"
                    description="description"
                    helperText="Helper text"
                    label="Label"
                    required
                    tooltip="Tooltip example"
                >
                    <RadioGroup.Item label="Value 1" value="value-1" />
                    <RadioGroup.Item label="Value 2" value="value-2" />
                    <RadioGroup.Item label="Value 3" value="value-3" />
                    <RadioGroup.Item label="Value 4" value="value-4" />
                </RadioGroup>
            </Form>
            <Tabs variant="underlined" defaultValue="actions">
                <Tabs.List>
                    <Tabs.Trigger value="actions">Actions</Tabs.Trigger>
                    <Tabs.Trigger value="wiki">Wiki</Tabs.Trigger>
                    <Tabs.Trigger value="security">Security</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="actions">Actions tab content</Tabs.Content>
                <Tabs.Content value="wiki">Wiki tab content</Tabs.Content>
                <Tabs.Content value="security">
                    Security tab content
                </Tabs.Content>
            </Tabs>
            <div className="flex gap-4">
                {[...Array(8)].map((_, key) => (
                    <Tag key={key} color="yellow" closable stroke>
                        Lemons
                    </Tag>
                ))}
            </div>
        </div>
    );
}
