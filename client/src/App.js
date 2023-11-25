import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch ,Routes} from "react-router-dom";
import { useState } from "react";

import './App.css';
import Login from './components/Auth/Login';
import RecetteList from './components/Dashboard/RecetteList';


function App() {
  const [userstate, setUserState] = useState({});

  return (
    <Router>
      <Routes>
           
        <Route exact path="/" element={<Login setUserState={setUserState} />} />
        <Route exact path="/Dashboard" element={<RecetteList setUserState={setUserState} />} />

      </Routes>
    </Router>
  );
}

export default App;
