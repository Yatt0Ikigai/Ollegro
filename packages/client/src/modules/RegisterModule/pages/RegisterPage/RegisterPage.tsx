import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components";

import "./RegisterPage.scss";
import { NormalizedInput } from "globalCompontents";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { trpc } from "utils/trpc";
import {getErrorToast} from "../../../../utils/ToastsProvider";
import {ToastContainer} from "react-toastify";

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    let emailRef = useRef<HTMLInputElement | null>(null);
    let passwordRef = useRef<HTMLInputElement | null>(null);
    let firstNameRef = useRef<HTMLInputElement | null>(null);
    let lastNameRef = useRef<HTMLInputElement | null>(null);
    let overEighteenRef = useRef<HTMLInputElement | null>(null);
    let agreedTermsRef = useRef<HTMLInputElement | null>(null);

    const createAccount = trpc.auth.register.useMutation({
        onSuccess: (e) => {
            navigate('/')
        },
        onError: (error) => {
            getErrorToast('Unable to create account at the moment. Please try later.')
        }
    });

    return (
        <div className="container">
            <Navbar />
            <div className="register-container">
                <h2 className="register-header">Create Account</h2>
                <div className="register__box">
                    <form action="" className="register__form"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if ((emailRef.current === null || emailRef.current.value === '')
                            || (passwordRef.current === null || passwordRef.current.value === '')
                            || (firstNameRef.current === null || firstNameRef.current.value === '')
                            || (lastNameRef.current === null || lastNameRef.current.value === '')
                            || (overEighteenRef.current === null || !overEighteenRef.current.checked)
                            || (agreedTermsRef.current === null || !agreedTermsRef.current.checked)) {
                                getErrorToast('Fill out all required fields')
                                return;
                            }

                            createAccount.mutate({
                                email: emailRef.current.value,
                                password: passwordRef.current.value,
                                firstName: firstNameRef.current.value,
                                lastName: lastNameRef.current.value
                            })
                        }}>
                        <div className="register__form-row">
                            <h3 className="register__form-row-header">1. Registration details</h3>
                            <NormalizedInput placeholder="email" ref={emailRef} />
                            <NormalizedInput placeholder="first name" ref={firstNameRef} />
                            <NormalizedInput placeholder="last name" ref={lastNameRef} />
                            <NormalizedInput placeholder="password" ref={passwordRef} showValue={false}/>
                        </div>
                        <div className="register__form-row">
                            <h3 className="register__form-row-header">2. Your age</h3>
                            <span className="register__form-row-description">To use site you must be above 18</span>
                            <span>
                                <input type="checkbox" ref={overEighteenRef} id="form-terms&age" className="register__form-row-checkbox" />
                                <label htmlFor="form-terms&conditions"> *I declare that I am at least 18 years old</label>
                            </span>
                        </div>
                        <div className="register__form-row">
                            <h3 className="register__form-row-header">3. Consents and declarations</h3>
                            <span>
                                <input type="checkbox" ref={agreedTermsRef} id="form-terms&conditions" className="register__form-row-checkbox" />
                                <label htmlFor="form-terms&conditions"> *I declate that I have read and accept <Link to={"https://docs.google.com/document/d/1_1WsGHzUw6JuzB-8xvfWxBdHA0xVWCd5N0COEC78cI4/edit?usp=sharing"} className="link">the Ollegro Terms & Conditions.</Link></label>
                            </span>
                        </div>
                        <button className="submit-button" type="submit">
                            Create An Account
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};
