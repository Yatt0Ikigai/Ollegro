import { z } from 'zod';
import { t, authedProcedure, unauthedProcedure, procedure } from "../../utils/[trpc]";

import {
  createOffertHandler,
  getSelfOffertsHandler,
  getOffertsHandler,
  getSpecificOffertHandler,
  buyOffertHandler,
  getBoughtOffertsHandler,
  closeOffertHandler
} from "./controller";

const offertRoute = t.router({
  createOffert:
    authedProcedure
      .input(z.object({
        title: z.string(),
        image: z.string(),
        description: z.string().max(1500, "description too long"),
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
        condition: z.string().array(),
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
      }),
  getSpecificOffert:
    procedure
      .input(z.object({
        id: z.string()
      }))
      .query(async ({ ctx, input }) => {
        const offert = await getSpecificOffertHandler({ offertId: input.id, ctx });
        return {
          status: "success",
          offert
        }
      }),
  buyOffert:
    authedProcedure
      .input(z.string())
      .mutation(async ({ ctx, input }) => {
        const result = await buyOffertHandler({ offertId: input, ctx });
        return {
          status: "success",
          result
        };
      }),
  getBoughtOfferts:
    authedProcedure
      .query(async ({ ctx }) => {
        const offerts = await getBoughtOffertsHandler(ctx);
        console.log(offerts)
        return {
          status: "success",
          offerts
        }
      }),
  closeOffert:
    authedProcedure
      .input(z.object({
        offertId: z.string()
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await closeOffertHandler({
          ctx,
          offertId: input.offertId,
        })
        return {
          status: "success",
          result
        }
      }),
})


export default offertRoute;