import './App.css';
import SignUp from './Pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignUp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
