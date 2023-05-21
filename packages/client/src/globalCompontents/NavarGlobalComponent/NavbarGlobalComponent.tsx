import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { trpc } from "utils/trpc";

import "./NavbarGlobalComponent.scss";

import ShopingSvg from "../../../assets/shopping.svg";

export function NavbarGlobalComponent() {
    const [openedMenu, setOpenedMenu] = useState(false);
    const navigate = useNavigate();
    const isLogged = Cookies.get("logged_in") === "true";
    const logOut = trpc.auth.logOut.useMutation({
        onSuccess: () => {
            navigate(0)
        }
    });

    let searchRef = useRef<HTMLInputElement | null>(null);
    let cathegoryRef = useRef<HTMLSelectElement | null>(null);



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
                        if (!searchRef && !cathegoryRef) return;
                        if (searchRef.current?.value === "") return;
                        if (cathegoryRef.current?.value === "all") navigate({ pathname: "/listings", search: `string=${searchRef.current?.value}` })
                        else navigate({ pathname: `/cathegory/${cathegoryRef.current?.value}`, search: `string=${searchRef.current?.value}` })
                    }}>
                        <input type="text" placeholder='What are you looking for?' className='navbar__form-input' ref={searchRef} />
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
                            openedMenu && isLogged === false &&
                            <div className='user-menu user-menu__logged'>
                                <ShopingSvg className='user-menu__icon' />
                                <h3 className='user-menu__header'>Welcome to Ollegro!</h3>
                                <span className='user-menu__info'>Log in to see your shopping. At Ollegro, feel like at home!</span>
                                <Link to={"/login"} className='custom-link'>Sign in</Link>
                                <span className='register-link'>
                                    Don't have account?
                                    <Link to={"/register"} className='link'> Sign up </Link>
                                </span>
                            </div>
                        }
                        {
                            openedMenu && isLogged &&
                            <div className='user-menu user-menu__not-logged'>
                                <div className='util-w-full'>
                                    <Link to={"/my-ollegro/offerts"} className='link '>My offerts</Link>
                                </div>
                                <div className='util-w-full'>
                                    <Link to={"/my-ollegro/bought-products"} className='link '>Bought offerts</Link>
                                </div>
                                <div className='util-w-full'>
                                    <Link to={"/my-ollegro/settings"} className='link '>Settings</Link>
                                </div>
                                <button className='custom-link' onClick={(e) => {
                                    logOut.mutate();
                                }}>
                                    Log out
                                </button>
                            </div>
                        }
                    </button>
                </li>
            </ul>
        </nav>
    )
}
