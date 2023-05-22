import { z } from 'zod';
import { t, authedProcedure, unauthedProcedure, procedure } from "../../utils/[trpc]";
import { changeEmailHandler, changeFirstNameHandler, changeLastNameHandler, changePasswordHandler, depositHandler, getInfoHandler } from "./controller"

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
            .input(z.number().refine((n) => n > 0))
            .mutation(async ({ input, ctx }) => {
                return await depositHandler({ ctx, amount: input })
            }),
    getInfo:
        authedProcedure
            .query(async ({ ctx }) => {
                return await getInfoHandler({ ctx });
            })
})

export default userRouter;