import { TRPCError } from "@trpc/server";
import { getCathegory, createCathegory } from "../../utils/cathegoryUtils"
import { getOffert, updateOffert } from "../../utils/offertUtil"
import { validateCatch } from "../../utils/catch";

export const addCathegoryController = async ({ cathegoryName }: { cathegoryName: string }) => {
    try {
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
            status: "success",
            newCathegory
        }
    } catch (err) { validateCatch(err) }
}

export const deleteOffertHandler = async ({ offertId }: { offertId: string }) => {
    try {
        const offert = await updateOffert({ id: offertId }, {
            closed: true,
            title: `Violetion of rules`,
            description: `Deleted offert - ${offertId}`,
            images: [deletedPhoto],
            boughtAt: new Date().toISOString()
        })

        if (!offert) throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Offert not found"
        })
        return {
            status: 'success'
        }
    } catch (err) { validateCatch(err) }
}

const deletedPhoto = "https://www.shutterstock.com/image-vector/grunge-rubber-stamp-word-deletedvector-260nw-167419760.jpg"