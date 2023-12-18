// import "../assets/styles/style.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState("");

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

    useEffect(() => {
        fetchPostDetails(id);
    }, []);

    if (!post) {
        return <p>Loading...</p>;
    }


    const editPost = async () => {
        try {
            await deleteDoc(doc(db, 'posts', id));
            // console.log('Post deleted successfully');
            navigate("/");
        } catch (error) {
            // console.error('Error deleting post:', error);
        }
    };

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/login_register_edit_create.css" />
            </Helmet>
            <Header></Header>
            <main className="bg2">
                <div className="main-container">
                    <div className="box wideBox">
                        <h1 className="formName">Edit Post</h1>
                        <form onSubmit={editPost}>
                            <label>Post Name</label>
                            <input type="text" name="name" onChange={(e) => setName(e.target.value)} minLength="3" required />

                            <label>Category</label>
                            <select name="category" defaultValue={""} onChange={(e) => setCategory(e.target.value)} required>
                                <option value={""} disabled>Select Category</option>
                                <option value="action">Cars</option>
                                <option value="adventure">Bikes</option>
                            </select>

                            <label>Brand</label>
                            <select name="brand" defaultValue={""} onChange={(e) => setBrand(e.target.value)} required>
                                <option value={""} disabled>Select Model</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="simulation">Simulation</option>
                                <option value="survival">Survival</option>
                                <option value="sports">Sports</option>
                                <option value="racing">Racing</option>
                                <option value="horror">Horror</option>
                            </select>

                            <label>Image URL</label>
                            <input type="text" name="imageURL" onChange={(e) => setImage(e.target.value)} required
                                pattern="^(https?:\/\/).*\.(jpg|png)$" />

                            <label>Description</label>
                            <textarea name="description" onChange={(e) => setDescription(e.target.value)} required minLength="10"></textarea>

                            <label>Price</label>
                            <input type="number" name="price" onChange={(e) => setPrice(e.target.value)} min="0" required />

                            <label>Phone Number</label>
                            <input type="number" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} required
                                pattern="^(https?:\/\/).*$" />

                            <button className="submitBtn" type="submit" >Create Post</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Edit;
