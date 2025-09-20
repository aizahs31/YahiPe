import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-green-50">
      <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-green-800">YahiPe</Link>
        <div className="hidden md:flex items-center space-x-12">
          <Link to="/howitworks" className="text-gray-700 hover:text-green-700 font-medium transition-colors">How It Works</Link>
          <Link to="/ourgoal" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Our Goal</Link>
          <a href="#contact" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Contact</a>
          <Link to="/login" className="bg-green-800 text-white px-8 py-3 rounded-none hover:bg-green-900 transition-colors font-medium">Login / Sign Up</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-green-800" /> : <Menu className="w-6 h-6 text-green-800" />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden px-8 pt-4 pb-6 space-y-4 bg-white border-t border-green-50">
          <Link to="/howitworks" className="block text-gray-700 hover:text-green-700 font-medium">How It Works</Link>
          <Link to="/ourgoal" className="block text-gray-700 hover:text-green-700 font-medium">Our Goal</Link>
          <a href="#contact" className="block text-gray-700 hover:text-green-700 font-medium">Contact</a>
          <Link to="/login" className="block w-full text-center bg-green-800 text-white px-8 py-3 rounded-none hover:bg-green-900 transition-colors font-medium">Login / Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
