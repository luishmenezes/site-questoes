import React, { useState } from 'react';
import './Sobre.css';

const InfoCard = ({ title, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="info-card">
            <h2>{title}</h2>
            <p>{isExpanded ? content : `${content.substring(0, 100)}...`}</p>
            <button onClick={toggleContent} className="read-more">
                {isExpanded ? "Fechar" : "Ler mais"}
            </button>
        </div>
    );
};

const AboutComponent = () => {
    return (
        <div className="about-container">
            <nav className="navbar">
                <ul>
                    <li>Home</li>
                    <li>Explore</li>
                    <li>Provas</li>
                </ul>
            </nav>

            <div className="main-content">
                <h1>Sobre a Educa+</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit ut aliquam purus sit.
                </p>

                <div className="info-section">
                    <InfoCard
                        title="Nossa Missão"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis auctor elit sed vulputate mi sit amet. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Elit eget gravida cum sociis natoque penatibus et magnis dis parturient. Ac auctor augue mauris augue neque gravida in fermentum et sollicitudin."
                    />
                    <InfoCard
                        title="Nossa Visão"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis auctor elit sed vulputate mi sit amet mauris commodo. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Ultrices sagittis orci a scelerisque purus semper. Cras fermentum odio eu feugiat pretium nibh ipsum. Varius vel pharetra vel turpis nunc eget lorem dolor. Nulla aliquet enim tortor at auctor urna nunc id."
                    />
                    <InfoCard
                        title="Nossos Valores"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus scelerisque eleifend donec pretium vulputate sapien nec. Quis viverra nibh cras pulvinar mattis nunc. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi."
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;
