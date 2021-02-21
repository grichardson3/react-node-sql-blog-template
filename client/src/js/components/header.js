import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <div id="logoArea">
            <Link to="/">
                <img
                    src="../img/mern-blog-logo-white.png"
                    alt="MERN Blog Logo"
                />
            </Link>
        </div>
    </header>
)

export default Header;