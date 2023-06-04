import React, { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import moment from 'moment';

import "./MyOffertsPage.scss";
import { NavbarGlobalComponent } from 'globalCompontents';
import { trpc } from 'utils/trpc';


export function MyOffertsPage() {
    const navigate = useNavigate();
    const { data } = trpc.offert.getSelfOfferts.useQuery();
    useEffect(() => {
        if (Cookies.get("logged_in") !== "true") navigate('/')
    }, []);

    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content content-narrow util-gap-md">
                <Link className='link util-w-max util-center-second-axis' to={'/my-ollegro/create-offert'}>
                    Create Offert
                </Link>
                {
                    data?.offerts.length === 0 ?? "You dont have any offerts"
                }
                {
                    data?.offerts.map((e) => {
                        return (
                            <MyOffertCard
                                createdDate={e.createdAt}
                                boughtDate={e.boughtAt}
                                id={e.id}
                                imgSource={e.images[0]}
                                price={e.price}
                                title={e.title}
                                closed={e.closed}
                                key={`my-offert-${e.id}`}
                                buyerId={e.buyerId}
                            />
                        )
                    })}
            </div>
        </div>
    )
}




const MyOffertCard = ({
    imgSource,
    id,
    price,
    title,
    createdDate,
    boughtDate,
    closed,
    buyerId
}: {
    imgSource: string,
    price: number,
    title: string,
    id: string,
    createdDate: string,
    closed: boolean,
    boughtDate: string | null,
    buyerId: string | null
}) => {
    const navigate = useNavigate();
    const closeOffert = trpc.offert.closeOffert.useMutation({
        onSuccess: () => {
            navigate(0);
        }
    })

    return (
        <div className="white-box bought-product-card util-w-full" >
            <div className='util-flex util-spacebetween-main-axis'>
                <div className="bought-product-card__header-date">Created {moment(createdDate).format("MMM DD YYYY")}</div>
                {buyerId && <div className="bought-product-card__header-date">Ended {moment(boughtDate).format("MMM DD YYYY")}</div>}
                {!buyerId && boughtDate && <div className="bought-product-card__header-date">Closed {moment(boughtDate).format("MMM DD YYYY")}</div>}
                {!closed && <button className='link' onClick={(e) => {
                    closeOffert.mutate({ offertId: id });
                }}>Close Offert</button>}
            </div>
            <div className="util-flex util-gap-xl">
                <div className="bought-product-card__image">
                    <img src={imgSource} alt="" className='util-w-full utill-h-full util-fit-cover' />
                </div>
                <div className="util-flex-grow">
                    <Link to={`/offert/${id}`} className="link">
                        {title}
                    </Link>
                </div>
                <div className="bought-product-card__price">
                    {price} zł
                </div>
                <button className='submit-button util-h-max' disabled={closed} onClick={(e) => {
                    {/* TODO */ }
                }}>Change Price</button>
            </div>
        </div>
    )
}




