import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Homepage from "./components/hompage/homepage";
import Manager from "./components/manager/manager";
import Generator from "./components/Generator/generator";
import Error from "./components/Error/error";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
function App() {
  const [user, setLoginUser] = useState({});
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/homepage" element={<Homepage />} />
            <Route exact path="/homepage/manager" element={<Manager />} />
            <Route exact path="/homepage/generator" element={<Generator />} />
            <Route path="*" element={<Error/>}/>
          </Routes>
        </Router>
        {/* </Router><Homepage setLoginUser={setLoginUser} /> */}
        {/* <Router>
          <Routes>
            <Route exact path="/">
              {user && user._id ? 
                <Homepage setLoginUser={setLoginUser} />
               : 
                <Login setLoginUser={setLoginUser} />
              }
            </Route>
            <Route path="/login">
              <Login setLoginUser={setLoginUser} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Routes>
        </Router> */}
      </div>
    </>
  );
}

export default App;
