import React from 'react'
import { Link } from 'react-router-dom'

import "./OffertTab.scss";

export function OffertTab() {

  return (
    <div className='white-box'>
      <div className='util-flex util-flex-column'>
        <h4 className='header header-md'>Offerts</h4>
        <OffertRow id="42342132" condition='New' title='Kaczka kwakwa' author='Andrzej' price={20.02} imgSource={imgUrl}/>
        <OffertRow id="42342132" condition='New' title='Kaczka kwakwa' author='Andrzej' price={20.02} imgSource={imgUrl}/>
        <OffertRow id="42342132" condition='New' title='Kaczka kwakwa' author='Andrzej' price={20.02} imgSource={imgUrl}/>
        <OffertRow id="42342132" condition='New' title='Kaczka kwakwa' author='Andrzej' price={20.02} imgSource={imgUrl}/>
        <OffertRow id="42342132" condition='New' title='Kaczka kwakwa' author='Andrzej' price={20.02} imgSource={imgUrl}/>
        <OffertRow id="42342132" condition='New' title='Kaczka kwakwa' author='Andrzej' price={20.02} imgSource={imgUrl}/>
        <OffertRow id="42342132" condition='New' title='Kaczka kwakwa' author='Andrzej' price={20.02} imgSource={imgUrl}/>
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
        <img src={imgSource} alt="" className='util-w-full utill-h-full util-fit-cover'/>
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