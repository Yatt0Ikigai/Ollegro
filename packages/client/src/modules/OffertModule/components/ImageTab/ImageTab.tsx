import React, { useEffect} from 'react'
import { BsShareFill } from "react-icons/bs";
import { trpc } from 'utils/trpc'
import { useParams } from 'react-router-dom'
import "./ImageTab.scss";

export function ImageTab({
    title,
    imgSrc
}:{
    title: string,
    imgSrc: string 
}) {

    return (
        <div className='white-box'>
            <div className="util-flex util-spacebetween-main-axis util-center-second-axis">
                <h2 className='header-xl'>
                    {title}
                </h2>
                <button className='share-button'>
                    <BsShareFill className='util-w-full util-h-full' />
                </button>
            </div>
            <div className=''>
                <img src={imgSrc} alt="" className='util-w-full util-aspect-video util-fit-contain' />
            </div>
        </div>
    )
}

const imgUrl = "https://www.shutterstock.com/image-illustration/cute-yellow-rubber-duck-toy-260nw-1359388691.jpg"