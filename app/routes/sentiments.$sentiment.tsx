import { Sentiment } from '@prisma/client';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import startCase from 'lodash/startCase';
import isEmpty from 'lodash/isEmpty';
import invariant from 'tiny-invariant';

import Card from '~/components/Card';

import Container from '~/components/Container';
import { getEntriesBySentiment } from '~/models/entry.server';
import { constantCase, formatDate } from '~/utils';
import Heading from '~/components/Heading';
import InternalLink from '~/components/InternalLink';

export async function loader({ params }: LoaderFunctionArgs) {
    const sentiment = params.sentiment as Sentiment;
    invariant(sentiment, 'No sentiment available');
    const modifiedSentiment = constantCase(sentiment);
    const entries = await getEntriesBySentiment(modifiedSentiment as Sentiment);

    return json({ entries, sentiment: params.sentiment });
}

export default function SentimentRoute() {
    const { entries, sentiment } = useLoaderData<typeof loader>();

    return (
        <>
            <Container>
                <Heading as="h1">{`Entries containing "${startCase(
                    sentiment?.toLowerCase()
                )}" sentiments`}</Heading>
                <div className="space-y-4">
                    {!isEmpty(entries) &&
                        entries.map((entry) => (
                            <Card key={entry.id} className="space-y-4">
                                <InternalLink to={`/entries/${entry.id}`}>
                                    <Heading as="h3" className="mb-4">
                                        {formatDate(entry.createdAt)}
                                    </Heading>
                                </InternalLink>
                                <div>
                                    <Heading as="h3" className="mb-4">
                                        Content
                                    </Heading>
                                    <p>
                                        {`${entry.content?.substring(
                                            0,
                                            100
                                        )}...`}
                                    </p>
                                </div>
                            </Card>
                        ))}
                </div>
            </Container>
        </>
    );
}
