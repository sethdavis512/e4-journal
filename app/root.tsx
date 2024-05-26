import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useFetcher,
    useLoaderData
} from '@remix-run/react';

import stylesheet from '~/tailwind.css?url';
import {
    LinksFunction,
    LoaderFunctionArgs,
    MetaFunction,
    json
} from '@remix-run/node';
import { Theme } from './utils/theme';
import { getThemeSession } from './utils/theme.server';
import { Toggle } from '@lemonsqueezy/wedges';
import { Moon, Sun } from 'lucide-react';
import { BORDER_BOTTOM_CLASS_NAME, BORDER_TOP_CLASS_NAME } from './constants';
import Flex from './components/Flex';
import ButtonLink from './components/ButtonLink';
import Container from './components/Container';
import InternalLink from './components/InternalLink';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet }
];

export const meta: MetaFunction = () => {
    return [
        { title: 'E4 | Journal' },
        {
            name: 'description',
            content: 'Journal application for Enneagram Type 4'
        }
    ];
};

function Layout({
    children,
    theme
}: {
    children: React.ReactNode;
    theme: Theme;
}) {
    const themeFetcher = useFetcher();
    const isThemeDark = theme === Theme.DARK;

    return (
        <html lang="en" className={`${theme} h-full`}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="h-full grid grid-cols-12 grid-rows-[auto_1fr_auto]">
                <header className={`${BORDER_BOTTOM_CLASS_NAME} col-span-full`}>
                    <Container className="flex justify-between">
                        <Flex className="items-center">
                            <InternalLink
                                to="/"
                                className="text-2xl font-bold mr-4 no-underline"
                            >
                                E4
                            </InternalLink>
                            <ButtonLink to="/entries" variant="transparent">
                                Entries
                            </ButtonLink>
                            <ButtonLink to="/entries/new" variant="primary">
                                New entry
                            </ButtonLink>
                        </Flex>
                        <div>
                            <themeFetcher.Form
                                method="POST"
                                action="/api/theme"
                            >
                                <Toggle
                                    type="submit"
                                    before={isThemeDark ? <Moon /> : <Sun />}
                                    name="themeSelection"
                                    value={
                                        isThemeDark ? Theme.LIGHT : Theme.DARK
                                    }
                                />
                            </themeFetcher.Form>
                        </div>
                    </Container>
                </header>
                <main className="col-span-full">{children}</main>
                <footer className={`${BORDER_TOP_CLASS_NAME} col-span-full`}>
                    <Container>
                        <p>Tech with Seth</p>
                    </Container>
                </footer>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export async function loader({ request }: LoaderFunctionArgs) {
    const themeSession = await getThemeSession(request);

    return json({ theme: themeSession.getTheme() });
}

export default function App() {
    const { theme } = useLoaderData<typeof loader>();

    return (
        <Layout theme={theme}>
            <Outlet context={{ theme }} />
        </Layout>
    );
}
