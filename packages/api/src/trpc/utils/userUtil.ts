import { Prisma, Users } from "@prisma/client"
import { prisma } from "../prisma"

export const createUser = async (
    input: Partial<Prisma.UsersCreateInput>
) => {
    return (await prisma.users.create({
        data: input,
    }) as Users)
}

export const getUser = async (
    where: Partial<Prisma.UsersWhereInput>,
    select?: Partial<Prisma.UsersSelect>,
) => {
    return await prisma.users.findFirst({ where, select }) as Users;
}

export const updateUser = async (
    where: Partial<Prisma.UsersWhereInput>,
    data: Partial<Prisma.UsersUpdateInput>
) => {
    return await prisma.users.update({ where, data }) as Users
}