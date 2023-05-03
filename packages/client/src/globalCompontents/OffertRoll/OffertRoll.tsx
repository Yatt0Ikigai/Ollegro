import React, { useEffect, useState } from 'react';
import Card from "./Card";
import "./style.scss";


export const OffertRoll = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className='offert-roll__container'>
      <button className='offert-roll__button offert-roll__button-left' onClick={() => {
        if (index > 0) setIndex(index - 1)
      }}>Left</button>
      <div className='offert-roll__list'
        style={{
          transform: `translateX(-${index * 17}rem)`,
        }}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className='offert-roll__dot-box'>
        {[...Array(10).keys()].map(key => {
          return (<button className='offert-roll__dot' 
          onClick={() => setIndex(key)}
          style={{
            background: key === index ? "orange" : "black"
          }}/>)
        })}
      </div>
      <button className='offert-roll__button offert-roll__button-right'
        onClick={() => {
          if (index < 9) setIndex(index + 1)
        }}>Right</button>
    </div>
  )
}
