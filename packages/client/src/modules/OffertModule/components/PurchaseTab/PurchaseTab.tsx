import React from 'react'
import {useNavigate} from 'react-router-dom'
import {trpc} from 'utils/trpc'
import {toast} from "react-toastify";

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
            toast.error('Payment did not come through due to: ' + error.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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