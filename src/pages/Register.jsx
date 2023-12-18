// import "../assets/styles/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const register = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                username: username,
                email: email,
                image: "https://img.freepik.com/free-icon/user_318-159711.jpg",
                likedPosts: [],
            });

            console.log('User registered successfully!');
            navigate("/");
        } catch (error) {
            console.error('An error occurred during registration:', error);
        }
    };

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/login_register_edit_create.css" />
            </Helmet>
            <Header></Header>
            <main className="bg1">
                <div className="main-container">
                    <div className="box">
                        <h1 className="formName">Register</h1>
                        <form onSubmit={register}>
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} minLength="3" required />

                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" required />

                            <label>Confirm Password</label>
                            <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} minLength="6" required />

                            <button className="submitBtn" type="submit">Register</button>
                        </form>
                        <p className="login-register">
                            Already have an account? <Link to="/login">Login here</Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Register;
