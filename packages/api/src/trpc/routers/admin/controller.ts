import { TRPCError } from "@trpc/server";
import { getCathegory, createCathegory } from "../../utils/cathegoryUtils"

export const addCathegoryController = async ({ cathegoryName }: { cathegoryName: string }) => {
    const name = cathegoryName.charAt(0).toUpperCase() + cathegoryName.slice(1).toLowerCase();
    const cathegoryAlreadyExists = await getCathegory({ name });
    if (cathegoryAlreadyExists) {
        throw new TRPCError({ 
            code: "CONFLICT",
            message:"Cathegory already exists"
        });
    }
    const newCathegory = await createCathegory({name});
    return {
        status: "SUCCESS",
    }
}