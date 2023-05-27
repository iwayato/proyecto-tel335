import { Routes, Route } from "react-router-dom"
import SignUp from "./SignUp";
import Login from "./Login";
import Notebooks from "./Notebooks";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="SignUp" element={<SignUp/>}></Route>
            <Route path="Notebooks" element={<Notebooks/>}></Route>
        </Routes>
    );
}

export default App;