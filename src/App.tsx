import './App.css';
import React from 'react';
import Login from './pages/Login/LoginForm';
import SignUp from './pages/Signup/SignupForm';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/SignUp' element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
