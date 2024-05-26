import { faker } from '@faker-js/faker';
import {
    Alert,
    Button,
    CheckboxGroup,
    Label,
    Loading,
    RadioGroup,
    Textarea
} from '@lemonsqueezy/wedges';
import { Feeling, FeelingType, Sentiment } from '@prisma/client';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import {
    Form,
    isRouteErrorResponse,
    useLoaderData,
    useNavigation,
    useRouteError
} from '@remix-run/react';
import keyBy from 'lodash/keyBy';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import invariant from 'tiny-invariant';
import startCase from 'lodash/startCase';
import ButtonLink from '~/components/ButtonLink';
import Container from '~/components/Container';
import { createEntry } from '~/models/entry.server';
import { getFeelings } from '~/models/feeling.server';
import Card from '~/components/Card';
import Heading from '~/components/Heading';

export async function loader() {
    const sentiments = Object.values(Sentiment);
    const feelings = await getFeelings();

    const positive = feelings.filter((f) => f.type === FeelingType.POSITIVE);
    const negative = feelings.filter((f) => f.type === FeelingType.NEGATIVE);

    return json({
        feelings: {
            positive,
            negative
        },
        feelingsMap: keyBy(feelings, 'id'),
        sentiments
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const content = form.get('content');
    invariant(content, 'Content not found');

    const sentiment = form.get('sentiment');
    invariant(sentiment, 'Sentiment not found');

    const feelingFelt = form
        .getAll('feelingFelt')
        .map((i) => ({ id: String(i) }));
    invariant(feelingFelt, 'Feelings not found');

    const feelingComments = [...form.entries()]
        .filter((feelingComment) =>
            feelingComment[0].startsWith('feelingComment')
        )
        .map((feelingComment) => ({
            feelingId: feelingComment[0].split('feelingComment-')[1],
            comment: String(feelingComment[1])
        }));

    invariant(feelingComments, 'feelingComments not found');

    const payload = {
        content: String(content),
        sentiment: String(sentiment),
        feelings: feelingFelt,
        feelingComments
    };
    const awaitedEntry = await createEntry(payload);
    console.log(JSON.stringify(awaitedEntry, null, 4));

    return redirect('/entries');
}

const isMocking = false;

export default function NewEntryRoute() {
    const { feelings, sentiments } = useLoaderData<typeof loader>();
    const navigation = useNavigation();

    const initialFeelings = isMocking
        ? faker.helpers.arrayElements([
              ...feelings.positive,
              ...feelings.negative
          ])
        : [];
    const [feelingsFelt, setFeelingsFelt] =
        useState<Feeling[]>(initialFeelings);

    const isCreating = navigation.state === 'loading';

    const createHandleFeelingClick = (feeling: Feeling) => () => {
        if (
            feelingsFelt.find(
                (internalFeeling) => internalFeeling.id === feeling.id
            )
        ) {
            setFeelingsFelt(
                feelingsFelt.filter(
                    (internalFeeling) => internalFeeling.id !== feeling.id
                )
            );
        } else {
            setFeelingsFelt([feeling, ...feelingsFelt]);
        }
    };

    const buildCheckbox = (feeling: Feeling) => (
        <CheckboxGroup.Item
            key={feeling.id}
            name="feelingFelt"
            label={feeling.display}
            value={feeling.id}
            onClick={createHandleFeelingClick(feeling)}
            checked={Boolean(
                feelingsFelt.find(
                    (internalFeeling) => internalFeeling.id === feeling.id
                )
            )}
        />
    );

    return (
        <Container>
            <Heading as="h1">Add a new entry</Heading>
            <Form method="POST">
                <div className="flex flex-col md:flex-row gap-4">
                    <Card className={`basis-1/3 mb-4 sm:mb-0`}>
                        <RadioGroup
                            label="What was your general outlook for today?"
                            name="sentiment"
                            className="mb-4"
                        >
                            {sentiments.map((sentiment) => (
                                <RadioGroup.Item
                                    key={sentiment}
                                    label={startCase(sentiment.toLowerCase())}
                                    value={sentiment}
                                />
                            ))}
                        </RadioGroup>
                        <CheckboxGroup label="What were some of the feelings you encountered?">
                            <div className="flex gap-4">
                                <div className="space-y-2">
                                    <Label description="Positive" />
                                    {feelings.positive.map(buildCheckbox)}
                                </div>
                                <div className="space-y-2">
                                    <Label description="Negative" />
                                    {feelings.negative.map(buildCheckbox)}
                                </div>
                            </div>
                        </CheckboxGroup>
                    </Card>
                    <Card className={`basis-2/3 space-y-4 md:overflow-y-auto`}>
                        {feelingsFelt.map((internalFeeling) => (
                            <div key={internalFeeling.id}>
                                <Label
                                    htmlFor={internalFeeling.id}
                                    className="mb-2"
                                >
                                    {`Talk more about your ${internalFeeling.display}:`}
                                </Label>
                                <Textarea
                                    id={internalFeeling.id}
                                    className="h-40"
                                    name={`feelingComment-${internalFeeling.id}`}
                                    defaultValue={
                                        isMocking
                                            ? faker.word.words({
                                                  count: { min: 50, max: 100 }
                                              })
                                            : ''
                                    }
                                />
                            </div>
                        ))}
                        <div>
                            <Label htmlFor="additionalDetails" className="mb-2">
                                Content
                            </Label>
                            <Textarea
                                id="additionalDetails"
                                name="content"
                                defaultValue={
                                    isMocking
                                        ? faker.word.words({
                                              count: { min: 50, max: 100 }
                                          })
                                        : ''
                                }
                            />
                        </div>
                        <Button
                            className="w-full md:w-auto mb-4"
                            type="submit"
                            before={
                                isCreating ? (
                                    <Loading className="w-5 h-5" />
                                ) : (
                                    <Pencil className="w-5 h-5" />
                                )
                            }
                        >
                            {`Add${isCreating ? 'ing' : ''} entry`}
                        </Button>
                    </Card>
                </div>
            </Form>
        </Container>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    return (
        <Container>
            {isRouteErrorResponse(error) ? (
                <Alert>
                    {error.status} {error.statusText}
                </Alert>
            ) : error instanceof Error ? (
                <Alert color="error" title="Error" variant="expanded">
                    <span className="block mb-4">{error.message}</span>
                    <ButtonLink variant="outline" to=".">
                        Try again
                    </ButtonLink>
                </Alert>
            ) : (
                <Alert color="error" title="Unknown Error" variant="expanded" />
            )}
        </Container>
    );
}
