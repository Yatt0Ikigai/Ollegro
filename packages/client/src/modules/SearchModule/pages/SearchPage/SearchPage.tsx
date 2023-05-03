import React, { useEffect, useState } from "react";
import { NavbarGlobalComponent } from "globalCompontents"

import { useSearchParams } from "react-router-dom";

import "./SearchPage.scss";
import { FilterTab, OffertTab } from "../../components";

export const SearchPage: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content">
                <h3 className="search-header">You searched for „{searchParams.get("string")}”</h3>
                <div className="search-box">
                    <FilterTab/>
                    <OffertTab/>
                </div>
            </div>
        </div>
    );
};
