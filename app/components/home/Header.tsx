import React from 'react';

const Header: React.FC = () => {
    const scrollToEvents = () => {
        const eventsSection = document.getElementById('events-section');
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div>
        <div className="flex justify-center items-center flex-col text-center bg-cover bg-center h-screen"
            style={{ backgroundImage: 'url(/assets/carrousel.jpg)' }}>
            <div>
                <h1 className="text-white text-7xl">Welcome to Filthy App</h1>
                <button onClick={scrollToEvents} className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>Events</button>
            </div>
        </div>
    </div>
    );
};

export default Header;