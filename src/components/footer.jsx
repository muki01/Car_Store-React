import { Link } from "react-router-dom";

const Footer = () => {
    return (

        <footer>
            <div className="container">
                <div className="navBar">
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="#">ABOUT</Link></li>
                        <li><Link to="#">CONTACT US</Link></li>
                    </ul>
                </div>
                <div className="textArea">
                    <h1>Designed with<span className="red"> ❤</span> by
                        <a href="#"><span className="colored"> Muki</span></a> | Distributed by
                        <a href="#"><span className="colored"> Muksin</span></a>
                    </h1>
                </div>
            </div>
        </footer>
    );
};

export default Footer