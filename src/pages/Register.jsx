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

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setErrors({ ...errors, email: 'Email is required.' })
        } else if (!emailRegex.test(value)) {
            setErrors({ ...errors, email: 'Invalid email format.' })
        } else {
            setErrors({ ...errors, email: '' });
        }
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);

        if (value.length == 0) {
            setErrors({ ...errors, password: 'Password is required.' });
        } else if (value.length < 6) {
            setErrors({ ...errors, password: 'Password must be at least 6 characters.' });
        } else {
            setErrors({ ...errors, password: '' });
        }
    };

    const handleRepasswordChange = (e) => {
        const { value } = e.target;
        setRepassword(value);

        if (value.length == 0) {
            setErrors({ ...errors, repassword: 'Password is required.' });
        } else if (value.length < 6) {
            setErrors({ ...errors, repassword: 'Password must be at least 6 characters.' });
        } else if (value != password) {
            setErrors({ ...errors, repassword: 'Password must be the same.' });
        } else {
            setErrors({ ...errors, repassword: '' });
        }
    };

    const register = async (e) => {
        e.preventDefault();

        try {
            if (!Object.values(errors).some((error) => error !== '')) {
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
            } else {
                const firstError = Object.values(errors).find((error) => error !== '');
                setErrorMessage(firstError);

                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
            setErrorMessage(error.message);

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/login_register_edit_create.css" />
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
            <main className="bg1">
                <div className="main-container">
                    <div className="box">
                        <h1 className="formName">Register</h1>
                        <form onSubmit={register}>
                            <label>Username</label>
                            <input type="text" value={username} onChange={handleUsernameChange} minLength="3" required />
                            {errors.username && <h5 style={{ color: 'red' }}>{errors.username}</h5>}

                            <label>Email</label>
                            <input type="email" value={email} onChange={handleEmailChange} required />
                            {errors.email && <h5 style={{ color: 'red' }}>{errors.email}</h5>}

                            <label>Password</label>
                            <input type="password" value={password} onChange={handlePasswordChange} minLength="6" required />
                            {errors.password && <h5 style={{ color: 'red' }}>{errors.password}</h5>}

                            <label>Confirm Password</label>
                            <input type="password" value={repassword} onChange={handleRepasswordChange} minLength="6" required />
                            {errors.repassword && <h5 style={{ color: 'red' }}>{errors.repassword}</h5>}

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
