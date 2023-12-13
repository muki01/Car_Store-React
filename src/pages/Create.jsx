// import "../assets/styles/style.css";
import Header from "../components/header";
import Footer from "../components/footer";

import { Helmet } from "react-helmet";

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const Create = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [model, setModel] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const addCar = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "cars"), {
                name: name,
                model: model,
                image: image,
                description: description,
                price: price,
                phoneNumber: phoneNumber,

            });
            navigate("/")
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
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
                        <form onSubmit={addCar}>
                            <label>Name</label>
                            <input type="text" name="name" onChange={(e) => setName(e.target.value)} minLength="3" required />

                            <label>Car Model</label>
                            <select name="model" defaultValue={""} onChange={(e) => setModel(e.target.value)} required>
                                <option value={""} disabled>Select Car Model</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="simulation">Simulation</option>
                                <option value="survival">Survival</option>
                                <option value="sports">Sports</option>
                                <option value="racing">Racing</option>
                                <option value="horror">Horror</option>
                            </select>

                            <label>Image URL</label>
                            <input type="text" name="imageURL" onChange={(e) => setImage(e.target.value)} required
                                pattern="^(https?:\/\/).*\.(jpg|png)$" />

                            <label>Description</label>
                            <textarea name="description" onChange={(e) => setDescription(e.target.value)} required minLength="10"></textarea>

                            <label>Price</label>
                            <input type="number" name="price" onChange={(e) => setPrice(e.target.value)} min="0" required />

                            <label>Phone Number</label>
                            <input type="number" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} required
                                pattern="^(https?:\/\/).*$" />

                            <button className="submitBtn" type="submit" >Create Post</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Create;
