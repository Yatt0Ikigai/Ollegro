import { TRPCError } from '@trpc/server';
import { Context } from '../../root';
import { createOffert, getOfferts, getOffert, updateOffert } from '../../utils/offertUtil';
import { getUser, updateUser } from '../../utils/userUtil';

export const createOffertHandler = async (input: createOffertInterface, ctx: Context) => {
    const offert = await createOffert({
        ownerId: ctx.user?.id,
        description: input.description,
        price: Number(input.price.toFixed(2)),
        title: input.title,
        images: input.image,
        cathegoryId: input.cathegoryId
    })

    return offert;
}

export const getSelfOffertsHandler = async (ctx: Context) => {
    const offerts = await getOfferts({
        ownerId: ctx.user?.id
    })
    return offerts;
}

export const getOffertsHandler = async ({ input, ctx }: {
    input: Partial<searchOffertInterface>,
    ctx: Context
}) => {
    const offerts = await getOfferts({
        closed: false,
        price: {
            ...(input.minPrice ? { gte: input.minPrice } : {}),
            ...(input.maxPrice ? { lte: input.maxPrice } : {})
        },
        ...(input.cathegoryId ? { cathegoryId: input.cathegoryId } : {}),
        ...(input.condition ? { condition: input.condition } : {}),
        ...(input.title ? { title: { contains: input.title, mode: "insensitive" } } : {})
    }, {
        id: true,
        createdAt: true,
        price: true,
        title: true,
        images: true
    })
    return offerts;
}

export const getSpecificOffertHandler = async ({
    offertId,
    ctx
}: {
    offertId: string,
    ctx: Context
}) => {
    const offert = await getOffert({ id: offertId }, {
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

    return {
        ...offert,
        isOwner: offert.ownerId === ctx.user?.id
    }
}

export const buyOffertHandler = async ({ ctx, offertId }: {
    ctx: Context,
    offertId: string
}) => {
    const userId = ctx.user?.id as string;
    const user = await getUser({ id: userId }, {
        ballance: true
    });

    const offert = await getOffert({ id: offertId }, {
        closed: true,
        ownerId: true,
        price: true
    });

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


    await updateUser({
        id: ctx.user?.id
    }, {
        ballance: {
            decrement: offert.price
        },
        boughtOfferts: {
            push: offertId
        }
    });

    await updateOffert({
        id: offertId
    }, {
        closed: true,
        buyerId: userId,
        createdAt: new Date().toISOString()
    });

    await updateUser({
        id: offert.ownerId
    },{
        ballance: {
            increment: offert.price
        }
    })

    return offert;
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
    condition: string,
    minPrice: number,
    maxPrice: number,
    cathegoryId: string
}
