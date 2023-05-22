import React, { useEffect, useRef, useState } from 'react'
import { Portal, ModalContainer } from "globalCompontents"
import { IoMdClose } from "react-icons/io";

import { NormalizedInput } from 'globalCompontents';

import "./Modals.scss";
import { useNavigate } from 'react-router-dom';
import { trpc } from 'utils/trpc';

export default function SettingModal() {
    const [opened, setOpened] = useState(false);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const changePassword= trpc.user.changePassword.useMutation({
        onSuccess: (e) => {
            navigate(0);
        }
    })
    
    return (
        <div>
            <button onClick={() => { setOpened(!opened) }} className='link util-w-full'>Change Password</button>
            {opened &&
                <Portal>
                    <ModalContainer>
                        <div className='modal-header'>
                            <span className='header header-xl'>Change Password</span>
                            <button className='modal-header-button' onClick={() => {
                                if (!passwordRef.current || !passwordConfirmRef.current) return;
                                passwordRef.current.value = "";
                                passwordConfirmRef.current.value = "";
                                setOpened(false);
                            }}>
                                <IoMdClose className='modal-header-icon'/>
                            </button>
                        </div>
                        <form className='modal-box'
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!passwordRef.current || !passwordConfirmRef.current) return;
                                if (passwordConfirmRef.current.value != passwordRef.current.value) {
                                    alert("Please provide same Password address");
                                    return;
                                }
                                changePassword.mutate(passwordRef.current.value);
                                setOpened(false);
                            }}>
                            <NormalizedInput placeholder='New Password' ref={passwordRef} />
                            <NormalizedInput placeholder='New Password Confirm' ref={passwordConfirmRef} />
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
