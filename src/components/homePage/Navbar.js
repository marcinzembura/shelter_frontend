import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Button }from "./Button";
import "../style/Navbar.css";
import SignDialog from '../signIn/SignDialog';


function Navbar() {
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
                    <Link to="/" className=" navbar-logo" onClick={closeMobileMenu}>
                        ANIMAL <i className="fa-solid fa-paw"></i>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fa-solid fa-x" : "fa-solid fa-bars"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                O nas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/wszystkie" className="nav-links" onClick={closeMobileMenu}>
                                Do adopcji
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/ostatnioznalezione" className="nav-links" onClick={closeMobileMenu}>
                                Ostatnio znalezione
                            </Link>
                        </li>
                        <li className="nav-links-mobile">
                            {/* <Link to="/logowanie" className="nav-links-mobile" onClick={closeMobileMenu}>
                                Zaloguj się 
                            </Link> */}
                            <SignDialog/>
                        </li>
                    </ul>
                    {/* {button && <Link to="/logowanie"><Button buttonStyle='btn--outline'>ZALOGUJ SIĘ</Button></Link>} */}
                    {button && <SignDialog/>}
                </div>
            </nav>
        </>
    );
}
export default Navbar;

