
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login.tsx"
import CreateAccount from './pages/CreateAccount.tsx';
import Home from './pages/Home.tsx';
import UserMedicalTest from './pages/UserMedicalTest.tsx';
import AddMedicalTests from './pages/AddMedicalTests.tsx';
import UserDrug from './pages/UserDrug.tsx';
import AddDrug from './pages/AddDrug.tsx';
import UserSymptom from './pages/UserSymptom.tsx';
import AddSymptom from './pages/AddSymptom.tsx';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/UserMedicalTest" element={<UserMedicalTest />} />
        <Route path="/AddMedicalTests" element={<AddMedicalTests />} />
        <Route path="/UserDrug" element={<UserDrug />} />
        <Route path="/AddDrug" element={<AddDrug />} />
        <Route path="/UserSymptom" element={<UserSymptom />} />
        <Route path="/AddSymptom" element={<AddSymptom />} />
      </Routes>
    </Router>
  );
}

export default App
