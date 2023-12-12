import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";

const Aside = () => {
    return (

        <aside>
            <div className="box socialMedia">
                <div className="container">
                    <h1>Social Media</h1>
                    <hr />
                    <div className="post">
                        <a href="https://facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="https://instagram.com" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://twitter.com" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://youtube.com" target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href="https://github.com/muki01" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
                    </div>
                </div>
            </div>
            <div className="box searchBox">
                <div className="container">
                    <h1>Search</h1>
                    <hr />
                    <div className="post">
                        <input placeholder="Search this website" type="text" />
                        <Link to="#">Search</Link>
                    </div>
                </div>
            </div>
            <div className="box popularPost">
                <div className="container">
                    <h1>Popular Posts</h1>
                    <hr />
                    <div className="post">
                        <Link to="/gameDetails"><img src="/src/assets/images/bmw2.jpg" /></Link>
                        <Link to="/gameDetails">
                            <h2>BMW 1</h2>
                        </Link>
                    </div>
                    <div className="post">
                        <Link to="/gameDetails"><img src="/src/assets/images/bmw3.jpg" /></Link>
                        <Link to="/gameDetails">
                            <h2>BMW 2</h2>
                        </Link>
                    </div>
                    <div className="post">
                        <Link to="/gameDetails"><img src="/src/assets/images/bmw4.jpg" /></Link>
                        <Link to="/gameDetails">
                            <h2>BMW 3</h2>
                        </Link>
                    </div>

                    {/* <div className="noGames">
                            <h2>No Games yet.</h2>
                        </div> */}
                </div>
            </div>
            <div className="box aboutMe">
                <div className="container">
                    <h1>Your Profile</h1>
                    <hr />
                    <div className="post">
                        <Link to="/profile"><img src="/src/assets/images/user.png" /></Link>
                        <div className="textArea">
                            <Link to="/profile">
                                <h2>Muksin</h2>
                            </Link>
                            <Link to="/profile">
                                <h3>View complete profile</h3>
                            </Link>
                        </div>
                    </div>
                    {/* <div className="notLoggedin">
                            <h2>Not Logged In</h2>
                        </div> */}
                </div>
            </div>
        </aside>
    );
};

export default Aside