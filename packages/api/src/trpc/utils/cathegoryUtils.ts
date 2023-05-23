import { Prisma, Cathegory } from "@prisma/client"
import { prisma } from "../prisma"

export const createOffert = async (
    input: Partial<Prisma.CathegoryCreateInput>
) => {
    return (await prisma.cathegory.create({
        data: input,
    }) as Cathegory)
}

export const getOffert = async (
    where: Partial<Prisma.CathegoryWhereInput>,
    select?: Partial<Prisma.CathegorySelect>,
) => {
    return await prisma.cathegory.findFirst({ where, select }) as Cathegory;
}

export const getCathegories = async (
    where: Partial<Prisma.CathegoryWhereInput>,
    select?: Partial<Prisma.CathegorySelect>,
) => {
    return await prisma.cathegory.findMany({ where, select }) as Cathegory[];
}
