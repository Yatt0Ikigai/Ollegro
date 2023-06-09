import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { NormalizedInput } from "globalCompontents";
import { trpc } from "utils/trpc";

import JSCookies from "js-cookie"
import "./LoginPage.scss";
import {getErrorToast} from "../../../../utils/ToastsProvider";
import {ToastContainer} from "react-toastify";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    let emailRef = useRef<HTMLInputElement | null>(null);
    let passwordRef = useRef<HTMLInputElement | null>(null);


    const login = trpc.auth.login.useMutation({
        onSuccess: (e) => {
            JSCookies.set("logged_in", "true");
            navigate('/');
        },
        onError: (e) => {
           // if(e.data && e.data.httpStatus === 401)
               getErrorToast("Invalid email or password")
            // else getErrorToast("Fill out all required fields")
        },
    });

    return (
        <div className="container">
            <Navbar />
            <div className="login-container">
                <div className="login__grid">
                    <div className="login__box">
                        <h2 className="login__header">Log in</h2>
                        <form className="login__form"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if ((!emailRef.current || emailRef.current?.value === '')
                                || (!passwordRef.current || passwordRef.current?.value === '')) {
                                    getErrorToast('Fill out all required fields')
                                    return;
                                }
                                login.mutate({
                                    email: emailRef.current.value,
                                    password: passwordRef.current.value
                                })
                            }}>
                            <NormalizedInput
                                placeholder="Email"
                                ref={emailRef}
                            />
                            <NormalizedInput
                                placeholder="Password"
                                ref={passwordRef}
                                showValue={false}
                            />

                            <button type="submit" className="submit-button"> Log in </button>
                        </form>
                    </div>

                    <div className="login__box login__box-fill">

                    </div>

                    <div className="login__box">
                        <span className="login__form-register-text">Don't have accout? <Link to={"/register"} className="link">Create accout</Link></span>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};
