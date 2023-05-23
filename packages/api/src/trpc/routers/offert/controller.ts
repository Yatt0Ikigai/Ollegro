import { Context } from '../../root';
import { createOffert, getOfferts } from '../../utils/offertUtil';

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
        ...(input.title ? { title: { contains: input.title, mode: "insensitive"} } : {})
    }, {
        id: true,
        createdAt: true,
        price: true,
        title: true,
        images: true
    })
    return offerts;
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
