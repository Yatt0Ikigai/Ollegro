import React, { useEffect, useRef, useState } from 'react'
import { Portal, ModalContainer } from "globalCompontents"
import { IoMdClose } from "react-icons/io";

import { NormalizedInput } from 'globalCompontents';
import { trpc } from 'utils/trpc';

import "./Modals.scss";
import { useNavigate } from 'react-router-dom';

export default function SettingModal() {
    const [open, setOpen] = useState(false);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const emailConfirmRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const changeEmail = trpc.user.changeEmail.useMutation({
        onSuccess: (e) => {
            navigate(0);
        },
        onError: (e) => {
            alert(e.data?.code);
        }
    })

    return (
        <div>
            <button onClick={() => { setOpen(!open) }} className='link util-w-full'>Change Email</button>
            {open &&
                <Portal>
                    <ModalContainer>
                        <div className='modal-header'>
                            <span className='header header-xl'>Change Email</span>
                            <button className='modal-header-button' onClick={() => {
                                if (!emailRef.current || !emailConfirmRef.current) return;
                                emailRef.current.value = "";
                                emailConfirmRef.current.value = "";
                                setOpen(false);
                            }}>
                                <IoMdClose className='modal-header-icon'/>
                            </button>
                        </div>
                        <form className='modal-box'
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!emailRef.current || !emailConfirmRef.current) return;
                                if (emailConfirmRef.current.value != emailRef.current.value) {
                                    alert("Please provide same email address");
                                    return;
                                }
                                changeEmail.mutate(emailRef.current.value);
                                setOpen(false);
                            }}>
                            <NormalizedInput placeholder='New Email' ref={emailRef} />
                            <NormalizedInput placeholder='New Email Confirm' ref={emailConfirmRef} />
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
