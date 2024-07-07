import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import PAGES from "../assets/json/pages.json";

const HeaderTailwind = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(()=>{
    let currPage = location.pathname.slice(1,2).toUpperCase() + location.pathname.slice(2).toLowerCase();
    console.log('This is page: ', currPage);
    if (Object.keys(PAGES).includes(currPage)){
      return  currPage
    }
    else{
      return 'Home'
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">MyStore</div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/products" className="hover:text-gray-400">Products</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          <Link to="/cart" className="hover:text-gray-400">
            <FaShoppingCart />
          </Link>
        </nav>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-gray-800 p-4">
          <Link to="/" className="block py-2 hover:text-gray-400">Home</Link>
          <Link to="/products" className="block py-2 hover:text-gray-400">Products</Link>
          <Link to="/about" className="block py-2 hover:text-gray-400">About</Link>
          <Link to="/contact" className="block py-2 hover:text-gray-400">Contact</Link>
          <Link to="/cart" className="block py-2 hover:text-gray-400">
            <FaShoppingCart />
          </Link>
        </nav>
      )}
    </header>
  );
};

export default HeaderTailwind;
