import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { NormalizedInput } from "globalCompontents";

import "./LoginPage.scss";
import { Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
    let emailRef = useRef<HTMLInputElement | null>(null);
    let passwordRef = useRef<HTMLInputElement | null>(null);


    return (
        <div className="container">
            <Navbar />
            <div className="login-container">
                <div className="login__grid">
                    <div className="login__box">
                        <h2 className="login__header">Log in</h2>
                        <form className="login__form">
                            <NormalizedInput
                                placeholder="Email"
                                ref={emailRef}
                            />
                            <NormalizedInput
                                placeholder="Password"
                                ref={passwordRef}
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
        </div>
    );
};
