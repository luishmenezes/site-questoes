import React from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import HomeComponent from './HomeComponent';
import SobreComponent from './SobreComponent';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/sobre" element={<SobreComponent />} />
      </Routes>
    </Router>
  );
};
  


export default App;
