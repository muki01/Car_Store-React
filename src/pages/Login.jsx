// import "../assets/styles/login_register_edit_create.css";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
// import Mainn from "../components/main";
// import Articlee from "../components/article";
// import Section from "../components/sections";
// import Aside from "../components/aside";
import { Helmet } from "react-helmet";

const Login = () => {
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
                        <form>
                            <label>Email</label>
                            <input type="email" formControlName="email" name="email" required email />

                            <label>Password</label>
                            <input type="password" formControlName="password" name="password" minlength="6" required />

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
