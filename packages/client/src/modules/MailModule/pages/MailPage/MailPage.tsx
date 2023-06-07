import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { trpc } from "utils/trpc";
import { NavbarGlobalComponent, NormalizedInput, NormalizedInputNumber } from "globalCompontents"

export const MailPage: React.FC = () => {
  const navigate = useNavigate();

  const sendMail = trpc.user.sendMail.useMutation({
    onSuccess: () => {
      navigate("/")
    }
  })

  const subjectRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (Cookies.get("logged_in") !== "true") navigate('/')
  }, [])

  return (
    <div className="container">
      <NavbarGlobalComponent />
      <div className="content content-narrow">
        <h2 className="header header-md">Contact Admin</h2>
        <form action="" className="white-box" onSubmit={(e) => {
          e.preventDefault();
          if( !subjectRef.current || !subjectRef.current.value ) return;
          if( !messageRef.current || !messageRef.current.value ) return;

          sendMail.mutate({
            subject: subjectRef.current?.value,
            message: messageRef.current?.value
          })
        }}>
          <NormalizedInput
            placeholder="Subject"
            ref={subjectRef}
          />
          <textarea
            className="form__description normalized-input__input"
            ref={messageRef} />
          <button className="submit-button" type="submit">
            Send mail
          </button>
        </form>
      </div>
    </div>
  )
}