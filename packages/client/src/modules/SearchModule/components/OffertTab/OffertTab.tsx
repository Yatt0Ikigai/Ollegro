import React from 'react'
import { Link, useSearchParams, useParams } from 'react-router-dom'

import { trpc } from "../../../../utils/trpc";

import "./OffertTab.scss";

export function OffertTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  let { cathegoryId } = useParams();

  let filters = [['min_price', "minPrice"], ['max_price', "maxPrice"], 'condition', [`string`, 'title']]
    .reduce((acc, el) => {
      if (el instanceof Array)
        return searchParams.get(el[0]) ? { ...acc, [el[1]]: searchParams.get(el[0]) } : acc
      return searchParams.get(el) ? { ...acc, [el]: searchParams.get(el) } : acc
    }, {});

  const { data } = trpc.offert.getOfferts.useQuery({
    ...filters,
    ...(cathegoryId ? { ["cathegoryId"]: cathegoryId } : {})
  });

  

  return (
    <div className='white-box'>
      <div className='util-flex util-flex-column'>
        <h4 className='header header-md'>Offerts</h4>
        {
          data?.offerts && data.offerts.map((offert) => {
            return <OffertRow
              id={offert.id}
              condition={offert.condition}
              title={offert.title}
              author={offert.ownerName}
              imgSource={offert.images[0]}
              price={offert.price}
              key={offert.id} />
          })
        }
      </div>
    </div>
  )
}

const OffertRow = ({
  imgSource,
  price,
  condition,
  title,
  author,
  id
}: {
  imgSource: string,
  price: number,
  condition: string,
  author: string,
  title: string,
  id: string
}) => {
  return (
    <Link
      to={`/offert/${id}`}
      className='offert-row__box'>
      <div className='offert-row__image'>
        <img src={imgSource} alt="" className='util-w-full utill-h-full util-fit-cover' />
      </div>
      <div className='offert-row__box-details'>
        <h4 className='offert-row__box-header'>{title}</h4>
        <span className='offert-row__box-description'>from {author}</span>
        <span className='offert-row__box-description'>Condition: {condition}</span>
        <span className='offert-row__box-price'>PLN {price}</span>
      </div>
    </Link>
  )
}

const imgUrl = "https://www.shutterstock.com/image-illustration/cute-yellow-rubber-duck-toy-260nw-1359388691.jpg"