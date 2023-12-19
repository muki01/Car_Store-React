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

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

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

    const login = async (e) => {
        e.preventDefault();

        try {
            if (!Object.values(errors).some((error) => error !== '')) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('User login successfully!');
                console.log(user);
                navigate("/");
            } else {
                const firstError = Object.values(errors).find((error) => error !== '');
                setErrorMessage(firstError);

                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
        } catch (error) {
            console.log('An error occurred during login:', error.message);
            setErrorMessage(error.message);

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    }

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
                        <h1 className="formName">Login</h1>
                        <form onSubmit={login}>
                            <label>Email</label>
                            <input type="email" value={email} name="email" onChange={handleEmailChange} required />
                            {errors.email && <h5 style={{ color: 'red' }}>{errors.email}</h5>}

                            <label>Password</label>
                            <input type="password" value={password} name="password" onChange={handlePasswordChange} minLength="6" required />
                            {errors.password && <h5 style={{ color: 'red' }}>{errors.password}</h5>}

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
