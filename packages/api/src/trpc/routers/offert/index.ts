import { z } from 'zod';
import { t, authedProcedure, unauthedProcedure, procedure } from "../../utils/[trpc]";

import { createOffertHandler, getSelfOffertsHandler, getOffertsHandler } from "./controller";

const offertRoute = t.router({
  createOffert:
    authedProcedure
      .input(z.object({
        title: z.string(),
        image: z.string(),
        description: z.string(),
        price: z.number(),
        condition: z.string().refine((e) => ["new", "used"].includes(e)),
        cathegoryId: z.string()
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
      .query(async ({ ctx }) => {
        const offerts = await getSelfOffertsHandler(ctx);

        return {
          status: "success",
          offerts
        }
      }),
  getOfferts:
    procedure
      .input(z.object({
        title: z.string().optional(),
        minPrice: z.preprocess(
          (e) => parseFloat(z.string().parse(e)),
          z.number()
        ).optional(),
        maxPrice: z.preprocess(
          (e) => parseFloat(z.string().parse(e)),
          z.number()
        ).optional(),
        condition: z.string().optional(),
        cathegoryId: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        const offerts = await getOffertsHandler({
          input, ctx
        });
        return {
          status: "success",
          offerts
        }
      })
})


export default offertRoute;