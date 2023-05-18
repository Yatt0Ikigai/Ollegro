import React, { forwardRef, useEffect } from 'react'
import "./NormalizedInput.scss";

export const NormalizedInputNumber = forwardRef(({
    children,
    placeholder,
    showValue = true,
}: {
    placeholder: string,
    children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element),
    showValue?: boolean,
}, ref: React.Ref<HTMLInputElement>) => {
    return (
        <div className='normalized-input__box'>
            <input
                type="string"
                ref={ref}
                className={"normalized-input__input"}
                onChange={(e) => {
                   e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g,"" )
                }}
                pattern="^\d*\.?\d*$"
            />
            <div className='normalized-input__placeholder normalized-input__placeholder-top'>
                {placeholder}
            </div>
            {children}
        </div>
    )
})
