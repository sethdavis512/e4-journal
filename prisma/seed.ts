import { FeelingType, PrismaClient, Sentiment, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import kebabCase from 'lodash/kebabCase';
import { subDays } from 'date-fns';

const prisma = new PrismaClient();

const successMessage = (display: string, item: string) =>
    `🆕 ${display}: ${item} created successfully`;

async function main() {
    // cleanup the existing database
    const noop = () => {};
    await prisma.user.deleteMany().catch(noop);
    await prisma.entry.deleteMany().catch(noop);
    await prisma.feeling.deleteMany().catch(noop);
    await prisma.feelingComment.deleteMany().catch(noop);

    const users: Pick<User, 'email'>[] = [...Array(10)].map(() => ({
        email: faker.internet.email()
    }));

    for (const iteratee of users) {
        const user = await prisma.user.create({
            data: {
                email: iteratee.email
            }
        });

        console.log(successMessage('User', user.id));
    }

    // Feelings ==========
    const feelings = [
        { display: 'Excitement', type: 'POSITIVE' },
        { display: 'Happiness', type: 'POSITIVE' },
        { display: 'Joy', type: 'POSITIVE' },
        { display: 'Love', type: 'POSITIVE' },
        { display: 'Surprise', type: 'POSITIVE' },
        { display: 'Pride', type: 'POSITIVE' },
        // ===
        { display: 'Anger', type: 'NEGATIVE' },
        { display: 'Anxiety', type: 'NEGATIVE' },
        { display: 'Awkwardness', type: 'NEGATIVE' },
        { display: 'Envy', type: 'NEGATIVE' },
        { display: 'Sadness', type: 'NEGATIVE' }
    ];

    const feelingIDs: string[] = [];

    for (const iteratee of feelings) {
        const feeling = await prisma.feeling.create({
            data: {
                display: iteratee.display,
                type: iteratee.type as FeelingType,
                slug: kebabCase(iteratee.display)
            }
        });
        feelingIDs.push(feeling.id);

        console.log(
            successMessage('Feeling', `${feeling.display} (/${feeling.slug})`)
        );
    }

    // Sentiment ==========
    const sentiments: Sentiment[] = [
        Sentiment.VERY_POSITIVE,
        Sentiment.POSITIVE,
        Sentiment.NEUTRAL,
        Sentiment.NEGATIVE,
        Sentiment.VERY_NEGATIVE
    ];

    // Entries ==========
    const entries = [...Array(10)].map(() => {
        return {
            createdAt: subDays(
                new Date(),
                faker.helpers.arrayElement([1, 2, 3, 5, 10])
            ),
            content: faker.word.words({ count: { min: 5, max: 300 } }),
            sentimentId: faker.helpers.arrayElement(sentiments),
            feelings: faker.helpers.arrayElements(feelingIDs, {
                min: 1,
                max: 5
            }),
            comments: [
                {
                    feelingId: faker.helpers.arrayElement(feelingIDs),
                    comment: faker.word.words({ count: { min: 5, max: 30 } })
                }
            ]
        };
    });

    for (const iteratee of entries) {
        const entry = await prisma.entry.create({
            data: {
                createdAt: iteratee.createdAt,
                sentiment: iteratee.sentimentId,
                content: iteratee.content,
                feelings: {
                    connect: iteratee.feelings.map((feelingId) => ({
                        id: feelingId
                    }))
                }
            }
        });

        console.log(successMessage('Entry', entry.id));
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
