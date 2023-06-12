import { TRPCError } from "@trpc/server";

export const validateCatch = (err: any) => {
    if (err instanceof TRPCError) throw new TRPCError(err);   
    else throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR"
    })
}
