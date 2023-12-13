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

    const logout = () => {
        signOut(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("uid", uid)
                setUid(user.uid);
            } else {
                console.log("user is logged out")
                setUid("");
            }
        });

    }, [])

    return (

        <header>
            <div className="container">
                <div className="logoArea">
                    <Link to="/" className="image"><img src="./src/assets/images/logo2.png" alt="" /></Link>
                    <Link to="/" className="siteName">
                        <h1><span className="highlight">Game</span> Store</h1>
                    </Link>
                </div>
                <div className="menuArea">
                    <FontAwesomeIcon icon={faBars} className="menuBtn" />
                </div>
                <div className="navBar">
                    <ul>
                        <li><Link to="/" className="active">Home</Link></li>
                        <li><Link to="/category">Cars</Link></li>
                        <li><Link to="/category">Bikes</Link></li>
                        {uid ? (
                            <>
                                <li><Link to="/create">Create post</Link></li>
                                <li><a onClick={logout}>LogOut</a></li>
                                <li><Link to="/profile">My Profile</Link></li>
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