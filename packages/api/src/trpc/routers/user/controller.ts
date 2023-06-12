import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
import { google } from "googleapis";

import { Context } from '../../root';
import { getUser, updateUser } from '../../utils/userUtil';

import { validateCatch } from "../../utils/catch"


const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(process.env.EMAIL_ID, process.env.EMAIL_SECRET);
OAuth2_client.setCredentials({ refresh_token: process.env.EMAIL_REFRESH_TOKEN });


export const changeEmailHandler = async ({ newEmail, ctx }: { newEmail: string, ctx: Context }) => {
    try {
        const isEmailTaken = await getUser({ email: newEmail });
        if (isEmailTaken) throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email is already taken',
        });
        await updateUser({ id: ctx.user?.id }, { email: newEmail })
        return {
            status: "success",
        }
    } catch (err) { validateCatch(err) }
}

export const changePasswordHandler = async ({ newPassword, ctx }: { newPassword: string, ctx: Context }) => {
    await updateUser({ id: ctx.user?.id }, { password: await bcrypt.hash(newPassword, 10) })
    return {
        status: "success",
    }
}


export const changeFirstNameHandler = async ({ newFirstName, ctx }: { newFirstName: string, ctx: Context }) => {
    try {
        await updateUser({ id: ctx.user?.id }, { firstName: newFirstName })
        return {
            status: "success",
        }
    } catch (err) { validateCatch(err) }
}

export const changeLastNameHandler = async ({ newLastName, ctx }: { newLastName: string, ctx: Context }) => {
    try {
        await updateUser({ id: ctx.user?.id }, { lastName: newLastName })
        return {
            status: "success",
        }
    } catch (err) { validateCatch(err) }
}


export const depositHandler = async ({ amount, ctx }: { amount: number, ctx: Context }) => {
    try {
        await updateUser({ id: ctx.user?.id }, {
            ballance: {
                increment: amount
            }
        })
        const user = await getUser({ id: ctx.user?.id }, { ballance: true })

        return {
            status: "success",
            currentBalance: user.ballance
        }
    } catch (err) { validateCatch(err) }
}

export const getInfoHandler = async ({ ctx }: { ctx: Context }) => {
    try {
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
    } catch (err) { validateCatch(err) }
}



export const sendMailHandler = async ({ ctx, message, subject }: ISendMailHandler) => {
    try {
        const accessToken = await OAuth2_client.getAccessToken() as string;
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL as string,
                clientId: process.env.EMAIL_ID as string,
                clientSecret: process.env.EMAIL_SECRET as string,
                refreshToken: process.env.EMAIL_REFRESH_TOKEN as string,
                accessToken: accessToken
            },
        });

        transporter.verify()

        const user = await getUser({ id: ctx.user?.id }, { email: true });

        const mailOptions = {
            from: `${user.email} <ollegrouj@gmail.com>`,
            to: "ollegroUJ@gmail.com",
            subject,
            text: message,
        };

        const mail = transporter.sendMail(mailOptions)
        if (!mail) return new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Message could be sent',
        });
        return {
            status: "success",
            message: "Email sent",
        }
    } catch (err) { validateCatch(err) }
}

interface ISendMailHandler {
    ctx: Context,
    subject: string,
    message: string,
}