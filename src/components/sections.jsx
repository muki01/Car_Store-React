import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Section = () => {
    const [cars, setCars] = useState("");

    const fetchPost = async () => {
        await getDocs(collection(db, "cars"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                if (newData.length < 1) {
                    setCars("");
                } else {
                    setCars(newData);
                }
                console.log(cars, newData);
            })

    }

    useEffect(() => {
        fetchPost();
    }, [])

    return (

        <section>
            {cars ? (
                <>
                    <div className="article-area">
                        {
                            cars?.map((car, i) => (
                                <article key={i}>
                                    <Link to="/details"><img src={car.image} alt="" /></Link>
                                    <div className="article-container">
                                        <h1><Link to="/details">{car.name}</Link></h1>
                                        <hr />
                                        <h2><FontAwesomeIcon icon={faUser} /><Link to="#">Muki </Link><FontAwesomeIcon icon={faClock} /> July 22,2023</h2>
                                        <p>{car.description}</p>
                                    </div>
                                </article>

                            ))
                        }
                    </div>
                </>
            ) : (
                <>
                    <div className="noGames">
                        <h2>No Posts yet.</h2>
                    </div>
                </>
            )}
        </section>
    );
};

export default Section