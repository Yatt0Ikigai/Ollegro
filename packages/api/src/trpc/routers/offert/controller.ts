import { TRPCError } from '@trpc/server';

import { Context } from '../../root';
import { createOffert, getOfferts, getOffert, updateOffert } from '../../utils/offertUtil';
import { getUser, updateUser } from '../../utils/userUtil';
import { uploadImage } from "../../firebase"
import { number, string } from 'zod';
import { validateCatch } from "../../utils/catch"



export const createOffertHandler = async (input: createOffertInterface, ctx: Context) => {
    try {
        const link = await uploadImage(input.image);

        const offert = await createOffert({
            ownerId: ctx.user?.id,
            description: input.description,
            price: Number(input.price.toFixed(2)),
            title: input.title,
            images: link,
            cathegoryId: input.cathegoryId,
            condition: input.condition
        });

        return {
            status: "success",
            offert
        };
    } catch (err: any) { validateCatch(err) }

}

export const getSelfOffertsHandler = async (ctx: Context) => {
    try {
        const offerts = await getOfferts({
            ownerId: ctx.user?.id
        })
        return {
            status: "success",
            offerts: offerts.reverse()
        }
    } catch (err: any) { validateCatch(err) }

}

export const getOffertsHandler = async ({ input, ctx }: {
    input: Partial<searchOffertInterface>,
    ctx: Context
}) => {
    try {
        const offerts = await getOfferts({
            closed: false,
            price: {
                ...(input.minPrice ? { gte: input.minPrice } : {}),
                ...(input.maxPrice ? { lte: input.maxPrice } : {})
            },
            ...(input.cathegoryId ? { cathegoryId: input.cathegoryId } : {}),
            ...(input.condition?.length !== 0 ? {
                condition: {
                    in: input.condition
                }
            } : {}),
            ...(input.title ? { title: { contains: input.title, mode: "insensitive" } } : {})
        }, {
            id: true,
            createdAt: true,
            price: true,
            title: true,
            images: true,
            ownerId: true,
            condition: true
        })

        const processedOfferts = await Promise.all(offerts.map(async (e) => {
            const owner = await getUser({ id: e.ownerId }, {
                firstName: true,
                lastName: true
            })
            return {
                ...e,
                ownerName: owner.firstName + " " + owner.lastName
            }
        }));

        return {
            status: "success",
            offerts: processedOfferts
        }
    } catch (err: any) { validateCatch(err) }
}

export const getSpecificOffertHandler = async ({
    offertId,
    ctx
}: {
    offertId: string,
    ctx: Context
}) => {
    try {
        const offert = await getOffert({id: offertId}, {
            id: true,
            cathegoryId: true,
            closed: true,
            description: true,
            images: true,
            price: true,
            title: true,
            condition: true,
            ownerId: true
        });

        const owner = await getUser({
            id: offert.ownerId
        }, {
            email: true
        });

        if (!offert) throw new TRPCError({code: "NOT_FOUND"})

        return {
            status: "success",
            offert: {
                ...offert,
                isOwner: offert.ownerId === ctx.user?.id,
                ownerEmail: owner.email
            }
        }
    } catch (err: any) { validateCatch(err) }

} 

export const buyOffertHandler = async ({ ctx, offertId }: {
    ctx: Context,
    offertId: string
}) => {
    try {
        const userId = ctx.user?.id as string;
        const user = await getUser({ id: userId }, { ballance: true });
        const offert = await getOffert({ id: offertId }, {
            closed: true,
            ownerId: true,
            price: true
        });


        if (!offert) throw new TRPCError({
            code: "CONFLICT",
            message: "Offert not found"
        })
        if (offert.closed) throw new TRPCError({
            code: 'CONFLICT',
            message: 'Offert already closed',
        });
        if (offert.price > user.ballance) throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Not enough money to buy',
        });
        if (offert.ownerId === userId) if (offert.price >= user.ballance) throw new TRPCError({
            code: 'FORBIDDEN',
            message: "You can't buy your offert",
        });


        await updateUser({ id: ctx.user?.id }, {
            ballance: { decrement: offert.price },
            boughtOfferts: { push: offertId }
        });
        await updateOffert({ id: offertId }, {
            closed: true,
            buyerId: userId,
            boughtAt: new Date().toISOString()
        });
        await updateUser({ id: offert.ownerId }, { ballance: { increment: offert.price } })


        return {
            status: "success",
            boughtOffertId: offert.id
        };

    } catch (err: any) { validateCatch(err) }
}

export const getBoughtOffertsHandler = async (ctx: Context) => {
    try {
        const user = await getUser({ id: ctx.user?.id as string }, { boughtOfferts: true });
        const offerts = await Promise.all(
            user.boughtOfferts.map(async (offertId) => {
                const offert = await getOffert({ id: offertId }, {
                    id: true,
                    ownerId: true,
                    images: true,
                    price: true,
                    title: true,
                    boughtAt: true
                });
                const owner = await getUser({ id: offert.ownerId }, {
                    firstName: true,
                    lastName: true
                })
                return {
                    ...offert,
                    ownerName: owner.firstName + ' ' + owner.lastName
                }
            }))
        return {
            status: "success",
            offerts
        }
    }
    catch (err: any) { validateCatch(err) }
};

export const closeOffertHandler = async ({ ctx, offertId }: {
    ctx: Context,
    offertId: string
}) => {
    try {
        const offert = await getOffert({ id: offertId });
        if (offert.ownerId !== ctx.user?.id) throw new TRPCError({ code: "FORBIDDEN", message: "You can't close other people offert" });
        const changedOffert = await updateOffert({ id: offertId }, {
            closed: true,
            boughtAt: new Date().toISOString()
        });
        return changedOffert;
    } catch (err: any) { validateCatch(err) }
}

export const changeOffertPriceHandler = async ({ ctx, input }: {
    ctx: Context,
    input: {
        offertId: string,
        newPrice: number
    }
}) => {
    try {
        const offert = await getOffert({ id: input.offertId });
        if (offert.closed) throw new TRPCError({ code: "FORBIDDEN", message: "You can't change price after offert was closed" });
        if (offert.ownerId != ctx.user?.id) throw new TRPCError({ code: "FORBIDDEN", message: "You can't change other people offert" });
        const updatedOffert = await updateOffert({ id: input.offertId }, { price: input.newPrice });
        return {
            status: "success",
            offert: updatedOffert
        };
    } catch (err: any) { validateCatch(err) }
}

interface createOffertInterface {
    title: string,
    image: string,
    description?: string,
    price: number,
    condition: string,
    cathegoryId: string
}

interface searchOffertInterface {
    title: string,
    price: number,
    condition: string[],
    minPrice: number,
    maxPrice: number,
    cathegoryId: string
}
