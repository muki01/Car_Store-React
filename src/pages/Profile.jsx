// import "../assets/styles/profile.css";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';

const Profile = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState("");
    const [postData, setPostData] = useState("");

    useEffect(() => {
        getUserInfo(id);
        if (userData.likedPosts?.length > 0) {
            getPostInfo(userData.likedPosts[0])
            console.log("likedPostsData", postData)
        }

    }, [])

    const getUserInfo = async (uid) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setUserData(userData)
                // console.log('User data:', userData);
                // console.log('Liked Posts:', userData.likedPosts);
            } else {
                console.log('User not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const getPostInfo = async (likePostsId) => {
        try {
            const postDocRef = doc(db, 'posts', likePostsId);
            const postDocSnap = await getDoc(postDocRef);

            if (postDocSnap.exists()) {
                const postData = postDocSnap.data();
                setPostData(postData)
                console.log('Post data:', postData);
            } else {
                console.log('Post not found');
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };

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
                            <img src={userData.image} alt="" />
                            <h1>{userData.username}</h1>
                            <h2>{userData.email}</h2>
                        </div>
                    </div>
                    <section>
                        <div className="myGamesArea">
                            <h1>Liked Posts</h1>
                            <hr />
                            {userData.likedPosts?.length > 0 ? (
                                <div className="postContainer">
                                    {
                                        userData.likedPosts?.map((likedPosts, i) => (
                                            <div className="post" key={i}>
                                                <Link to="/details"><img src="/src/assets/images/bmw2.jpg" /></Link>
                                                <Link to="/details">
                                                    <h2>BMW 1</h2>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="noGames">
                                    <h2>No Games</h2>
                                </div>
                            )}
                        </div>
                        <div className="settingsArea">
                            <h1>Settings</h1>
                            <hr />
                            <div className="settings">
                                <form>
                                    <div className="row">
                                        <h2>User name: </h2>
                                        <input type="text" name="username" required minLength="3" />

                                    </div>

                                    <div className="row">
                                        <h2>Profile Photo: </h2>
                                        <input type="text" name="image" required
                                            pattern="^(https?:\/\/).*\.(jpg|png)$" />

                                    </div>

                                    {/* <div className="row">
                                        <h2>Profile Title: </h2>
                                        <textarea name="title"></textarea>
                                    </div> */}

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
