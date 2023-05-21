import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarGlobalComponent } from "globalCompontents"
import Cookies from "js-cookie";

import "./BoughtProductCard.scss";

export const BoughtProductsPage: React.FC = () => {
  const [offertAmount, setOffertAmount] = useState(27);
  const [currentlyLoadedAmount, setCurrentlyLoadedAmount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("logged_in") !== "true") navigate('/')
  }, [])

  return (
    <div className="container">
      <NavbarGlobalComponent />
      <div className="content content-narrow util-center-second-axis">
        <div className="bought-products__header">
          My Shoppings
        </div>
        {
          [...Array(currentlyLoadedAmount)].map((e) => {
            return (
              <BoughtProductCard
                author="Jan"
                date="12 maj 2023, 13:10"
                id="1234567890"
                imgSource={examplePic}
                price={20.02}
                title="Kaczka kwa kwa"
              />
            )
          })
        }
        {
          currentlyLoadedAmount === offertAmount ?
            <span className="bought-product-card__button">
              u dont have more offerts
            </span>
            :
            <button className="bought-product-card__button" onClick={() => {
              setCurrentlyLoadedAmount(currentlyLoadedAmount + 5 > offertAmount ? offertAmount : currentlyLoadedAmount + 5)
            }}>
              Load More
            </button>
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
  date
}: {
  imgSource: string,
  price: number,
  author: string,
  title: string,
  id: string,
  date: string
}) => {
  return (
    <div className="white-box bought-product-card util-w-full">
      <div>
        <div className="bought-product-card__header-date">{date}</div>
        <div className="bought-product-card__header-author">
          From {author}
        </div>
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
      </div>
    </div>
  )
}



const examplePic = "https://www.shutterstock.com/image-illustration/cute-yellow-rubber-duck-toy-260nw-1359388691.jpg"