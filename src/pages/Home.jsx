// import "../assets/styles/style.css";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroBanner from "../components/heroBanner";
import Mainn from "../components/main";
import Section from "../components/sections";
import Aside from "../components/aside";
import { Helmet } from "react-helmet";

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const Home = () => {

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const uid = user.uid;
    //             console.log("uid", uid)
    //         } else {
    //             console.log("user is logged out")
    //         }
    //     });

    // }, [])

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/style.css" />
            </Helmet>
            <HeroBanner>
                <Header></Header>
            </HeroBanner>
            <Mainn>
                <Section></Section>
                <Aside></Aside>
            </Mainn>
            <Footer></Footer>
        </>
    );
};

export default Home;
