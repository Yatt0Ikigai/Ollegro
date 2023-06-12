import { closeRedisInstance } from "../trpc/redisServer";
import { prisma } from "../trpc/prisma";

afterAll(() => {
    closeRedisInstance();
})

beforeEach(async() => {
    await prisma.users.deleteMany();
    await prisma.offert.deleteMany();
    await prisma.cathegory.deleteMany();
})