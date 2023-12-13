// import "../assets/styles/style.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Mainn from "../components/main";
import Section from "../components/sections";
import Aside from "../components/aside";
import { Helmet } from "react-helmet";

const Category = () => {
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/style.css" />
            </Helmet>
            <Header></Header>
            <Mainn>
                <Section></Section>
                <Aside></Aside>
            </Mainn>
            <Footer></Footer>
        </>
    );
};

export default Category;
