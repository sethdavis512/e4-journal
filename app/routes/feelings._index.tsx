import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getFeelings } from '~/models/feeling.server';

export async function loader() {
    const feelings = await getFeelings();

    return json({ feelings });
}

export default function Route() {
    const { feelings } = useLoaderData<typeof loader>();

    return <>{JSON.stringify(feelings, null, 4)}</>;
}
