import { Alert } from '@lemonsqueezy/wedges';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import Container from '~/components/Container';
import Heading from '~/components/Heading';

export default function Index() {
    return (
        <Container className="space-y-4">
            <Heading as="h1">Enneagram type four</Heading>
            <div className="text-lg space-y-4 max-w-4xl">
                <p className="mb-6">
                    <span className="bg-primary-500">
                        Fours are self-aware, sensitive, and reserved.
                    </span>{' '}
                    They are emotionally honest, creative, and personal, but can
                    also be moody and self-conscious. Withholding themselves
                    from others due to feeling vulnerable and defective, they
                    can also feel disdainful and exempt from ordinary ways of
                    living. They typically have problems with melancholy,
                    self-indulgence, and self-pity. At their Best: inspired and
                    highly creative, they are able to renew themselves and
                    transform their experiences.
                </p>
                <ul className="space-y-2 mb-6">
                    <li>
                        <strong className="font-bold">Basic Fear:</strong> That
                        they have no identity or personal significance
                    </li>
                    <li>
                        <strong className="font-bold">Basic Desire:</strong> To
                        find themselves and their significance (to create an
                        identity)
                    </li>
                </ul>
                <p>
                    <strong className="font-bold">Key Motivations:</strong> Want
                    to express themselves and their individuality, to create and
                    surround themselves with beauty, to maintain certain moods
                    and feelings, to withdraw to protect their self-image, to
                    take care of emotional needs before attending to anything
                    else, to attract a “rescuer.”
                </p>
                <p>
                    The Individualist&apos;s identity by seeing themselves as
                    fundamentally different from others. Fours feel that they
                    are unlike other human beings, and consequently, that no one
                    can understand them or love them adequately. They often see
                    themselves as uniquely talented, possessing special,
                    one-of-a-kind gifts, but also as uniquely disadvantaged or
                    flawed. More than any other type,{' '}
                    <span className="bg-primary-500">
                        Fours are acutely aware of and focused on their personal
                        differences and deficiencies.
                    </span>
                </p>
                <p>
                    Healthy{' '}
                    <span className="bg-primary-500">
                        Fours are honest with themselves
                    </span>
                    : they own all of their feelings and can look at their
                    motives, contradictions, and emotional conflicts without
                    denying or whitewashing them. They may not necessarily like
                    what they discover, but they do not try to rationalize their
                    states, nor do they try to hide them from themselves or
                    others. They are not afraid to see themselves “warts and
                    all.” Healthy{' '}
                    <span className="bg-primary-500">
                        Fours are willing to reveal highly personal and
                        potentially shameful things about themselves because
                        they are determined to understand the truth of their
                        experience — so that they can discover who they are and
                        come to terms with their emotional history.
                    </span>{' '}
                    This ability also enables Fours to endure suffering with a
                    quiet strength. Their familiarity with their own darker
                    nature makes it easier for them to process painful
                    experiences that might overwhelm other types.
                </p>
                <p>
                    Nevertheless, Fours often report that they feel they are
                    missing something in themselves, although they may have
                    difficulty identifying exactly what that “something” is. Is
                    it will power? Social ease? Self-confidence? Emotional
                    tranquility?—all of which they see in others, seemingly in
                    abundance. Given time and sufficient perspective, Fours
                    generally recognize that they are unsure about aspects of
                    their self-image—their personality or ego-structure itself.
                    They feel that they lack a clear and stable identity,
                    particularly a social persona that they feel comfortable
                    with.
                </p>
                <Heading>Healthy</Heading>
                <ul className="space-y-2 mb-6">
                    <li>
                        <strong>Level 1 (At Their Best)</strong>
                        <br /> Profoundly creative, expressing the personal and
                        the universal, possibly in a work of art. Inspired,
                        self-renewing and regenerating: able to transform all
                        their experiences into something valuable:
                        self-creative.
                    </li>
                    <li>
                        <strong>Level 2</strong>
                        <br /> Self-aware, introspective, on the “search for
                        self,” aware of feelings and inner impulses. Sensitive
                        and intuitive both to self and others: gentle, tactful,
                        compassionate.
                    </li>
                    <li>
                        <strong>Level 3</strong>
                        <br /> Highly personal, individualistic, “true to self.”
                        Self-revealing, emotionally honest, humane. Ironic view
                        of self and life: can be serious and funny, vulnerable
                        and emotionally strong.
                    </li>
                </ul>
                <Heading>Average</Heading>
                <ul className="space-y-2 mb-6">
                    <li>
                        <strong>Level 4</strong>
                        <br /> Take an artistic, romantic orientation to life,
                        creating a beautiful, aesthetic environment to cultivate
                        and prolong personal feelings. Heighten reality through
                        fantasy, passionate feelings, and the imagination.
                    </li>
                    <li>
                        <strong>Level 5</strong>
                        <br /> To stay in touch with feelings, they interiorize
                        everything, taking everything personally, but become
                        self-absorbed and introverted, moody and hypersensitive,
                        shy and self-conscious, unable to be spontaneous or to
                        “get out of themselves.” Stay withdrawn to protect their
                        self-image and to buy time to sort out feelings.
                    </li>
                    <li>
                        <strong>Level 6</strong>
                        <br /> Gradually think that they are different from
                        others, and feel that they are exempt from living as
                        everyone else does. They become melancholy dreamers,
                        disdainful, decadent, and sensual, living in a fantasy
                        world. Self-pity and envy of others leads to
                        self-indulgence, and to becoming increasingly
                        impractical, unproductive, effete, and precious.
                    </li>
                </ul>
                <Heading>Unhealthy</Heading>
                <ul className="space-y-2 mb-6">
                    <li>
                        <strong>Level 7</strong>
                        <br /> When dreams fail, become self-inhibiting and
                        angry at self, depressed and alienated from self and
                        others, blocked and emotionally paralyzed. Ashamed of
                        self, fatigued and unable to function.
                    </li>
                    <li>
                        <strong>Level 8</strong>
                        <br /> Tormented by delusional self-contempt,
                        self-reproaches, self-hatred, and morbid thoughts:
                        everything is a source of torment. Blaming others, they
                        drive away anyone who tries to help them.
                    </li>
                    <li>
                        <strong>Level 9</strong>
                        <br /> Despairing, feel hopeless and become
                        self-destructive, possibly abusing alcohol or drugs to
                        escape. In the extreme: emotional breakdown or suicide
                        is likely. Generally corresponds to the Avoidant,
                        Depressive, and Narcissistic personality disorders.
                    </li>
                </ul>
            </div>
        </Container>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <Alert>
                {error.status} {error.statusText}
            </Alert>
        );
    } else if (error instanceof Error) {
        return (
            <>
                <Alert color="error" title="Error" variant="expanded">
                    <p>{error.message}</p>
                </Alert>
            </>
        );
    } else {
        return <Alert color="error" title="Unknown Error" variant="expanded" />;
    }
}
