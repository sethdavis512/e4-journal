import { Button, Input } from '@lemonsqueezy/wedges';
import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useSearchParams } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import Card from '~/components/Card';
import InternalLink from '~/components/InternalLink';

import { verifyLogin } from '~/models/user.server';
import { createUserSession, getUserId } from '~/session.server';
import { safeRedirect, validateEmail } from '~/utils';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const userId = await getUserId(request);
    if (userId) return redirect('/');
    return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const redirectTo = safeRedirect(formData.get('redirectTo'), '/');
    const remember = formData.get('remember');

    if (!validateEmail(email)) {
        return json(
            { errors: { email: 'Email is invalid', password: null } },
            { status: 400 }
        );
    }

    if (typeof password !== 'string' || password.length === 0) {
        return json(
            { errors: { email: null, password: 'Password is required' } },
            { status: 400 }
        );
    }

    if (password.length < 8) {
        return json(
            { errors: { email: null, password: 'Password is too short' } },
            { status: 400 }
        );
    }

    const user = await verifyLogin(email, password);

    if (!user) {
        return json(
            { errors: { email: 'Invalid email or password', password: null } },
            { status: 400 }
        );
    }

    return createUserSession({
        redirectTo,
        remember: remember === 'on' ? true : false,
        request,
        userId: user.id
    });
};

export const meta: MetaFunction = () => [{ title: 'Login' }];

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/notes';
    const actionData = useActionData<typeof action>();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (actionData?.errors?.email) {
            emailRef.current?.focus();
        } else if (actionData?.errors?.password) {
            passwordRef.current?.focus();
        }
    }, [actionData]);

    return (
        <div className="flex flex-col justify-center">
            <div className="mx-auto w-full max-w-md px-8">
                <h1 className="text-4xl font-bold mb-4">Login</h1>
                <Card>
                    <Form method="post" className="space-y-6">
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            label="Email"
                            ref={emailRef}
                            aria-invalid={
                                actionData?.errors?.email ? true : undefined
                            }
                            aria-describedby="email-error"
                            autoComplete="email"
                            placeholder="Enter your email address"
                            required
                        />
                        {actionData?.errors?.email ? (
                            <div className="pt-1 text-red-700" id="email-error">
                                {actionData.errors.email}
                            </div>
                        ) : null}

                        <Input
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            ref={passwordRef}
                            aria-invalid={
                                actionData?.errors?.password ? true : undefined
                            }
                            aria-describedby="password-error"
                            autoComplete="new-password"
                            required
                        />
                        {actionData?.errors?.password ? (
                            <div
                                className="pt-1 text-red-700"
                                id="password-error"
                            >
                                {actionData.errors.password}
                            </div>
                        ) : null}

                        <input
                            type="hidden"
                            name="redirectTo"
                            value={redirectTo}
                        />
                        <Button type="submit">Sign in</Button>

                        <input
                            type="hidden"
                            name="redirectTo"
                            value={redirectTo}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div className="text-center text-sm text-gray-500">
                                Don&apos;t have an account?{' '}
                                <InternalLink
                                    className="text-blue-500 underline"
                                    to={{
                                        pathname: '/join',
                                        search: searchParams.toString()
                                    }}
                                >
                                    Sign up
                                </InternalLink>
                            </div>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
