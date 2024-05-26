import { prisma } from '~/db.server';

export function getSentiments() {
    return prisma.sentiment.findMany();
}
