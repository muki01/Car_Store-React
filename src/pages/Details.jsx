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
import { getDoc, doc, deleteDoc } from 'firebase/firestore';

import { Helmet } from "react-helmet";

const Details = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [uid, setUid] = useState("");
    const [post, setPost] = useState("");

    const handleAuthStateChange = (user) => {
        if (user) {
            setUid(user.uid);
        } else {
            setUid("");
        }
    };

    const fetchPostDetails = async (postId) => {
        try {
            const postDocRef = await getDoc(doc(db, 'posts', postId));
            if (postDocRef.exists()) {
                const postData = postDocRef.data();
                setPost(postData);
            } else {
                console.log('Post not found');
            }
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    const deletePost = async () => {
        try {
            await deleteDoc(doc(db, 'posts', id));
            console.log('Post deleted successfully');
            navigate("/");
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, handleAuthStateChange);
        fetchPostDetails(id);
    }, [id]);

    if (!post) {
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
                                <h1>{post.name}</h1>
                                <div className="options">
                                    {uid === post.creatorId ? (
                                        <>
                                            <Link to={`/edit/${id}`}> <FontAwesomeIcon icon={faPencil} /> Edit </Link>
                                            <Link onClick={deletePost}><FontAwesomeIcon icon={faTrashCan} /> Remove </Link>
                                        </>) : <></>
                                    }
                                    <Link to="#"><FontAwesomeIcon icon={faHeart} /> Like </Link>
                                    {/* <Link to="#"><FontAwesomeIcon icon={SolidHert} /> Liked </Link> */}
                                </div>
                            </div>
                            <hr />
                            <h2><FontAwesomeIcon icon={faUser} /><Link to={`/profile/${post.creatorId}`}> Muki </Link><FontAwesomeIcon icon={faClock} /> July 23, 2023
                            </h2>
                            <img src={post.image} alt="" />
                            <p>Price: {post.price}</p>
                            <p>{post.description}</p>
                            <p className="phoneNumber">Phone number: <span className="number">{post.phoneNumber}</span></p>
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
