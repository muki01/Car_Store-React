// import "../assets/styles/style.css";
import Header from "../components/header";
import Footer from "../components/footer";
// import Mainn from "../components/main";
// import Articlee from "../components/article";
// import Section from "../components/sections";
// import Aside from "../components/aside";
import { Helmet } from "react-helmet";

const Create = () => {
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/login_register_edit_create.css" />
            </Helmet>
            <Header></Header>
            <main className="bg3">
                <div className="main-container">
                    <div className="box wideBox">
                        <h1 className="formName">Create Post</h1>
                        <form>
                            <label>Name</label>
                            <input type="text" formControlName="name" name="name" minlength="3" required />

                            <label>Car Model</label>
                            <select name="type" formControlName="type" required>
                                <option disabled selected value="">Select Car Model</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="simulation">Simulation</option>
                                <option value="survival">Survival</option>
                                <option value="sports">Sports</option>
                                <option value="racing">Racing</option>
                                <option value="horror">Horror</option>
                            </select>

                            <label>Image URL</label>
                            <input type="text" formControlName="imageURL" name="imageURL" required
                                pattern="^(https?:\/\/).*\.(jpg|png)$" />

                            <label>Description</label>
                            <textarea formControlName="description" name="description" required minlength="10"></textarea>

                            <label>Price</label>
                            <input type="number" formControlName="price" name="price" min="0" required />

                            <label>Phone Number</label>
                            <input type="number" formControlName="downloadURL" name="downloadURL" required
                                pattern="^(https?:\/\/).*$" />

                            <button className="submitBtn" type="submit">Create Post</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Create;
