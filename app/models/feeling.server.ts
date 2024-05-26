import { prisma } from '~/db.server';

export function getFeelings() {
    return prisma.feeling.findMany();
}
