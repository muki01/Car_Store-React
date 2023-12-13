// import "../assets/styles/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const register = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });


    }

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
