import React, { forwardRef, useEffect } from 'react'
import "./NormalizedInput.scss";

export const NormalizedInput = forwardRef(({
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
                type="text"
                ref={ref}
                className={"normalized-input__input"}
            />
            <div className='normalized-input__placeholder normalized-input__placeholder-top'>
                {placeholder}
            </div>
            {children}
        </div>
    )
})
