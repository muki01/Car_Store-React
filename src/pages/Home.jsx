// import "../assets/styles/style.css";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroBanner from "../components/heroBanner";
import Mainn from "../components/main";
import Articlee from "../components/article";
import Section from "../components/sections";
import Aside from "../components/aside";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/style.css" />
            </Helmet>
            <HeroBanner>
                <Header></Header>
            </HeroBanner>
            <Mainn>
                <Section>
                    <Articlee></Articlee>
                </Section>
                <Aside></Aside>
            </Mainn>
            <Footer></Footer>
        </>
    );
};

export default Home;
