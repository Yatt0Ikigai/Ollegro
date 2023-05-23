import React, { useEffect, useState } from "react";
import { NavbarGlobalComponent } from "globalCompontents"

import { useSearchParams } from "react-router-dom";

import { ImageTab, DescriptionTab, ParametersTab, PurchaseTab, SeeTab } from "../../components";

import "./OffertPage.scss";

export const OffertPage: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content-wide">
                <div className="offert-box">
                    <div className="util-flex util-flex-column util-gap-xl util-w-full">
                        <ImageTab />
                        <ParametersTab/>
                        <DescriptionTab />
                    </div>
                    <div className="util-flex util-flex-column util-gap-xl">
                        <PurchaseTab/>
                        <SeeTab/>
                    </div>
                </div>
            </div>
        </div>
    );
};
