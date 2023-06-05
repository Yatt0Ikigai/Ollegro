import { z } from 'zod';
import { t, adminProcedure } from "../../utils/[trpc]";

import { addCathegoryController } from "./controller";

const authRouter = t.router({
  addCathegory:
    adminProcedure
      .input(
        z.object({
          cathegoryName: z.string()
        })
      ).mutation(async ({ ctx, input }) => {
        const result = await addCathegoryController({ cathegoryName: input.cathegoryName })
        return result;
      })
})


export default authRouter;