import React, { useEffect, useRef, useState } from 'react'
import { Portal, ModalContainer } from "globalCompontents"
import { IoMdClose } from "react-icons/io";

import { NormalizedInput } from 'globalCompontents';

import "./Modals.scss";

export default function SettingModal() {
    const [opened, setOpened] = useState(false);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const lastNameConfirmRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        console.log(opened)
    }, [opened]);

    return (
        <div>
            <button onClick={() => { setOpened(!opened) }} className='link util-w-full'>Change Last Name</button>
            {opened &&
                <Portal>
                    <ModalContainer>
                        <div className='modal-header'>
                            <span className='header header-xl'>Change Last Name</span>
                            <button className='modal-header-button' onClick={() => {
                                if (!lastNameRef.current || !lastNameConfirmRef.current) return;
                                lastNameRef.current.value = "";
                                lastNameConfirmRef.current.value = "";
                                setOpened(false);
                            }}>
                                <IoMdClose className='modal-header-icon'/>
                            </button>
                        </div>
                        <form className='modal-box'
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!lastNameRef.current || !lastNameConfirmRef.current) return;
                                if (lastNameConfirmRef.current.value != lastNameRef.current.value) {
                                    alert("Please provide same Password address");
                                    return;
                                }
                                setOpened(false);
                            }}>
                            <NormalizedInput placeholder='New Last Name' ref={lastNameRef} />
                            <NormalizedInput placeholder='New Last Name Confirm' ref={lastNameConfirmRef} />
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
