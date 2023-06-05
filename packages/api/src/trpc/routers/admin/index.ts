import { z } from 'zod';
import { t, adminProcedure } from "../../utils/[trpc]";

import { addCathegoryController, deleteOffertHandler } from "./controller";

const authRouter = t.router({
  addCathegory:
    adminProcedure
      .input(
        z.object({
          cathegoryName: z.string()
        })
      ).mutation(async ({ input }) => {
        const result = await addCathegoryController({ cathegoryName: input.cathegoryName })
        return result;
      }),
  deleteOffert:
    adminProcedure
      .input(
        z.object({
          offertId: z.string()
        }))
      .mutation(async ({ input }) => {
        const result = await deleteOffertHandler({ offertId: input.offertId });
        return result;
      })
})


export default authRouter;