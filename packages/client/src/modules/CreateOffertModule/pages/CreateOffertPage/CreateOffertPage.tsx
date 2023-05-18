import React, { useEffect, useState } from "react";
import { BsShieldCheck, BsPerson } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

import { NavbarGlobalComponent, NormalizedInput, NormalizedInputNumber } from "globalCompontents"

import "./CreateOffertPage.scss"

export const CreateOffertPage: React.FC = () => {
    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content content-narrow">
                <form action="" className="white-box" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <NormalizedInput placeholder="Name" />
                    <input type="file" />
                    <textarea className="form__description normalized-input__input"/>
                    <NormalizedInputNumber placeholder="price" />
                    <fieldset className="form__fieldset">
                        <legend>Select a condition</legend>
                        <div className="util-flex util-gap-md">
                            <input type="radio" id="new" name="condition" value="new"
                                checked />
                            <label htmlFor="new" className="util-w-full">New</label>
                        </div>
                        <div className="util-flex util-gap-md">
                            <input type="radio" id="used" name="condition" value="used" />
                            <label htmlFor="used" className="util-w-full">Used</label>
                        </div>
                    </fieldset>
                    <button className="submit-button">
                        Post offert
                    </button>
                </form>
            </div>
        </div>
    )
}