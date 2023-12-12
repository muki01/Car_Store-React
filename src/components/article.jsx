import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Articlee = () => {
    return (

        <article>
            <Link to="/details"><img src="/src/assets/images/bmw4.jpg" alt="" /></Link>
            <div className="article-container">
                <h1><Link to="/details">BMW 1</Link></h1>
                <hr />
                <h2><FontAwesomeIcon icon={faUser} /><Link to="#">Muki </Link><FontAwesomeIcon icon={faClock} /> July 22,2023</h2>
                <p>Raft is an open world survival-sandbox video game developed by Swedish developer Redbeet
                    Interactive, and published by Axolot Games. The game was released as an early access
                    title on 23 May 2018 on Steam, after initial release as a free download on
                    indie platform Itch.io in 2016. On 20 June 2022 Raft was taken out of early access with
                    the release of its final chapter. Taking place in a flooded apocalypse the player takes
                    on the role of a forward scout, a survivor who ventures out into the open sea in search
                    of habitable land and resources.</p>
            </div>
        </article>
    );
};

export default Articlee