import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import Users from "./views/Users";

function App() {
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

export default App;
