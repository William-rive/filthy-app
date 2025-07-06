import React from 'react';

// Interface pour les props du composant ScrollToTopButton
interface ScrollToTopButtonProps {
    show: boolean;
}

// Composant ScrollToTopButton pour remonter en haut de la page
const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ show }) => {
    if (!show) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 py-3 px-5 bg-blue-500 text-white rounded-lg"
        >
            ↑
        </button>
    );
};

export default ScrollToTopButton;