import { useState } from 'react';
import { ToggleGroup, Tag } from '@lemonsqueezy/wedges';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import { GridIcon, List } from 'lucide-react';

import ButtonLink from '~/components/ButtonLink';
import Card from '~/components/Card';
import Container from '~/components/Container';
import Flex from '~/components/Flex';
import Grid from '~/components/Grid';
import Heading from '~/components/Heading';
import { getEntries } from '~/models/entry.server';
import { formatDate } from '~/utils';
import InternalLink from '~/components/InternalLink';

type ViewType = 'gridView' | 'listView';

export async function loader() {
    const entries = await getEntries();

    return json({ entries });
}

export default function EntriesIndexRoute() {
    const [viewType, setViewType] = useState<ViewType>('gridView');
    const { entries } = useLoaderData<typeof loader>();

    return (
        <Container>
            <Flex className="items-center mb-4 gap-8">
                <Heading as="h1" className="mb-0">
                    All entries
                </Heading>
                <div>
                    <ToggleGroup
                        defaultValue={viewType}
                        type="single"
                        onValueChange={(v: ViewType) => setViewType(v)}
                    >
                        <ToggleGroup.Item
                            value="gridView"
                            after={<GridIcon />}
                        />
                        <ToggleGroup.Item value="listView" after={<List />} />
                    </ToggleGroup>
                </div>
            </Flex>
            <Grid className="gap-4">
                {entries && entries.length > 0 ? (
                    entries.map((entry) => {
                        return (
                            <Card
                                className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                                key={entry.id}
                            >
                                <Flex className="flex-col items-start gap-3">
                                    <InternalLink to={entry.id}>
                                        <Heading as="h3">
                                            {formatDate(entry.createdAt)}
                                        </Heading>
                                    </InternalLink>
                                    <InternalLink
                                        to={`/sentiments/${kebabCase(
                                            entry.sentiment
                                        )}`}
                                    >
                                        <Tag stroke color="blue">
                                            {startCase(
                                                entry.sentiment.toLowerCase()
                                            )}
                                        </Tag>
                                    </InternalLink>
                                    <p>{`${entry.content?.substring(
                                        0,
                                        50
                                    )}...`}</p>
                                </Flex>
                            </Card>
                        );
                    })
                ) : (
                    <Card className="col-span-12 flex flex-col gap-4 justify-center items-center min-h-80">
                        <p className="text-4xl text-zinc-500">
                            No entries found
                        </p>
                        <p>
                            <ButtonLink to="new" variant="outline">
                                Add entry
                            </ButtonLink>
                        </p>
                    </Card>
                )}
            </Grid>
        </Container>
    );
}
