// import "../assets/styles/profile.css";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
// import Mainn from "../components/main";
// import Articlee from "../components/article";
// import Section from "../components/sections";
// import Aside from "../components/aside";
import { Helmet } from "react-helmet";

const Profile = () => {
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/profile.css" />
            </Helmet>
            <Header></Header>
            <main id="main">
                <div className="main-container">
                    <div className="sideBar">
                        <div className="sideBar-container">
                            <img src="/src/assets/images/user.png" alt="" />
                            <h1>Muki</h1>
                            <h2>muksin.muksin04@gmail.com</h2>
                            <h2>Role: Admin</h2>
                            <p>Welcome to my profile 😉</p>
                        </div>
                    </div>
                    <section>
                        <div className="myGamesArea">
                            <h1>Liked Posts</h1>
                            <hr />
                            <div className="postContainer">
                                <div className="post">
                                    <Link to="/details"><img src="/src/assets/images/bmw2.jpg" /></Link>
                                    <Link to="/details">
                                        <h2>BMW 1</h2>
                                    </Link>
                                </div>
                            </div>
                            {/* <div className="noGames">
                                    <h2>No Games</h2>
                                </div> */}
                        </div>
                        <div className="settingsArea">
                            <h1>Settings</h1>
                            <hr />
                            <div className="settings">
                                <form>
                                    <div className="row">
                                        <h2>User name: </h2>
                                        <input type="text" formControlName="username" name="username" required minlength="3" />

                                    </div>

                                    <div className="row">
                                        <h2>Profile Photo: </h2>
                                        <input type="text" formControlName="image" name="image" required
                                            pattern="^(https?:\/\/).*\.(jpg|png)$" />

                                    </div>

                                    <div className="row">
                                        <h2>Profile Title: </h2>
                                        <textarea formControlName="title" name="title"></textarea>
                                    </div>

                                    <button className="submitBtn" type="submit">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Profile;
