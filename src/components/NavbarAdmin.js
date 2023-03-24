import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Button }from "./Button";
import "./style/Navbar.css";


function NavbarAdmin() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(()=>{
        showButton()
    },[]
    )

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/system" className=" navbar-logo" onClick={closeMobileMenu}>
                        ANIMAL <i className="fa-solid fa-paw"></i>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fa-solid fa-x" : "fa-solid fa-bars"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">

                        </li>
                        <li className="nav-item">
                            <Link to="/dodajpracownika" className="nav-links" onClick={closeMobileMenu}>
                                Dodaj pracownika
                            </Link>
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                            <Link to="/wylogowanie" className="nav-links-mobile" onClick={closeMobileMenu}>
                                Wyloguj się
                            </Link>
                        </li>
                    </ul>
                    {button && <Link to="/wylogowanie"><Button buttonStyle='btn--outline'>WYLOGUJ SIĘ</Button></Link>}
                </div>
            </nav>
        </>
    );
}
export default NavbarAdmin;

