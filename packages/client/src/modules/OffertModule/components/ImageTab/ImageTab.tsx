import React, {useCallback, useEffect, useRef, useState} from 'react'
import { BsShareFill } from "react-icons/bs";
import "./ImageTab.scss";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function ImageTab({
    title,
    imgSrc
}:{
    title: string,
    imgSrc: string 
}) {
    async function copyToClip() {
        await navigator.clipboard.writeText(location.href);

        toast.info('Offers link copied to clipboard!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }

    return (
        <div className='white-box'>
            <div className="util-flex util-spacebetween-main-axis util-center-second-axis">
                <h2 className='header-xl'>
                    {title}
                </h2>
                <button className='share-button' onClick={copyToClip}>
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