import { Prisma, Offert } from "@prisma/client"
import { prisma } from "../prisma"

export const createOffert = async (
    input: Partial<Prisma.OffertCreateInput>
) => {
    return (await prisma.offert.create({
        data: input,
    }) as Offert)
}

export const getOffert = async (
    where: Partial<Prisma.OffertWhereInput>,
    select?: Partial<Prisma.OffertSelect>,
) => {
    return await prisma.offert.findFirst({ where, select }) as Offert;
}

export const getOfferts = async (
    where: Partial<Prisma.OffertWhereInput>,
    select?: Partial<Prisma.OffertSelect>,
) => {
    return await prisma.offert.findMany({ where, select }) as Offert[];
}
