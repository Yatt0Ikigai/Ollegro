import { z } from 'zod';
import { t, authedProcedure, procedure } from "../../utils/[trpc]";

import {
  createOffertHandler,
  getSelfOffertsHandler,
  getOffertsHandler,
  getSpecificOffertHandler,
  buyOffertHandler,
  getBoughtOffertsHandler,
  closeOffertHandler,
  changeOffertPriceHandler
} from "./controller";

const offertRoute = t.router({
  createOffert:
    authedProcedure
      .input(z.object({
        title: z.string().nonempty(),
        image: z.string().nonempty(),
        description: z.string().max(1500, "description too long"),
        price: z.number().min(1, { message: "Price can't be less than 1" }),
        condition: z.string().refine((e) => ["New", "Used"].includes(e)),
        cathegoryId: z.string().nonempty()
      }))
      .mutation(async ({ input, ctx }) => {
        return await createOffertHandler(input, ctx);
      }),

  getSelfOfferts:
    authedProcedure
      .query(async ({ ctx }) => {
        return await getSelfOffertsHandler(ctx);
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
        condition: z.string().array(),
        cathegoryId: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        return await getOffertsHandler({
          input, ctx
        })
      }),
  getSpecificOffert:
    procedure
      .input(z.object({
        id: z.string().length(24)
      }))
      .query(async ({ ctx, input }) => {
        return await getSpecificOffertHandler({ offertId: input.id, ctx });
      }),
  buyOffert:
    authedProcedure
      .input(z.string())
      .mutation(async ({ ctx, input }) => {
        return await buyOffertHandler({ offertId: input, ctx });
      }),
  getBoughtOfferts:
    authedProcedure
      .query(async ({ ctx }) => {
        return await getBoughtOffertsHandler(ctx);
      }),
  closeOffert:
    authedProcedure
      .input(z.object({
        offertId: z.string().length(24)
      }))
      .mutation(async ({ ctx, input }) => {
        return await closeOffertHandler({ ctx,  offertId: input.offertId })
      }),
  changeOffertPrice:
    authedProcedure
      .input(z.object({
        offertId: z.string().length(24),
        newPrice: z.number().min(1, { message: "Price can't be less than 1" })
      }))
      .mutation(async ({ ctx, input }) => {
        return await changeOffertPriceHandler({ ctx, input });
      })
})


export default offertRoute;