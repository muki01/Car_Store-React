import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [uid, setUid] = useState("");
    const [isActive, setIsActive] = useState(false);

    const navToggle = () => {
        setIsActive(!isActive);
        const navBar = document.querySelector(".navBar");
        navBar.classList.toggle("open");

        if (navBar.classList.contains("open")) {
            navBar.style.maxHeight = navBar.scrollHeight + "px";
        } else {
            navBar.removeAttribute("style");
        }
    };

    const logout = () => {
        try {
            signOut(auth)
            navigate("/");
            console.log("Signed out successfully")
        } catch (error) {
            console.error('Signed out error:', error);
        };
    }

    const handleAuthStateChange = (user) => {
        if (user) {
            setUid(user.uid);
        } else {
            setUid("");
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, handleAuthStateChange);
    }, [])

    return (

        <header>
            <div className="container">
                <div className="logoArea">
                    <Link to="/" className="image"><img src="/src/assets/images/logo.png" alt="" /></Link>
                    <Link to="/" className="siteName">
                        <h1><span className="highlight">Game</span> Store</h1>
                    </Link>
                </div>
                <div className="menuArea">
                    <FontAwesomeIcon icon={faBars} className="menuBtn" onClick={navToggle} />
                </div>
                <div className="navBar">
                    <ul>
                        <li><Link to="/" className="active">Home</Link></li>
                        <li><Link to="/category/cars">Cars</Link></li>
                        <li><Link to="/category/bikes">Bikes</Link></li>
                        {uid ? (
                            <>
                                <li><Link to="/create">Create post</Link></li>
                                <li><a onClick={logout}>LogOut</a></li>
                                <li><Link to={`/profile/${uid}`}>My Profile</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">LogIn</Link></li>
                                <li><Link to="/register" className="register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header