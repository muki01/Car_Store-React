// import "../assets/styles/style.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Mainn from "../components/main";
import Aside from "../components/aside";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faHeart as SolidHert, faUser, faPencil } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faClock } from "@fortawesome/free-regular-svg-icons";

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, deleteDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

import { Helmet } from "react-helmet";

const Details = () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [uid, setUid] = useState("");
    const [postData, setPostData] = useState("");
    const [randomPosts, setRandomPosts] = useState([]);

    const [liked, setLiked] = useState(false);

    const handleAuthStateChange = (user) => {
        if (user) {
            setUid(user.uid);
        } else {
            setUid("");
        }
    };

    const checkIfLiked = async () => {
        try {
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const likedPosts = userData.likedPosts || [];

                if (likedPosts.includes(postId)) {
                    setLiked(true);
                }
            }
        } catch (error) {
            console.error('Error checking if liked:', error);
        }
    };

    const fetchPostData = async (postId) => {
        try {
            const postRef = doc(db, 'posts', postId);
            const postDoc = await getDoc(postRef);
            if (postDoc.exists()) {
                const postData = postDoc.data();
                setPostData(postData);
                checkIfLiked()
            } else {
                console.log('Post not found');
            }
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    const fetchRandomPosts = async () => {
        try {
            const postsCollection = collection(db, 'posts');
            const postsSnapshot = await getDocs(postsCollection);

            const allPosts = postsSnapshot.docs.map((postDoc) => {
                const allPosts = postDoc.data();
                return { id: postDoc.id, ...allPosts };
            });

            const shuffledArray = allPosts.sort(() => Math.random() - 0.5);
            const randomPostsArray = shuffledArray.slice(0, 3);

            setRandomPosts(randomPostsArray);
        } catch (error) {
            console.error('Error fetching random posts:', error);
        }
    };

    const deletePost = async () => {
        try {
            const postRef = doc(db, 'posts', postId);
            await deleteDoc(postRef);
            console.log('Post deleted successfully');
            navigate("/");
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleLike = async () => {
        try {
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                let likedPosts = userData.likedPosts || [];

                if (liked) {
                    likedPosts = likedPosts.filter((likedPost) => likedPost !== postId);
                    console.log("Unliked Successfully")
                } else {
                    likedPosts.push(postId);
                    console.log("Liked Successfully")
                }

                await updateDoc(userRef, { likedPosts });
                setLiked(!liked);

                const postRef = doc(db, 'posts', postId);
                const postDoc = await getDoc(postRef);

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    const updatedLikes = liked ? postData.likes - 1 : postData.likes + 1;
                    await updateDoc(postRef, { likes: updatedLikes });
                }
            }
        } catch (error) {
            console.error('Error updating liked posts:', error);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, handleAuthStateChange);
        fetchPostData(postId);
        fetchRandomPosts();
    }, [postId, uid]);

    if (!postData) {
        return <p>Loading...</p>;
    }

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
                                <h1>{postData.name}</h1>
                                <div className="options">
                                    {uid === postData.creatorId ? (
                                        <>
                                            <Link to={`/edit/${postId}`}> <FontAwesomeIcon icon={faPencil} /> Edit </Link>
                                            <Link onClick={deletePost}><FontAwesomeIcon icon={faTrashCan} /> Remove </Link>
                                        </>) : <></>
                                    }
                                    {liked ? (
                                        <>
                                            <Link onClick={handleLike} className="liked"><FontAwesomeIcon icon={SolidHert} /> Liked </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link onClick={handleLike}><FontAwesomeIcon icon={faHeart} /> Like </Link>
                                        </>
                                    )}

                                </div>
                            </div>
                            <hr />
                            <h2><FontAwesomeIcon icon={faUser} /><Link to={`/profile/${postData.creatorId}`}> Muki </Link><FontAwesomeIcon icon={faClock} /> July 23, 2023
                            </h2>
                            <img src={postData.image} alt="" />
                            <p>Price: {postData.price}</p>
                            <p>{postData.description}</p>
                            <p className="phoneNumber">Phone number: <span className="number">{postData.phoneNumber}</span></p>
                        </div>
                    </div>
                    <div className="moreGamesArea">
                        <div className="container">
                            <h1>You may like these posts</h1>
                            <hr />
                            <div className="postContainer">
                                {randomPosts ? (
                                    <>
                                        {randomPosts.map((post) => (
                                            <div className="post" key={post.id}>
                                                <Link to={`/details/${post.id}`}><img src={post.image} /></Link>
                                                <Link to={`/details/${post.id}`}>
                                                    <h2>{post.name}</h2>
                                                </Link>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <div className="noPosts">
                                            <h2>No Posts.</h2>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="commentsArea">
                        <div className="container">
                            <h1>Post a Comment</h1>
                            <hr />
                        </div>
                    </div> */}

                </section>
                <Aside></Aside>
            </Mainn>
            <Footer></Footer>
        </>
    );
};

export default Details;
