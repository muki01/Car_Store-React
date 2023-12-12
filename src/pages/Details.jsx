// import "../assets/styles/style.css";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Mainn from "../components/main";
// import Articlee from "../components/article";
// import Section from "../components/sections";
import Aside from "../components/aside";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faHeart as SolidHert, faUser, faDownload, faPencil } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faClock, faCreditCard } from "@fortawesome/free-regular-svg-icons";

import { Helmet } from "react-helmet";

const Details = () => {
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/details.css" />
            </Helmet>
            <Header></Header>
            <Mainn>
                <section>
                    <div className="postArea">
                        <div className="container">
                            <div className="textArea">
                                <h1>BMW</h1>
                                <div className="options">
                                    <Link to="/edit"> <FontAwesomeIcon icon={faPencil} /> Edit </Link>
                                    <Link to="#"><FontAwesomeIcon icon={faTrashCan} /> Remove </Link>
                                    <Link to="#"><FontAwesomeIcon icon={faHeart} /> Like </Link>
                                    <Link to="#"><FontAwesomeIcon icon={SolidHert} /> Liked </Link>
                                </div>
                            </div>
                            <hr />
                            <h2><FontAwesomeIcon icon={faUser} /><Link to=""> Muki </Link><FontAwesomeIcon icon={faClock} /> July 23, 2023
                            </h2>
                            <img src="/src/assets/images/bmw2.jpg" alt="" />
                            <p>Forza Horizon 5 is a 2021 racing video game developed by Playground Games and published by
                                Xbox Game Studios. It is the fifth Forza Horizon title and twelfth main instalment in the
                                Forza series. The game is set in a fictionalised representation of Mexico. It was released
                                on 9 November 2021 for Windows, Xbox One, and Xbox Series X/S.

                                The game received critical acclaim and became a commercial success upon release; it launched
                                to over ten million players in the first week, the biggest-ever launch for an Xbox Game
                                Studios game. Notably, the game won IGN's Game of the Year award and three jury-voted
                                awards at The Game Awards 2021, tying with Hazelight's It Takes Two for most wins.</p>
                            <p className="phoneNumber">Phone number: <span className="number">0885568323</span></p>
                            {/* <div className="btnArea">
                                        <a className="btn"><FontAwesomeIcon icon={faCreditCard} /> 56$ Buy Now</a>
                                        <div className="downloadArea">
                                            <h2>You purchased this game!</h2>
                                            <Link to="" target="_blank" className="btn"><FontAwesomeIcon icon={faDownload} /> Download</Link>
                                        </div>
                                    </div> */}
                        </div>
                    </div>
                    <div className="moreGamesArea">
                        <div className="container">
                            <h1>You may like these posts</h1>
                            <hr />
                            <div className="postContainer">
                                <div className="post">
                                    <Link to=""><img src="/src/assets/images/bmw3.jpg" /></Link>
                                    <Link to="">
                                        <h2>BMW 1</h2>
                                    </Link>
                                </div>
                                <div className="post">
                                    <Link to=""><img src="/src/assets/images/bmw4.jpg" /></Link>
                                    <Link to="">
                                        <h2>BMW 2</h2>
                                    </Link>
                                </div>
                                <div className="post">
                                    <Link to=""><img src="/src/assets/images/bmw5.jpg" /></Link>
                                    <Link to="">
                                        <h2>BMW 3</h2>
                                    </Link>
                                </div>
                                {/* <div className="noGames">
                                            <h2>No Games yet.</h2>
                                        </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="commentsArea">
                        <div className="container">
                            <h1>Post a Comment</h1>
                            <hr />
                        </div>
                    </div>

                </section>
                <Aside></Aside>
            </Mainn>
            <Footer></Footer>
        </>
    );
};

export default Details;
