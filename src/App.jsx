import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Create from "./pages/Create";
import NotFoundd from "./pages/NotFound";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Details from "./pages/Details";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryName" element={<Category />} />
                {/* <Route path="/category/:categoryName/:brand" element={<Category />} /> */}
                <Route path="/create" element={<Create />} />
                <Route path="/edit/:postId" element={<Edit />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:profileId" element={<Profile />} />
                <Route path="/details/:postId" element={<Details />} />
                <Route path="*" element={<NotFoundd />} />
            </Routes>
        </>
    );
}

export default App;
