import React, { useEffect, useRef, useState } from 'react'
import { Portal, ModalContainer } from "globalCompontents"
import { IoMdClose } from "react-icons/io";

import { NormalizedInput } from 'globalCompontents';

import "./Modals.scss";
import { trpc } from 'utils/trpc';
import { useNavigate } from 'react-router-dom';

export default function SettingModal() {
    const [opened, setOpened] = useState(false);
    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const firstNameConfrimRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const changeFirstName = trpc.user.changeFirstName.useMutation({
        onSuccess: (e) => {
            navigate(0);
        }
    })
    
    return (
        <div>
            <button onClick={() => { setOpened(!opened) }} className='link util-w-full'>Change First Name</button>
            {opened &&
                <Portal>
                    <ModalContainer>
                        <div className='modal-header'>
                            <span className='header header-xl'>Change First Name</span>
                            <button className='modal-header-button' onClick={() => {
                                if (!firstNameRef.current || !firstNameConfrimRef.current) return;
                                firstNameRef.current.value = "";
                                firstNameConfrimRef.current.value = "";
                                setOpened(false);
                            }}>
                                <IoMdClose className='modal-header-icon'/>
                            </button>
                        </div>
                        <form className='modal-box'
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!firstNameRef.current || !firstNameConfrimRef.current) return;
                                if (firstNameConfrimRef.current.value != firstNameRef.current.value) {
                                    alert("Please provide same Password address");
                                    return;
                                }
                                changeFirstName.mutate(firstNameRef.current.value);
                                setOpened(false);
                            }}>
                            <NormalizedInput placeholder='New First Name' ref={firstNameRef} />
                            <NormalizedInput placeholder='New First Name Confirm' ref={firstNameConfrimRef} />
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
