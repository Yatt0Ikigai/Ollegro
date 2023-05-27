import React, { useEffect, useState } from "react";
import { NavbarGlobalComponent } from "globalCompontents"

import { useParams, useSearchParams } from "react-router-dom";

import { ImageTab, DescriptionTab, ParametersTab, PurchaseTab, SeeTab } from "../../components";

import "./OffertPage.scss";
import { trpc } from "utils/trpc";

export const OffertPage: React.FC = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { id } = useParams();
    const { data } = trpc.offert.getSpecificOffert.useQuery({
        id: (id as string)
    });

    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content-wide">
                {
                    !!data && <div className="offert-box">
                        <div className="util-flex util-flex-column util-gap-xl util-w-full">
                            <ImageTab imgSrc={data.offert.images[0]} title={data.offert.title} />
                            <ParametersTab condition={data.offert.condition} />
                            <DescriptionTab description={data.offert.description} />
                        </div>
                        <div className="util-flex util-flex-column util-gap-xl">
                            <PurchaseTab id={id as string} price={data.offert.price} closed={data.offert.closed} isOwner={data.offert.isOwner} title={data.offert.title} />
                            <SeeTab />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

interface IOffert {
    id: string;
    title: string;
    description: string;
    price: number;
    condition: string;
    cathegoryId: string;
    isOwner: boolean;
    createdAt: string;
    ownerId: string;
    buyerId: string | null;
    images: string[];
    closed: boolean;
}