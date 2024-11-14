import React from "react";
import './nav.css'

const Nav = () => {

    return (
        <>
            <nav className="navbar">
                <div className="first">
                    <div className="logo">
                       tinder
                    </div>
                </div>
                <div className="second">
                    <div className="second-child">
                        login
                    </div>
                    <div className="second-child">
                        about us
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav