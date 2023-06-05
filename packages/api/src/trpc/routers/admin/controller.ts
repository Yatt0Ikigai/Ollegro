import { TRPCError } from "@trpc/server";
import { getCathegory, createCathegory } from "../../utils/cathegoryUtils"
import { getOffert, updateOffert } from "../../utils/offertUtil"

export const addCathegoryController = async ({ cathegoryName }: { cathegoryName: string }) => {
    const name = cathegoryName.charAt(0).toUpperCase() + cathegoryName.slice(1).toLowerCase();
    const cathegoryAlreadyExists = await getCathegory({ name });
    if (cathegoryAlreadyExists) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "Cathegory already exists"
        });
    }
    const newCathegory = await createCathegory({ name });
    return {
        status: "SUCCESS",
    }
}

export const deleteOffertHandler = async ({ offertId }: { offertId: string }) => {
    const offert = await updateOffert({ id: offertId }, {
        closed: true,
        title: `Violetion of rules`,
        description: `Deleted offert - ${offertId}`,
        images: [deletedPhoto],
        boughtAt: new Date().toISOString()
    })

    if (offert) return {
        status: "SUCCESS",
    }
    return new TRPCError({
        code: "BAD_REQUEST",
        message: "Offert not found"
    })
}

const deletedPhoto = "https://www.shutterstock.com/image-vector/grunge-rubber-stamp-word-deletedvector-260nw-167419760.jpg"