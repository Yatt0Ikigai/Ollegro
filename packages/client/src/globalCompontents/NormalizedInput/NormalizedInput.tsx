import React from 'react'
import "./NormalizedInput.scss";

export function NormalizedInput({
    children,
    placeholder,
    ref,
    showValue = true,
}: {
    placeholder: string,
    ref: React.Ref<HTMLInputElement>,
    children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element),
    showValue?: boolean
}) {
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
}
