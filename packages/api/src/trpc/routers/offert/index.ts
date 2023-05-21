import { z } from 'zod';
import { t, authedProcedure, unauthedProcedure, procedure } from "../../utils/[trpc]";

import { createOffertHandler, getSelfOffertsHandler} from "./controller";

const offertRoute = t.router({
  createOffert:
    authedProcedure
      .input(z.object({
        title: z.string(),
        image: z.string(),
        description: z.string(),
        price: z.number(),
        condition: z.string()
      }))
      .mutation(async ({ input, ctx }) => {
          const offert = await createOffertHandler(input, ctx);

          return {
            status: "success",
            offert
          }
      }),

    getSelfOfferts:
      authedProcedure
      .query(async({ctx}) => {
        const offerts = await getSelfOffertsHandler(ctx);

        return {
          status: "success",
          offerts
        }
      })
})


export default offertRoute;