import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="flex justify-center items-center flex-col text-center bg-cover bg-center h-screen" 
            style={{ backgroundImage: 'url(/assets/carrousel.jpg)' }}>
            <div>
                <h1 className="text-white text-7xl">Welcome to Filthy App</h1>
                <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded">Events</button>
            </div>
        </div>
    );
};

export default HomePage;