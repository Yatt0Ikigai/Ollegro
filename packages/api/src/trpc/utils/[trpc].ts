import { Context } from '../root';
import { initTRPC, TRPCError } from '@trpc/server';

export const t = initTRPC.context<Context>().create()

export const Authed = t.middleware(async ({ ctx, next }) => {
    if (ctx.user) return next();
    throw new TRPCError({ code: "UNAUTHORIZED" })
})

export const unAuthed = t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) return next();
    throw new TRPCError({ code: "BAD_REQUEST" })
})

export const adminMiddleware = t.middleware(async ({ ctx, next }) => {
    if (ctx.user?.role === "admin") return next();
    throw new TRPCError({ code: "FORBIDDEN" })
})

export const procedure = t.procedure;
export const authedProcedure = t.procedure.use(Authed);
export const unauthedProcedure = t.procedure.use(unAuthed);
export const adminProcedure = t.procedure.use(adminMiddleware);


