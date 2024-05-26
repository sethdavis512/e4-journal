import { Button, Loading, Tag } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import startCase from 'lodash/startCase';
import isEmpty from 'lodash/isEmpty';
import { Trash } from 'lucide-react';
import invariant from 'tiny-invariant';
import Card from '~/components/Card';
import Container from '~/components/Container';
import { deleteEntry, getEntryById } from '~/models/entry.server';
import { formatDate } from '~/utils';
import Heading from '~/components/Heading';
import Divider from '~/components/Divider';
import ButtonLink from '~/components/ButtonLink';
import Flex from '~/components/Flex';
import kebabCase from 'lodash/kebabCase';
import keyBy from 'lodash/keyBy';
import InternalLink from '~/components/InternalLink';

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.entryId, 'Entry ID not found');
    const entry = await getEntryById(params.entryId);
    const entryMap = keyBy(entry?.comments, 'feelingId');

    return json({ entry, entryMap });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const intent = String(form.get('intent'));

    if (intent === 'DELETE') {
        const entryId = String(form.get('entryId'));
        invariant(entryId, 'Entry ID not found');

        try {
            await deleteEntry(entryId);
        } catch (error) {
            console.log(error);
        }
    }

    return redirect('/entries');
}

export default function EntryDetailRoute() {
    const { entry, entryMap } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const isDeleting = navigation.state === 'loading';

    if (!entry) {
        return (
            <Container>
                <Card className="col-span-12 flex flex-col gap-4 justify-center items-center min-h-80">
                    <p className="text-4xl text-zinc-500">Entry not found</p>
                    <Flex>
                        <ButtonLink to="/entries" variant="outline">
                            See entries
                        </ButtonLink>
                        <ButtonLink to="new" variant="outline">
                            Add entry
                        </ButtonLink>
                    </Flex>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="space-y-4">
            <Heading as="h1" className="text-center">
                {formatDate(entry.createdAt)}
            </Heading>
            <Card className="space-y-6 max-w-3xl mx-auto mb-8">
                <Heading as="h3">{`Sentiment`}</Heading>
                <InternalLink
                    className="inline-block"
                    to={`/sentiments/${kebabCase(entry.sentiment)}`}
                >
                    <Tag stroke color="blue">
                        {startCase(entry.sentiment.toLowerCase())}
                    </Tag>
                </InternalLink>
                {!isEmpty(entry.feelings) && (
                    <>
                        <Heading as="h3">{`Feelings`}</Heading>
                        {entry.feelings.map((feeling) => (
                            <Flex key={feeling.id} className="flex-col">
                                <InternalLink to={`/feelings/${feeling.slug}`}>
                                    <Tag stroke color="green">
                                        {feeling.display}
                                    </Tag>
                                </InternalLink>
                                {entryMap[feeling.id] &&
                                entryMap[feeling.id].comment ? (
                                    <p>{entryMap[feeling.id].comment}</p>
                                ) : (
                                    <Card className="col-span-12 flex flex-col gap-4 justify-center items-center py-8">
                                        <p className="text-xl text-zinc-500">
                                            {`No comment`}
                                        </p>
                                    </Card>
                                )}
                            </Flex>
                        ))}
                    </>
                )}
                {!isEmpty(entry.content) && (
                    <>
                        <Divider />
                        <Heading as="h3">{`Content`}</Heading>
                        <p>{entry.content}</p>
                    </>
                )}
                <Form method="POST" className="flex justify-start mb-4">
                    <input type="hidden" name="entryId" value={entry.id} />
                    <Button
                        destructive
                        name="intent"
                        value="DELETE"
                        disabled={isDeleting}
                        before={
                            isDeleting ? (
                                <Loading
                                    className="w-5 h-5 p-0 m-0"
                                    color="secondary"
                                />
                            ) : (
                                <Trash />
                            )
                        }
                    >
                        {`Delet${isDeleting ? 'ing' : 'e'}`}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
