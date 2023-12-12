// import "../assets/styles/style.css";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
// import Mainn from "../components/main";
// import Articlee from "../components/article";
// import Section from "../components/sections";
// import Aside from "../components/aside";
import { Helmet } from "react-helmet";

const Register = () => {
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/login_register_edit_create.css" />
            </Helmet>
            <Header></Header>
            <main class="bg1">
                <div class="main-container">
                    <div class="box">
                        <h1 class="formName">Register</h1>
                        <form>
                            <label>Username</label>
                            <input type="text" formControlName="username" minlength="3" required />

                            <label>Email</label>
                            <input type="email" formControlName="email" required />

                            <label>Password</label>
                            <input type="password" formControlName="password" minlength="6" required />

                            <label>Confirm Password</label>
                            <input type="password" formControlName="repassword" minlength="6" required />

                            <button class="submitBtn" type="submit">Register</button>
                        </form>
                        <p class="login-register">
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
