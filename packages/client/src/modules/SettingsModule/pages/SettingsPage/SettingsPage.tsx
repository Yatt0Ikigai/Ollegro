import React, { useEffect, useState } from "react";
import { BsShieldCheck, BsPerson } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

import { NavbarGlobalComponent } from "globalCompontents"
import SettingModal from "../../modals/ChangeEmailModal";
import PasswordModal from "../../modals/ChangePasswordModal";
import FirstNameModal from "../../modals/ChangeFirstNameModal";
import LastNameModal from "../../modals/ChangeLastNameModal";

import "./SettingsPage.scss"

export const GeneralSettingsPage: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content content-narrow">
                <div className="white-box overview-box">
                    <section className="settings-section">
                        <h4 className="header header-md">Hello Jonas</h4>
                        <span>RandomMail@gmail.com</span>
                    </section>
                    <section className="settings-section">
                        <span>You are with us for </span>
                        <span className="util-text-highlight">2 years, 2 monts and 7 days</span>
                    </section>
                </div>


                <div className="util-grid util-grid-cols-2 util-gap-xl">
                    <div className="white-box settings-box">
                        <div className="settings-section">
                            <div className="util-h-full">
                                <BsShieldCheck className="settings-icon" />
                            </div>
                        </div>
                        <div className="settings-section">
                            <span className="util-w-full util-text-center"> Safety </span>
                            <div className="util-text-highlight util-flex util-flex-column">
                                <SettingModal />
                                <PasswordModal />
                            </div>
                        </div>
                    </div>

                    <div className="white-box settings-box">
                        <div className="settings-section">
                            <div className="util-h-full">
                                <BsPerson className="settings-icon" />
                            </div>
                        </div>
                        <div className="settings-section">
                            <span className="util-w-full util-text-center"> Credentials </span>
                            <div className="util-text-highlight util-flex util-flex-column">
                                <FirstNameModal />
                                <LastNameModal />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
