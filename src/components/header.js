import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 shadow-md width=5px">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-4xl text-white font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            Digit Recognition App
          </span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
