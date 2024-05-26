import { Entry, Feeling, Sentiment } from '@prisma/client';
import { prisma } from '~/db.server';

export async function getEntries() {
    return prisma.entry.findMany({
        where: {},
        include: {
            feelings: true
        },
        orderBy: [
            {
                updatedAt: 'desc'
            }
        ]
    });
}

export async function getEntriesByFeeling(slug: string) {
    return prisma.entry.findMany({
        where: {
            feelings: {
                some: {
                    slug
                }
            }
        },
        include: {
            feelings: true,
            comments: true
        },
        orderBy: [
            {
                updatedAt: 'desc'
            }
        ]
    });
}

export async function getEntriesBySentiment(sentiment: Sentiment) {
    return prisma.entry.findMany({
        where: {
            sentiment
        },
        include: {
            feelings: true,
            comments: true
        },
        orderBy: [
            {
                updatedAt: 'desc'
            }
        ]
    });
}

export function createEntry({
    content,
    sentiment,
    feelings,
    feelingComments
}: Pick<Entry, 'content'> & {
    sentiment: string;
    feelings: { id: string }[];
    feelingComments: { feelingId: Feeling['id']; comment: string }[];
}) {
    return prisma.entry.create({
        data: {
            content,
            sentiment: sentiment as Sentiment,
            feelings: {
                connect: feelings
            },
            comments: {
                create: feelingComments
            }
        },
        include: {
            comments: true
        }
    });
}

export function getEntryById(id: string) {
    return prisma.entry.findFirst({
        where: {
            id
        },
        include: {
            feelings: true,
            comments: true
        }
    });
}

export function deleteEntry(id: string) {
    const deleteEntry = prisma.entry.delete({
        where: { id }
    });

    return prisma.$transaction([deleteEntry]);
}
