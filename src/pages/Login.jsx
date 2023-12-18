// import "../assets/styles/login_register_edit_create.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();

        try {
            const userCredential = signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('User login successfully!');
            console.log(user);
            navigate("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('An error occurred during login:', errorCode, errorMessage);
        }
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
                        <h1 className="formName">Login</h1>
                        <form onSubmit={login}>
                            <label>Email</label>
                            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />

                            <label>Password</label>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} minLength="6" required />

                            <button className="submitBtn" type="submit">Login</button>
                        </form>
                        <p className="login-register">
                            Not have an account? <Link to="/register">Register Here</Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Login;
