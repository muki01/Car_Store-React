import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import { useState, useEffect } from 'react';
import { getDoc, doc, collection, query, orderBy, getDocs } from 'firebase/firestore';

const Aside = () => {
    const [uid, setUid] = useState("");
    const [userData, setUserData] = useState("");
    const [popularPosts, setPopularPosts] = useState([]);

    const handleAuthStateChange = (user) => {
        if (user) {
            setUid(user.uid);
            getUserInfo(user.uid);
        } else {
            setUid("");
        }
    };

    const getUserInfo = async (uid) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setUserData(userData)
            } else {
                console.log('User not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchPopularPosts = async () => {
        try {
            const postsCollection = collection(db, 'posts');
            const postsQuery = query(postsCollection, orderBy('likes', 'desc'));
            const postsSnapshot = await getDocs(postsQuery);

            const top3Posts = postsSnapshot.docs.slice(0, 3).map((postDoc) => {
                const postData = postDoc.data();
                return { id: postDoc.id, ...postData };
            });

            setPopularPosts(top3Posts);
        } catch (error) {
            console.error('Error fetching popular posts:', error);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, handleAuthStateChange);
        fetchPopularPosts()
    }, [uid, userData])

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

                    {popularPosts.map((post) => (
                        <div className="post" key={post.id}>
                            <Link to={`/details/${post.id}`}><img src={post.image} /></Link>
                            <Link to={`/details/${post.id}`}>
                                <h2>{post.name}</h2>
                            </Link>
                        </div>
                    ))}


                    {/* <div className="noGames">
                            <h2>No Games yet.</h2>
                        </div> */}
                </div>
            </div>
            <div className="box aboutMe">
                <div className="container">
                    <h1>Your Profile</h1>
                    <hr />
                    {userData ? (
                        <div className="post">
                            <Link to={`/profile/${uid}`}><img src={userData.image} /></Link>
                            <div className="textArea">
                                <Link to={`/profile/${uid}`}>
                                    <h2>{userData.username}</h2>
                                </Link>
                                <Link to={`/profile/${uid}`}>
                                    <h3>View profile</h3>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="notLoggedin">
                            <h2>Not Logged In</h2>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Aside