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
            <Link to="/home"><button>Home</button></Link>
          </li>
          <li>
            <Link to="/sobre"><button>Sobre</button></Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/sobre" element={<SobreComponent />} />
      </Routes>
    </Router>
  );
};
  


export default App;
