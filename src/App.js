import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import Users from "./views/Users";
import {useContext} from "react";
import {Auth0Context} from "./views/contexts/Auth0Context";

export default function App() {

    const auth0 = useContext(Auth0Context)

    console.log(auth0)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

