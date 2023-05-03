import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./Navbar.scss";

export function Navbar() {
    const [openedMenu, setOpenedMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className='navbar util-h-2_5rem util-vertical-center'>
            <Link to={"/"} className='navbar__list-logo'>
                Ollegro
            </Link>
        </nav>
    )
}
