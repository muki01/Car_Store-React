// import "../assets/styles/style.css";
import Header from "../components/header";
import Footer from "../components/footer";

import { Helmet } from "react-helmet";

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const Create = () => {
    const navigate = useNavigate();
    const [uid, setUid] = useState("");
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const addPost = async (e) => {
        e.preventDefault();

        try {
            const postsRef = collection(db, 'posts');
            await addDoc(postsRef, {
                name: name,
                category: category,
                brand: brand,
                image: image,
                description: description,
                price: price,
                phoneNumber: phoneNumber,
                date: new Date(),
                creatorId: uid,
            });
            navigate("/")
        } catch (error) {
            console.error('An error occurred during creating:', error);
        }
    }

    const handleAuthStateChange = (user) => {
        if (user) {
            setUid(user.uid);
        } else {
            setUid("");
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, handleAuthStateChange);
    }, [])

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="/src/assets/styles/login_register_edit_create.css" />
            </Helmet>
            <Header>
            </Header>
            <main className="bg3">
                <div className="main-container">
                    <div className="box wideBox">
                        <h1 className="formName">Create Post</h1>
                        <form onSubmit={addPost}>
                            <label>Post Name</label>
                            <input type="text" name="name" onChange={(e) => setName(e.target.value)} minLength="3" required />

                            <label>Category</label>
                            <select name="category" defaultValue={""} onChange={(e) => setCategory(e.target.value)} required>
                                <option value={""} disabled>Select Category</option>
                                <option value="cars">Cars</option>
                                <option value="bikes">Bikes</option>
                            </select>

                            <label>Brand</label>
                            <select name="brand" defaultValue={""} onChange={(e) => setBrand(e.target.value)} required>
                                <option value={""} disabled>Select Brand</option>
                                {category == "cars" ? (
                                    <>
                                        <option value="AC">AC</option>
                                        <option value="Abarth">Abarth</option>
                                        <option value="Acura">Acura</option>
                                        <option value="Aixam">Aixam</option>
                                        <option value="Alfa Romeo">Alfa Romeo</option>
                                        <option value="Alpina">Alpina</option>
                                        <option value="Aro">Aro</option>
                                        <option value="Asia">Asia</option>
                                        <option value="Aston martin">Aston martin</option>
                                        <option value="Audi">Audi</option>
                                        <option value="Austin">Austin</option>
                                        <option value="BMW">BMW</option>
                                        <option value="Baic">Baic</option>
                                        <option value="Bentley">Bentley</option>
                                        <option value="Berliner">Berliner</option>
                                        <option value="Bertone">Bertone</option>
                                        <option value="Borgward">Borgward</option>
                                        <option value="Brilliance">Brilliance</option>
                                        <option value="Bugatti">Bugatti</option>
                                        <option value="Buick">Buick</option>
                                        <option value="Cadillac">Cadillac</option>
                                        <option value="Carbodies">Carbodies</option>
                                        <option value="Chery">Chery</option>
                                        <option value="Chevrolet">Chevrolet</option>
                                        <option value="Chrysler">Chrysler</option>
                                        <option value="Citroen">Citroen</option>
                                        <option value="Corvette">Corvette</option>
                                        <option value="Cupra">Cupra</option>
                                        <option value="DONGFENG">DONGFENG</option>
                                        <option value="DS">DS</option>
                                        <option value="Dacia">Dacia</option>
                                        <option value="Daewoo">Daewoo</option>
                                        <option value="Daihatsu">Daihatsu</option>
                                        <option value="Daimler">Daimler</option>
                                        <option value="Datsun">Datsun</option>
                                        <option value="Dkw">Dkw</option>
                                        <option value="Dodge">Dodge</option>
                                        <option value="Dr">Dr</option>
                                        <option value="Eagle">Eagle</option>
                                        <option value="FSO">FSO</option>
                                        <option value="Ferrari">Ferrari</option>
                                        <option value="Fiat">Fiat</option>
                                        <option value="Ford">Ford</option>
                                        <option value="GOUPIL">GOUPIL</option>
                                        <option value="Gaz">Gaz</option>
                                        <option value="Geely">Geely</option>
                                        <option value="Genesis">Genesis</option>
                                        <option value="Geo">Geo</option>
                                        <option value="Gmc">Gmc</option>
                                        <option value="Gonow">Gonow</option>
                                        <option value="Great Wall">Great Wall</option>
                                        <option value="Haval">Haval</option>
                                        <option value="Heinkel">Heinkel</option>
                                        <option value="Hillman">Hillman</option>
                                        <option value="Honda">Honda</option>
                                        <option value="HongQi">HongQi</option>
                                        <option value="Hummer">Hummer</option>
                                        <option value="Hyundai">Hyundai</option>
                                        <option value="Ifa">Ifa</option>
                                        <option value="Ineos Grenadier">Ineos Grenadier</option>
                                        <option value="Infiniti">Infiniti</option>
                                        <option value="Innocenti">Innocenti</option>
                                        <option value="Isuzu">Isuzu</option>
                                        <option value="Iveco">Iveco</option>
                                        <option value="JAC">JAC</option>
                                        <option value="JAS">JAS</option>
                                        <option value="Jaguar">Jaguar</option>
                                        <option value="Jeep">Jeep</option>
                                        <option value="Jpx">Jpx</option>
                                        <option value="Kia">Kia</option>
                                        <option value="Lada">Lada</option>
                                        <option value="Laforza">Laforza</option>
                                        <option value="Lamborghini">Lamborghini</option>
                                        <option value="Lancia">Lancia</option>
                                        <option value="Land Rover">Land Rover</option>
                                        <option value="Landwind">Landwind</option>
                                        <option value="Lexus">Lexus</option>
                                        <option value="Lifan">Lifan</option>
                                        <option value="Lincoln">Lincoln</option>
                                        <option value="Lotus">Lotus</option>
                                        <option value="Lynk &amp; Co">Lynk &amp; Co</option>
                                        <option value="Mahindra">Mahindra</option>
                                        <option value="Maserati">Maserati</option>
                                        <option value="Matra">Matra</option>
                                        <option value="Maybach">Maybach</option>
                                        <option value="Mazda">Mazda</option>
                                        <option value="McLaren">McLaren</option>
                                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                                        <option value="Mercury">Mercury</option>
                                        <option value="Mg">Mg</option>
                                        <option value="Microcar">Microcar</option>
                                        <option value="Mini">Mini</option>
                                        <option value="Mitsubishi">Mitsubishi</option>
                                        <option value="Morgan">Morgan</option>
                                        <option value="Moskvich">Moskvich</option>
                                        <option value="Nissan">Nissan</option>
                                        <option value="Oldsmobile">Oldsmobile</option>
                                        <option value="Opel">Opel</option>
                                        <option value="Perodua">Perodua</option>
                                        <option value="Peugeot">Peugeot</option>
                                        <option value="Pgo">Pgo</option>
                                        <option value="Plymouth">Plymouth</option>
                                        <option value="Polestar">Polestar</option>
                                        <option value="Polonez">Polonez</option>
                                        <option value="Pontiac">Pontiac</option>
                                        <option value="Porsche">Porsche</option>
                                        <option value="Proton">Proton</option>
                                        <option value="Qoros">Qoros</option>
                                        <option value="Renault">Renault</option>
                                        <option value="Rieju">Rieju</option>
                                        <option value="Rivian">Rivian</option>
                                        <option value="Rolls-Royce">Rolls-Royce</option>
                                        <option value="Rover">Rover</option>
                                        <option value="SECMA">SECMA</option>
                                        <option value="SH auto">SH auto</option>
                                        <option value="SIN CARS">SIN CARS</option>
                                        <option value="Saab">Saab</option>
                                        <option value="Samand">Samand</option>
                                        <option value="Santana">Santana</option>
                                        <option value="Saturn">Saturn</option>
                                        <option value="Scion">Scion</option>
                                        <option value="Seat">Seat</option>
                                        <option value="Shatenet">Shatenet</option>
                                        <option value="Shuanghuan">Shuanghuan</option>
                                        <option value="Simca">Simca</option>
                                        <option value="Skoda">Skoda</option>
                                        <option value="Smart">Smart</option>
                                        <option value="Ssang yong">Ssang yong</option>
                                        <option value="SsangYong">SsangYong</option>
                                        <option value="Subaru">Subaru</option>
                                        <option value="Suzuki">Suzuki</option>
                                        <option value="Talbot">Talbot</option>
                                        <option value="Tata">Tata</option>
                                        <option value="Tavria">Tavria</option>
                                        <option value="Tazzari">Tazzari</option>
                                        <option value="Tempo">Tempo</option>
                                        <option value="Terberg">Terberg</option>
                                        <option value="Tesla">Tesla</option>
                                        <option value="Tofas">Tofas</option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Trabant">Trabant</option>
                                        <option value="Triumph">Triumph</option>
                                        <option value="Uaz">Uaz</option>
                                        <option value="VROMOS">VROMOS</option>
                                        <option value="VW">VW</option>
                                        <option value="Vmoto">Vmoto</option>
                                        <option value="Volga">Volga</option>
                                        <option value="Volvo">Volvo</option>
                                        <option value="Warszawa">Warszawa</option>
                                        <option value="Wartburg">Wartburg</option>
                                        <option value="Wey">Wey</option>
                                        <option value="Wiesmann">Wiesmann</option>
                                        <option value="Xinkai">Xinkai</option>
                                        <option value="Xinshun">Xinshun</option>
                                        <option value="Yogomo">Yogomo</option>
                                        <option value="Zastava">Zastava</option>
                                        <option value="Zaz">Zaz</option>
                                        <option value="Други">Други</option>
                                        <option value="Победа">Победа</option>
                                        <option value="София">София</option>
                                        <option value="Чайка">Чайка</option>
                                    </>
                                ) : category == "bikes" ? (
                                    <>
                                        <option value="ADLI">ADLI</option>
                                        <option value="Aeon">Aeon</option>
                                        <option value="American Ironhorse">American Ironhorse</option>
                                        <option value="Aprilia">Aprilia</option>
                                        <option value="Arctic Cat">Arctic Cat</option>
                                        <option value="Argo">Argo</option>
                                        <option value="Askoll">Askoll</option>
                                        <option value="Atala">Atala</option>
                                        <option value="Aurora V8">Aurora V8</option>
                                        <option value="Awo">Awo</option>
                                        <option value="BMW">BMW</option>
                                        <option value="BRP">BRP</option>
                                        <option value="Babetta">Babetta</option>
                                        <option value="Balkan">Balkan</option>
                                        <option value="Baotian">Baotian</option>
                                        <option value="Barton">Barton</option>
                                        <option value="Bashan">Bashan</option>
                                        <option value="Bemi">Bemi</option>
                                        <option value="Benelli">Benelli</option>
                                        <option value="Benzhou">Benzhou</option>
                                        <option value="Beta">Beta</option>
                                        <option value="Big Dog">Big Dog</option>
                                        <option value="Bombardier">Bombardier</option>
                                        <option value="Boom Trike">Boom Trike</option>
                                        <option value="Brixton">Brixton</option>
                                        <option value="Buell">Buell</option>
                                        <option value="Buyang">Buyang</option>
                                        <option value="Cagiva">Cagiva</option>
                                        <option value="Can-Am">Can-Am</option>
                                        <option value="Cfmoto">Cfmoto</option>
                                        <option value="Cpi">Cpi</option>
                                        <option value="Cz">Cz</option>
                                        <option value="Daelim">Daelim</option>
                                        <option value="Daytona">Daytona</option>
                                        <option value="Derbi">Derbi</option>
                                        <option value="Dinli">Dinli</option>
                                        <option value="Dkw">Dkw</option>
                                        <option value="Ducati">Ducati</option>
                                        <option value="Egl">Egl</option>
                                        <option value="Emeishan">Emeishan</option>
                                        <option value="Energica">Energica</option>
                                        <option value="Etz">Etz</option>
                                        <option value="FB Mondial">FB Mondial</option>
                                        <option value="Falcon">Falcon</option>
                                        <option value="Fantic">Fantic</option>
                                        <option value="Fym">Fym</option>
                                        <option value="GASGAS">GASGAS</option>
                                        <option value="Garelli">Garelli</option>
                                        <option value="Genata">Genata</option>
                                        <option value="Generic">Generic</option>
                                        <option value="Geo ming">Geo ming</option>
                                        <option value="Gilera">Gilera</option>
                                        <option value="Go-ped">Go-ped</option>
                                        <option value="HISUN">HISUN</option>
                                        <option value="Hanway">Hanway</option>
                                        <option value="Haojin">Haojin</option>
                                        <option value="Harley-Davidson">Harley-Davidson</option>
                                        <option value="Herkules">Herkules</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Husaberg">Husaberg</option>
                                        <option value="Husqvarna">Husqvarna</option>
                                        <option value="Hyosung">Hyosung</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Italjet">Italjet</option>
                                        <option value="Jawa">Jawa</option>
                                        <option value="Jianshe">Jianshe</option>
                                        <option value="Jinlun">Jinlun</option>
                                        <option value="Jocsport">Jocsport</option>
                                        <option value="Jonway">Jonway</option>
                                        <option value="KSR">KSR</option>
                                        <option value="Kaisar">Kaisar</option>
                                        <option value="Kawasaki">Kawasaki</option>
                                        <option value="Keeway">Keeway</option>
                                        <option value="Kinetic">Kinetic</option>
                                        <option value="Kioti">Kioti</option>
                                        <option value="Ktm">Ktm</option>
                                        <option value="Kymco">Kymco</option>
                                        <option value="La Souris">La Souris</option>
                                        <option value="Lambreta">Lambreta</option>
                                        <option value="Laverda">Laverda</option>
                                        <option value="Lexmoto">Lexmoto</option>
                                        <option value="Lifan">Lifan</option>
                                        <option value="Ligier">Ligier</option>
                                        <option value="Linhai">Linhai</option>
                                        <option value="Lynx">Lynx</option>
                                        <option value="MV Agusta">MV Agusta</option>
                                        <option value="Malaguti">Malaguti</option>
                                        <option value="Mbk">Mbk</option>
                                        <option value="Mikilon">Mikilon</option>
                                        <option value="Moto Guzzi">Moto Guzzi</option>
                                        <option value="Moto Morini">Moto Morini</option>
                                        <option value="MotorHispania">MotorHispania</option>
                                        <option value="Motoretta">Motoretta</option>
                                        <option value="Mz">Mz</option>
                                        <option value="NIU">NIU</option>
                                        <option value="Nsu">Nsu</option>
                                        <option value="Overbikes">Overbikes</option>
                                        <option value="Pannonia">Pannonia</option>
                                        <option value="Peugeot">Peugeot</option>
                                        <option value="Piaggio">Piaggio</option>
                                        <option value="Pioneer Nevada">Pioneer Nevada</option>
                                        <option value="Pocketbike">Pocketbike</option>
                                        <option value="Polaris">Polaris</option>
                                        <option value="Puch">Puch</option>
                                        <option value="Qingqi">Qingqi</option>
                                        <option value="Quadro">Quadro</option>
                                        <option value="Revolt">Revolt</option>
                                        <option value="Rewaco">Rewaco</option>
                                        <option value="Rieju">Rieju</option>
                                        <option value="Romet">Romet</option>
                                        <option value="Royal Enfield">Royal Enfield</option>
                                        <option value="Rudge">Rudge</option>
                                        <option value="Sachs">Sachs</option>
                                        <option value="Sampo">Sampo</option>
                                        <option value="Sanyang">Sanyang</option>
                                        <option value="Scoot">Scoot</option>
                                        <option value="Segway Powersports">Segway Powersports</option>
                                        <option value="Sherco">Sherco</option>
                                        <option value="Shineray">Shineray</option>
                                        <option value="Silence">Silence</option>
                                        <option value="Simson">Simson</option>
                                        <option value="Ski-Doo">Ski-Doo</option>
                                        <option value="Stanford">Stanford</option>
                                        <option value="Sundiro">Sundiro</option>
                                        <option value="Sunra">Sunra</option>
                                        <option value="Sunsto">Sunsto</option>
                                        <option value="Super Soco">Super Soco</option>
                                        <option value="Surron">Surron</option>
                                        <option value="Suzuki">Suzuki</option>
                                        <option value="Swm">Swm</option>
                                        <option value="Sym">Sym</option>
                                        <option value="Tango">Tango</option>
                                        <option value="Tatran">Tatran</option>
                                        <option value="Telstar">Telstar</option>
                                        <option value="Tgb">Tgb</option>
                                        <option value="Tm">Tm</option>
                                        <option value="Tomos">Tomos</option>
                                        <option value="Triumph">Triumph</option>
                                        <option value="Truva">Truva</option>
                                        <option value="Tzun">Tzun</option>
                                        <option value="UGBEST">UGBEST</option>
                                        <option value="VCF">VCF</option>
                                        <option value="VROMOS">VROMOS</option>
                                        <option value="Vanetti">Vanetti</option>
                                        <option value="Vento">Vento</option>
                                        <option value="Vespa">Vespa</option>
                                        <option value="Victory">Victory</option>
                                        <option value="Vmoto">Vmoto</option>
                                        <option value="Volta">Volta</option>
                                        <option value="Wangye">Wangye</option>
                                        <option value="Wonsim">Wonsim</option>
                                        <option value="Wt">Wt</option>
                                        <option value="Wuxi ">Wuxi </option>
                                        <option value="XGJao">XGJao</option>
                                        <option value="Xingyu">Xingyu</option>
                                        <option value="Xingyue">Xingyue</option>
                                        <option value="Xinshun">Xinshun</option>
                                        <option value="Yamaha">Yamaha</option>
                                        <option value="Yawa">Yawa</option>
                                        <option value="Yiben">Yiben</option>
                                        <option value="Yuki">Yuki</option>
                                        <option value="Znen">Znen</option>
                                        <option value="Zongshen">Zongshen</option>
                                        <option value="Zundapp">Zundapp</option>
                                        <option value="iO Scooter">iO Scooter</option>
                                        <option value="Восход">Восход</option>
                                        <option value="Вятка">Вятка</option>
                                        <option value="Днепр">Днепр</option>
                                        <option value="Други">Други</option>
                                        <option value="Дунавия">Дунавия</option>
                                        <option value="Иж">Иж</option>
                                        <option value="Карпати">Карпати</option>
                                        <option value="Ковровец">Ковровец</option>
                                        <option value="Мини мотоциклети">Мини мотоциклети</option>
                                        <option value="Минск">Минск</option>
                                        <option value="Поръчкови">Поръчкови</option>
                                        <option value="Рига">Рига</option>
                                        <option value="ТМЗ">ТМЗ</option>
                                        <option value="Урал">Урал</option>
                                    </>
                                ) : (<></>)}
                            </select>

                            <label>Image URL</label>
                            <input type="text" name="imageURL" onChange={(e) => setImage(e.target.value)} required
                                pattern="^(https?:\/\/).*\.(jpg|png)$" />

                            <label>Description</label>
                            <textarea name="description" onChange={(e) => setDescription(e.target.value)} required minLength="10">
                            </textarea>

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
            <Footer>
            </Footer>
        </>
    );
};

export default Create;
