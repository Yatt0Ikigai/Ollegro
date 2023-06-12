import { z } from 'zod';
import { t, adminProcedure } from "../../utils/[trpc]";

import { addCathegoryController, deleteOffertHandler } from "./controller";

const authRouter = t.router({
  addCathegory:
    adminProcedure
      .input(
        z.object({
          cathegoryName: z.string().nonempty()
        })
      ).mutation(async ({ input }) => {
        return await addCathegoryController({ cathegoryName: input.cathegoryName })
      }),
  deleteOffert:
    adminProcedure
      .input(
        z.object({
          offertId: z.string().length(24)
        }))
      .mutation(async ({ input }) => {
        return await deleteOffertHandler({ offertId: input.offertId });
      })
})


export default authRouter;