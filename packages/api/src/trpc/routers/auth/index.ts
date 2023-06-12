import { z } from 'zod';
import { t, authedProcedure, unauthedProcedure } from "../../utils/[trpc]";
import { loginHandler, logoutHandler, registerHandler } from "./controller";




const authRouter = t.router({
  logOut:
    authedProcedure
      .mutation(async ({ ctx }) => {
        const data = await logoutHandler({ ctx });
        return data;
      }),
  login:
    unauthedProcedure
      .input(z.object({
        email: z.string().email("This is not a valid email.").nonempty(),
        password: z.string().min(4, { message: "Too short password" }),
      }))
      .mutation(async ({ ctx, input }) => {
        return await loginHandler({ input, ctx });
      }),
  register:
    unauthedProcedure
      .input(
        z.object({
          email: z.string().email("This is not a valid email."),
          password: z.string().min(4),
          firstName: z.string().nonempty(),
          lastName: z.string().nonempty()
        })
      ).mutation(async ({ ctx, input }) => {
        const user = await registerHandler({
          input: {
            email: input.email,
            password: input.password,
            firstName: input.firstName,
            lastName: input.lastName
          },
          ctx
        });
        return {
          status: "success",
          data: user
        }
      })
})


export default authRouter;