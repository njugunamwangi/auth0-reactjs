import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import Users from "./views/Users";
import {useAuth0} from "./views/contexts/Auth0Context";
import NotFound from "./views/core/NotFound";

export default function App() {

    const auth0 = useAuth0()
    console.log(auth0)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                { auth0.isAuthenticated && auth0.user && (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                    </>
                ) }
            </Routes>
        </BrowserRouter>
    );
}

