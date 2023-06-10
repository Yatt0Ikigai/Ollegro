import React, { useEffect, useRef, useState } from 'react'
import { Portal, ModalContainer, NormalizedInputNumber } from "globalCompontents"
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { trpc } from 'utils/trpc';
import "./Modals.scss";

export default function ChangePriceModal({ disabled, offertId }: { disabled: boolean, offertId: string }) {
    const [open, setOpen] = useState(false);
    const newPriceRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const changePrice = trpc.offert.changeOffertPrice.useMutation({
        onSuccess: (e) => {
            navigate(`/offert/${offertId}`);
        }
    })

    return (
        <div>
            <button disabled={disabled} onClick={() => { setOpen(!open) }} className='submit-button util-h-max'>Change Price</button>
            {open &&
                <Portal>
                    <ModalContainer>
                        <div className='modal-header'>
                            <span className='header header-xl'>Change Price</span>
                            <button className='modal-header-button' onClick={() => {
                                if (!newPriceRef.current) return;
                                newPriceRef.current.value = "";
                                setOpen(false);
                            }}>
                                <IoMdClose className='modal-header-icon' />
                            </button>
                        </div>
                        <form className='modal-box'
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!newPriceRef.current || Number(newPriceRef.current.value) <= 0) return;
                                changePrice.mutate({
                                    offertId,
                                    newPrice: Number(newPriceRef.current.value)
                                })
                            }}>
                            <NormalizedInputNumber placeholder='New Price' ref={newPriceRef} />
                            <button className='submit-button'>
                                Submit
                            </button>
                        </form>
                    </ModalContainer>
                </Portal>
            }
        </div>
    )
}
