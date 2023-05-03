import React, { useEffect, useState } from "react";
import { NavbarGlobalComponent, OffertRoll } from "globalCompontents"

import InformationTab from "../../compontents/InformationTab/InformationTab";

import "./HomePage.scss";


export const HomePage: React.FC = () => {
    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content">
                <OffertRoll />
                <InformationTab/>
            </div>
        </div>
    );
};
