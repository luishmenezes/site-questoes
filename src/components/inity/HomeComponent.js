import React from 'react';
import './Home.css';

const HomeComponent = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <li>Provas</li>
        </ul>
      </nav>

      <div className="main-content">
        <div className="text-section">
          <h1>Educa+</h1>
          <p>
            Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae 
            legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos 
            cu eum an brute copiosae hendrerit.
          </p>
        </div>

        <div className="card">
          <h2>Social Education</h2>
          <p>Lorem ipsum dolor sit amet et delectus</p>
          <button>Button</button>
        </div>
      </div>

      <div className="toggle-switch">
        <span>Sample Text</span>
        <div className="switch">
          <div className="toggle"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
