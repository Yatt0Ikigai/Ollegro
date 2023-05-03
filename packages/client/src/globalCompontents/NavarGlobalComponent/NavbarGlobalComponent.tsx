import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./NavbarGlobalComponent.scss";

import ShopingSvg from "../../../assets/shopping.svg";

export function NavbarGlobalComponent() {
    const [openedMenu, setOpenedMenu] = useState(false);
    let searchRef = useRef<HTMLInputElement | null>(null);
    let cathegoryRef = useRef<HTMLSelectElement | null>(null);

    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <ul className='navbar__list'>
                <li>
                    <Link to={"/"} className='navbar__list-logo'>
                        Ollegro
                    </Link>
                </li>
                <li className='navbar__list-li-form'>
                    <form action="" className='navbar__form' onSubmit={(e) => {
                        e.preventDefault();
                        if( !searchRef && !cathegoryRef ) return;
                        if( searchRef.current?.value === "" ) return;
                        if( cathegoryRef.current?.value === "all" ) navigate({pathname:"/listings", search:`string=${searchRef.current?.value}`})
                        else navigate({pathname:`/cathegory/${cathegoryRef.current?.value}`, search:`string=${searchRef.current?.value}`})
                    }}>
                        <input type="text" placeholder='What are you looking for?' className='navbar__form-input' ref={searchRef}/>
                        <select className='navbar__form-select' ref={cathegoryRef}>
                            <option value="all" defaultChecked>All categories</option>
                            <option value="cars">Cars</option>
                            <option value="food">Food</option>
                            <option value="electronics">Electronics</option>
                        </select>
                        <button className='navbar__form-submit'>Search</button>
                    </form>
                </li>
                <li className='navbar__list-menu'>
                    <button
                        onClick={() => setOpenedMenu(!openedMenu)}
                        className='navbar__list-menu-button'>
                        <span>
                            My Ollegro
                        </span>
                        <div className={`arrow ${openedMenu ? "arrow-up" : "arrow-down"}`} />
                        {
                            openedMenu && 
                            <div className='user-menu'>
                                <ShopingSvg className='user-menu__icon'/>
                                <h3 className='user-menu__header'>Welcome to Ollegro!</h3>
                                <span className='user-menu__info'>Log in to see your shopping. At Ollegro, feel like at home!</span>
                                <Link to={"/login"} className='custom-link'>Sign in</Link>
                                <span className='register-link'>
                                    Don't have account?
                                    <Link to={"/register"} className='link'> Sign up </Link>
                                </span>
                            </div>
                        }
                    </button>
                </li>
            </ul>
        </nav>
    )
}
