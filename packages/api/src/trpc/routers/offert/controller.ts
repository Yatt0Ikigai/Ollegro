import { Context } from '../../root';
import { createOffert, getOfferts } from '../../utils/offertUtil';

export const createOffertHandler = async (input: createOffertInterface, ctx: Context) => {
    const offert = await createOffert({
        ownerId: ctx.user?.id,
        description: input.description,
        price: Number(input.price.toFixed(2)),
        title: input.title,
        images: input.image,
    })

    return offert;
}

export const getSelfOffertsHandler = async (ctx: Context) => {
    const offerts = await getOfferts({
        ownerId: ctx.user?.id
    })
    return offerts;
}


interface createOffertInterface{
    title: string,
    image: string,
    description?: string,
    price: number,
    condition: string,
}