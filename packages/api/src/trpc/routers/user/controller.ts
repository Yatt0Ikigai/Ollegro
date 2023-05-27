import { TRPCError } from '@trpc/server';
import { Context } from '../../root';
import { createUser, getUser, updateUser } from '../../utils/userUtil';
import bcrypt from 'bcryptjs';

export const changeEmailHandler = async ({ newEmail, ctx }: { newEmail: string, ctx: Context }) => {
    const isEmailTaken = await getUser({ email: newEmail });
    if (isEmailTaken) throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email is already taken',
    });
    await updateUser({ id: ctx.user?.id }, { email: newEmail })
    return {
        status: "success",
    }
}

export const changePasswordHandler = async ({ newPassword, ctx }: { newPassword: string, ctx: Context }) => {
    await updateUser({ id: ctx.user?.id }, { password: await bcrypt.hash(newPassword, 10) })
    return {
        status: "success",
    }
}


export const changeFirstNameHandler = async ({ newFirstName, ctx }: { newFirstName: string, ctx: Context }) => {
    await updateUser({ id: ctx.user?.id }, { firstName: newFirstName })
    return {
        status: "success",
    }
}

export const changeLastNameHandler = async ({ newLastName, ctx }: { newLastName: string, ctx: Context }) => {
    await updateUser({ id: ctx.user?.id }, { lastName: newLastName })
    return {
        status: "success",
    }
}


export const depositHandler = async ({ amount, ctx }: { amount: number, ctx: Context }) => {
    await updateUser({ id: ctx.user?.id }, {
        ballance:{
            increment: amount
        }
    })
    return {
        status: "success",
    }
}

export const getInfoHandler = async ({ ctx }: { ctx: Context }) => {
    const user = await getUser({ id: ctx.user?.id }, {
        email: true,
        ballance: true,
        firstName: true,
        lastName: true,
        createdAt: true,
    })
    return {
        status: "success",
        user
    }
}