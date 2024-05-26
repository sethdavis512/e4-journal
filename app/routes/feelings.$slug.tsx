import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import startCase from 'lodash/startCase';
import isEmpty from 'lodash/isEmpty';
import invariant from 'tiny-invariant';
import Card from '~/components/Card';

import Container from '~/components/Container';
import Heading from '~/components/Heading';
import { getEntriesByFeeling } from '~/models/entry.server';
import { formatDate } from '~/utils';
import InternalLink from '~/components/InternalLink';

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.slug, 'No feeling available');
    const entries = await getEntriesByFeeling(params.slug);

    return json({ entries, slug: params.slug });
}

export default function FeelingsRoute() {
    const { entries, slug } = useLoaderData<typeof loader>();

    return (
        <Container>
            <Heading as="h1">{`Entries containing feelings of "${startCase(
                slug
            )}"`}</Heading>
            <div className="space-y-4">
                {!isEmpty(entries) &&
                    entries.map((entry) => (
                        <Card key={entry.id} className="space-y-4">
                            <InternalLink to={`/entries/${entry.id}`}>
                                <Heading as="h3">
                                    {formatDate(entry.createdAt)}
                                </Heading>
                            </InternalLink>
                            <div>
                                <Heading as="h3">Content</Heading>
                                <p>{`${entry.content?.substring(
                                    0,
                                    100
                                )}...`}</p>
                            </div>
                        </Card>
                    ))}
            </div>
        </Container>
    );
}
