import React, { useEffect, useRef, useState } from "react";
import { BsShieldCheck, BsPerson } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";

import { trpc } from "utils/trpc";

import { NavbarGlobalComponent, NormalizedInput } from "globalCompontents"
import EmailModal from "../../modals/ChangeEmailModal";
import PasswordModal from "../../modals/ChangePasswordModal";
import FirstNameModal from "../../modals/ChangeFirstNameModal";
import LastNameModal from "../../modals/ChangeLastNameModal";

import "./SettingsPage.scss"

export const GeneralSettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const { data, isLoading } = trpc.user.getInfo.useQuery();
    const deposit = trpc.user.depositMoney.useMutation({
        onSuccess: () => {
            navigate(0);
        }
    })

    const balanceRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (Cookies.get("logged_in") !== "true") navigate('/')
    }, [])
    let [searchParams, setSearchParams] = useSearchParams();

    if (isLoading || data == null) return <>Loading</>

    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content content-narrow">
                <div className="white-box overview-box">
                    <section className="settings-section">
                        <h4 className="header header-md">{data.user.firstName} {data.user.lastName}</h4>
                        <span>{data.user.email}</span>
                    </section>
                    <section className="settings-section">
                        <span>You are with us from</span>
                        <span className="util-text-highlight">{moment(data.user.createdAt).format("MMM DD YYYY ")}</span>
                    </section>
                </div>

                <div className="white-box overview-box util-flex util-center-second-axis">
                    <div className="header header-md ">Current Balance: {data.user.ballance}</div>
                    <form
                        className="util-flex util-end-second-axis util-gap-md"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!balanceRef.current) return;
                            deposit.mutate(Number(balanceRef.current.value));
                        }}>
                        <NormalizedInput placeholder="New Balance" ref={balanceRef} />
                        <button className='submit-button util-h-max'>Add Balance</button>
                    </form>
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
                                <EmailModal />
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
