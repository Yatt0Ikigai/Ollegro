import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components";

import "./RegisterPage.scss";
import { NormalizedInput } from "globalCompontents";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { trpc } from "utils/trpc";

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
                            if (emailRef.current === null || emailRef.current.value === '') return;
                            if (passwordRef.current === null || passwordRef.current.value === '') return;
                            if (firstNameRef.current === null || firstNameRef.current.value === '') return;
                            if (lastNameRef.current === null || lastNameRef.current.value === '') return;
                            if (overEighteenRef.current === null || !overEighteenRef.current.checked) return;
                            if (agreedTermsRef.current === null || !agreedTermsRef.current.checked) return;

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
                                <label htmlFor="form-terms&conditions"> *I declate that I have read and accept <Link to={"/statute"} className="link">the Ollegro Terms & Conditions.</Link></label>
                            </span>
                        </div>
                        <button className="submit-button">
                            Create An Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
