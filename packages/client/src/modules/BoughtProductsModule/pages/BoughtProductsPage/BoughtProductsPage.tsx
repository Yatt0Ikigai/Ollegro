import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {NavbarGlobalComponent} from "globalCompontents"
import Cookies from "js-cookie";
import moment from "moment";

import {trpc} from "utils/trpc";

import "./BoughtProductCard.scss";
import {ToastContainer} from "react-toastify";

export const BoughtProductsPage: React.FC = () => {
    const {data} = trpc.offert.getBoughtOfferts.useQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("logged_in") !== "true") navigate('/')
    }, [])

    return (
        <div className="container">
            <NavbarGlobalComponent/>
            <div className="content content-narrow util-center-second-axis">
                <div className="bought-products__header">
                    My Shoppings
                </div>
                {
                  (data?.offerts && data.offerts.length !== 0) ? (
                        data?.offerts && data?.offerts.map((offert) => {
                            return (
                                <BoughtProductCard
                                    author={offert.ownerName}
                                    boughtDate={offert.boughtAt as string}
                                    id={offert.id}
                                    imgSource={offert.images[0]}
                                    price={offert.price}
                                    title={offert.title}
                                />
                            )
                        })
                    ) : (
                        <h4>No products purchased yet</h4>
                    )
                }
            </div>
        </div>
    );
};


const BoughtProductCard = ({
                               imgSource,
                               author,
                               id,
                               price,
                               title,
                               boughtDate
                           }: {
    imgSource: string,
    price: number,
    author: string,
    title: string,
    id: string,
    boughtDate: string,
}) => {
    return (
        <div className="white-box bought-product-card util-w-full">
            <div>
                <div className="bought-product-card__header-date">{moment(boughtDate).format("MMM DD YYYY")}</div>
                <div className="bought-product-card__header-author">
                    From {author}
                </div>
            </div>
            <div className="util-flex util-gap-xl">
                <div className="bought-product-card__image">
                    <img src={imgSource} alt="" className='util-w-full utill-h-full util-fit-cover'/>
                </div>
                <div className="util-flex-grow">
                    <Link to={`/offert/${id}`} className="link">
                        {title}
                    </Link>
                </div>
                <div className="bought-product-card__price">
                    {price} zł
                </div>
            </div>
        </div>
    )
}


