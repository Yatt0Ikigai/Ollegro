import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { trpc } from "utils/trpc";
import { NavbarGlobalComponent, NormalizedInput, NormalizedInputNumber } from "globalCompontents"

import "./CreateOffertPage.scss"
import {getErrorToast} from "../../../../utils/ToastsProvider";
import {ToastContainer} from "react-toastify";

export const CreateOffertPage: React.FC = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    const createOffert = trpc.offert.createOffert.useMutation({
        onSuccess: () => {
            navigate("/my-ollegro/offerts")
        },
        onError: () => {
            getErrorToast("Fill out all required fields")
        }
    })
    const { data } = trpc.cathegory.getCathegories.useQuery();

    const titleRef = useRef<HTMLInputElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);
    const cathegoryRef = useRef<HTMLSelectElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const [condition, setCondition] = useState("New");

    const convertToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.onerror = err => {
            alert(err);
        }
    }

    useEffect(() => {
        if (Cookies.get("logged_in") !== "true") navigate('/')
    }, [])

    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content content-narrow">
                <form action="" className="white-box" onSubmit={(e) => {
                    e.preventDefault();
                    createOffert.mutate({
                        title: titleRef.current?.value as string,
                        price: Number(priceRef.current?.value),
                        condition: condition,
                        description: descriptionRef.current?.value as string,
                        image: image as string,
                        cathegoryId: cathegoryRef.current?.value as string
                    })
                }}>
                    <NormalizedInput
                        placeholder="Name"
                        ref={titleRef}
                    />
                    <input
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                    />
                    <textarea
                        className="form__description normalized-input__input"
                        ref={descriptionRef} />
                    <NormalizedInputNumber
                        placeholder="Price"
                        ref={priceRef}
                    />
                    <fieldset className="form__fieldset">
                        <legend>Select a condition</legend>
                        <div className="util-flex util-gap-md">
                            <input type="radio" id="New" name="condition" value="New"
                                checked={condition === "New"} onChange={(e) => {
                                    setCondition("New");
                                }} />
                            <label htmlFor="New" className="util-w-full">New</label>
                        </div>
                        <div className="util-flex util-gap-md">
                            <input type="radio" id="Used" name="condition" value="Used"
                            checked={condition === "Used"} 
                            onChange={(e) =>{
                                  setCondition("Used")
                                }}/>
                            <label htmlFor="Used" className="util-w-full" >Used</label>
                        </div>
                    </fieldset>
                    <select name="" id="" ref={cathegoryRef}>
                        {data && data.cathegories.map((e) => {
                            return (
                                <option value={e.id}>{e.name}</option>
                            )
                        })}
                    </select>
                    <button className="submit-button" type="submit">
                        Post offert
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}