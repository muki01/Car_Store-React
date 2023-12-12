import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
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
                        <li><Link to="/create">Create post</Link></li>
                        <li><Link to="/logout">LogOut</Link></li>
                        <li><Link to="/profile">My Profile</Link></li>
                        <li><Link to="/login">LogIn</Link></li>
                        <li><Link to="/register" className="register">Register</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header