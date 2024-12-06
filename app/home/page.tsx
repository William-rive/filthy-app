import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div style={{ 
            textAlign: 'center', 
            backgroundImage: 'url(/assets/carrousel.jpg)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100vh' 
        }}>
            <h1 style={{ paddingTop: '20px' }}>Welcome to Filthy App</h1>
        </div>
    );
};



export default HomePage;