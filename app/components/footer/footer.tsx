import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Filthy App. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;