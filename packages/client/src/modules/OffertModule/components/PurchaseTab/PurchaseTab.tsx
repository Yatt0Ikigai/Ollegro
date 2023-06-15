import React from 'react'
import {useNavigate} from 'react-router-dom'
import {trpc} from 'utils/trpc'
import {toast} from "react-toastify";
import {getErrorToast} from "../../../../utils/ToastsProvider";

export function PurchaseTab({
                                price,
                                isOwner,
                                closed,
                                title,
                                id
                            }: {
    price: number,
    isOwner: boolean,
    closed: boolean,
    title: string,
    id: string
}) {
    const navigate = useNavigate();
    const buyOffert = trpc.offert.buyOffert.useMutation({
        onSuccess: (e) => {
            navigate("/my-ollegro/bought-products")
        },
        onError: (error) => {
            getErrorToast('Payment did not come through due to: ' + error)
        }
    })

    return (
        <div className='white-box'>
            <h4 className='header header-xl'>
                {title}
            </h4>
            <span className='header header-md'>PLN {price}</span>
            <button className='submit-button' disabled={closed || isOwner} onClick={(e) => {
                buyOffert.mutate(id);
            }}>Buy Now
            </button>
            <span>After clicking BUY NOW your bank account will be debited.</span>
        </div>
    )
}