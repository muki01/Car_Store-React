const Section = ({ children }) => {
    return (

        <section>
            {/* <div className="noGames">
                    <h2>No Posts yet.</h2>
                </div> */}
            <div className="article-area">
                {children}
            </div>
        </section>
    );
};

export default Section