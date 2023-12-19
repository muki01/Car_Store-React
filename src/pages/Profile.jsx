// import "../assets/styles/profile.css";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const Profile = () => {
    const { profileId } = useParams();
    const [uid, setUid] = useState("");
    const [userData, setUserData] = useState("");
    const [likedPosts, setLikedPosts] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleAuthStateChange = (user) => {
        if (user) {
            setUid(user.uid);
        } else {
            setUid("");
        }
    };

    const handleUsernameChange = (e) => {
        const { value } = e.target;
        setUsername(value);

        if (value.length == 0) {
            setErrors({ ...errors, username: 'Username is required.' });
        } else if (value.length < 3) {
            setErrors({ ...errors, username: 'Username must be at least 3 characters.' });
        } else {
            setErrors({ ...errors, username: '' });
        }
    };

    const handleImageChange = (e) => {
        const { value } = e.target;
        setImage(value);

        const imageRegex = /^(https?:\/\/).*\.(jpg|png)$/;
        if (!value) {
            setErrors({ ...errors, image: 'Image is required.' })
        } else if (!imageRegex.test(value)) {
            setErrors({ ...errors, image: 'Invalid image format.' })
        } else {
            setErrors({ ...errors, image: '' });
        }
    };

    const getUserInfo = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserData(userData)
                setUsername(userData.username);
                setImage(userData.image);
                fetchLikedPosts();
            } else {
                console.log('User not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchLikedPosts = async () => {
        try {
            const likedPostsIds = userData.likedPosts || [];

            const likedPostsData = await Promise.all(
                likedPostsIds.map(async (postId) => {
                    const postDoc = await getDoc(doc(db, 'posts', postId));
                    if (postDoc.exists()) {
                        return { id: postDoc.id, ...postDoc.data() };
                    }
                    return null;
                })
            );

            // Boş olmayanları filtrele ve state'i güncelle
            setLikedPosts(likedPostsData.filter((post) => post !== null));

        } catch (error) {
            console.error('Error fetching liked posts:', error);
        }
    };

    const editInfo = async (e) => {
        e.preventDefault();

        try {
            if (!Object.values(errors).some((error) => error !== '')) {
                const userRef = doc(db, 'users', profileId);
                await updateDoc(userRef, {
                    username: username,
                    image: image,

                });
                console.log('User data updated successfully');
            } else {
                const firstError = Object.values(errors).find((error) => error !== '');
                setErrorMessage(firstError);

                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            setErrorMessage(error.message);

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, handleAuthStateChange);
        getUserInfo(profileId);

    }, [profileId])

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/profile.css" />
            </Helmet>
            <Header></Header>
            {errorMessage ? (
                <div className="error" >
                    <div className="errorBox">
                        <div className="container">
                            <h1>{errorMessage}</h1>
                        </div>
                    </div>
                </div>) : (<></>)}
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
                            {likedPosts?.length > 0 ? (
                                <div className="postContainer">
                                    {likedPosts.map((post) => (
                                        <div className="post" key={post.id}>
                                            <Link to={`/details/${post.id}`}><img src={post.image} /></Link>
                                            <Link to={`/details/${post.id}`}>
                                                <h2>{post.name}</h2>
                                            </Link>
                                        </div>
                                    ))
                                    }
                                </div>
                            ) : (
                                <div className="noPosts">
                                    <h2>No Liked Posts</h2>
                                </div>
                            )}
                        </div>
                        {uid == profileId ? (
                            <>
                                <div className="settingsArea">
                                    <h1>Settings</h1>
                                    <hr />
                                    <div className="settings">
                                        <form onSubmit={editInfo}>
                                            <div className="row">
                                                <h2>User name: </h2>
                                                <input type="text" value={username} name="username" onChange={handleUsernameChange} required minLength="3" />
                                                {errors.username && <h5 style={{ color: 'red' }}>{errors.username}</h5>}

                                            </div>

                                            <div className="row">
                                                <h2>Profile Photo: </h2>
                                                <input type="text" value={image} name="image" onChange={handleImageChange} required
                                                    pattern="^(https?:\/\/).*\.(jpg|png)$" />
                                                {errors.image && <h5 style={{ color: 'red' }}>{errors.image}</h5>}

                                            </div>

                                            {/* <div className="row">
                                        <h2>Profile Title: </h2>
                                        <textarea name="title"></textarea>
                                    </div> */}

                                            <button className="submitBtn" type="submit">Save Changes</button>
                                        </form>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </section>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Profile;
