import React, {useState} from 'react'
import "./SeeTab.scss"

export function SeeTab({ contactEmail}:{
    contactEmail: string
}) {
    const [contactDetailsShown, setContactDetailsShown] = useState(false);

    return (
        <div className='white-box'>
            <h4 className='header header-xl'>
                See
            </h4>
            <div className='see_content'>
                <button
                    className='contact_details_button'
                    onClick={() => setContactDetailsShown(!contactDetailsShown)}>
                        <span>
                            Sellers contact details
                        </span>
                        <div className={`arrow ${contactDetailsShown ? "arrow-up" : "arrow-down"}`}/>
                    </button>
                    {
                        contactDetailsShown &&
                        <div className='contact_details'>
                            <text>{contactEmail}</text>
                        </div>
                    }
            </div>
        </div>
    )
}