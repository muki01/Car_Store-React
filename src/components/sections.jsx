import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Section = (props) => {
    const [posts, setPosts] = useState("");

    const fetchData = async (category) => {
        try {
            const postsCollection = collection(db, 'posts');
            const postsSnapshot = await getDocs(postsCollection);

            const postsData = [];
            for (const postDoc of postsSnapshot.docs) {
                const postData = postDoc.data();
                const creatorId = postData.creatorId;

                if (!category || postData.category === category) {
                    const userDoc = await getDoc(doc(db, 'users', creatorId));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();

                        const formatedDate = postData.date.toDate().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });

                        postsData.push({ id: postDoc.id, ...postData, creator: userData, formatedDate });
                    }
                }
            }

            postsData.sort((a, b) => b.date - a.date);
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(props.categoryName);
    }, [props]);

    return (

        <section>
            {posts ? (
                <>
                    <div className="article-area">
                        {
                            posts?.map((post, i) => (
                                <article key={i}>
                                    <Link to={`/details/${post.id}`}><img src={post.image} alt="" /></Link>
                                    <div className="article-container">
                                        <h1><Link to={`/details/${post.id}`}>{post.name}</Link></h1>
                                        <hr />
                                        <h2><FontAwesomeIcon icon={faUser} /><Link to={`/profile/${post.creatorId}`}>{post.creator.username} </Link><FontAwesomeIcon icon={faClock} /> {post.formatedDate}</h2>
                                        <p>{post.description}</p>
                                    </div>
                                </article>

                            ))
                        }
                    </div>
                </>
            ) : (
                <>
                    <div className="noGames">
                        <h2>No Posts yet.</h2>
                    </div>
                </>
            )}
        </section>
    );
};

export default Section