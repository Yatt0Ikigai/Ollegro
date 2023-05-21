import React, { useEffect } from 'react'

import "./MyOffertsPage.scss";
import { NavbarGlobalComponent } from 'globalCompontents';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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
            <div className="content-wide">
                <div className='white-box'>
                    <Link className='link util-w-max util-center-second-axis' to={'/my-ollegro/create-offert'}>
                        Create Offert
                    </Link>
                    {
                        data?.offerts.length === 0 ?? "You dont have any offerts"
                    }
                    {
                        data?.offerts.map((e) => {
                            return (
                                <BoughtProductCard
                                    date="12 maj 2023, 13:10"
                                    id={e.id}
                                    imgSource={e.images[0]}
                                    price={e.price}
                                    title={e.title}
                                />
                            )
                        })}
                </div>
            </div>
        </div>
    )
}



const BoughtProductCard = ({
    imgSource,
    id,
    price,
    title,
    date
}: {
    imgSource: string,
    price: number,
    title: string,
    id: string,
    date: string
}) => {
    return (
        <div className="util-w-full my-offert__card">
            <div className="util-flex util-gap-xl">
                <div className="bought-product-card__image">
                    <img src={imgSource} alt="" className='util-w-full utill-h-full util-fit-cover' />
                </div>
                <div className="util-flex-grow">
                    <Link to={`/offert/${id}`} className="link">
                        {title}
                    </Link>
                </div>
                <button className='submit-button util-h-max'>
                    Change Price
                </button>
                <div className="bought-product-card__price">
                    {price} zł
                </div>
            </div>
        </div>
    )
}



const examplePic = "https://www.shutterstock.com/image-illustration/cute-yellow-rubber-duck-toy-260nw-1359388691.jpg"