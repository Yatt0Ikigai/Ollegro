import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components";

import "./RegisterPage.scss";
import { NormalizedInput } from "globalCompontents";
import { Link } from "react-router-dom";

export const RegisterPage: React.FC = () => {
    let emailRef = useRef<HTMLInputElement | null>(null);
    let passwordRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="container">
            <Navbar />
            <div className="register-container">
                <h2 className="register-header">Create Account</h2>
                <div className="register__box">
                    <form action="" className="register__form">
                        <div className="register__form-row">
                            <h3 className="register__form-row-header">1. Registration details</h3>
                            <NormalizedInput placeholder="email" ref={emailRef} />
                            <NormalizedInput placeholder="password" ref={passwordRef} />
                        </div>
                        <div className="register__form-row">
                            <h3 className="register__form-row-header">2. Your age</h3>
                            <span className="register__form-row-description">We need from you exact date of birth</span>
                            <input type="date" />
                            {/* Later change to React date picker*/}
                        </div>
                        <div className="register__form-row">
                            <h3 className="register__form-row-header">3. Consents and declarations</h3>
                            <span>
                                <input type="checkbox" id="form-terms&conditions" className="register__form-row-checkbox" />
                                <label htmlFor="form-terms&conditions">* I declate that I have read and accept <Link to={"/statute"} className="link">the Ollegro Terms & Conditions.</Link></label>
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
