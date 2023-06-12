import { z } from 'zod';
import {
    t,
    authedProcedure,
    unauthedProcedure,
    procedure
} from "../../utils/[trpc]";
import {
    changeEmailHandler,
    changeFirstNameHandler,
    changeLastNameHandler,
    changePasswordHandler,
    depositHandler,
    getInfoHandler,
    sendMailHandler
} from "./controller"

const userRouter = t.router({
    changeEmail:
        authedProcedure
            .input(z.string().email())
            .mutation(async ({ input, ctx }) => {
                return await changeEmailHandler({ ctx, newEmail: input })
            }),

    changePassword:
        authedProcedure
            .input(z.string())
            .mutation(async ({ input, ctx }) => {
                return await changePasswordHandler({ ctx, newPassword: input });
            }),
    changeFirstName:
        authedProcedure
            .input(z.string())
            .mutation(async ({ input, ctx }) => {
                return await changeFirstNameHandler({ ctx, newFirstName: input });
            }),
    changeLastName:
        authedProcedure
            .input(z.string())
            .mutation(async ({ input, ctx }) => {
                return await changeLastNameHandler({ ctx, newLastName: input })
            }),
    depositMoney:
        authedProcedure
            .input(z.number().positive())
            .mutation(async ({ input, ctx }) => {
                return await depositHandler({ ctx, amount: input })
            }),
    getInfo:
        authedProcedure
            .query(async ({ ctx }) => {
                return await getInfoHandler({ ctx });
            }),
    sendMail:
        authedProcedure
            .input(z.object({
                subject: z.string().nonempty(),
                message: z.string().nonempty()
            }))
            .mutation(async ({ ctx, input }) => {
                return await sendMailHandler({ ctx, ...input });
            })
})

export default userRouter;