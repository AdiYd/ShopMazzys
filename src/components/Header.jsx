import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import PAGES from '../assets/json/pages.json';
import PAGES_PARSER from '../assets/json/pagesParser.json';
import { CartContext } from '../context/CartContext';


export const Logo = ({showText=true, ...props}) => (
  <svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <g transform="rotate(-10 100 50)">
      <path d="M100 30 Q85 50 100 70 Q115 50 100 30 Z" fill="#C97B5B" />
      <path d="M100 70 Q120 50 140 70 Q120 90 100 70 Z" fill="#EEB85D" />
      <path d="M100 30 Q115 50 100 70 Q85 50 100 30 Z" fill="#17332A" />
    </g>
    {showText && (
      <text x="160" y="70" textAnchor="start" fontFamily="'Comic Sans MS', 'Arial', sans-serif" fontSize="24" fill="#17332A" fontWeight="bold" letterSpacing="0.05em">
        relaxWave
      </text>
    )}
  </svg>);

 export const HeaderLogo = ({showText=true, ...props}) => (
  <svg id='svgLogo' 
        width="300" height="100" viewBox="0 0 300 100" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ display: 'block', ...props.style }}>
    <g transform="rotate(-10 100 50)">
      <path d="M100 30 Q85 50 100 70 Q115 50 100 30 Z" fill="#C97B5B" />
      <path d="M100 70 Q120 50 140 70 Q120 90 100 70 Z" fill="#EEB85D" />
      <path d="M100 30 Q115 50 100 70 Q85 50 100 30 Z" fill="#17332A" />
    </g>
    {showText && (
      <text x="160" y="70" textAnchor="start" fontFamily="'Comic Sans MS', 'Arial', sans-serif" fontSize="13" fill="#17332A" fontWeight="bold" letterSpacing="0.05em">
        relaxWave
      </text>
    )}
  </svg>);



const Header = () => {
  const [page, setPage] = useState('Home');
  const onMenuPageClick = (e)=>{
      setPage(e.target.innerText);
  }

  return (
    <header id="navbar" className="menu border-b border-b-gray-400 p-8 pb-0 flex justify-between items-center max-sm:px-2">
      <div className="font-bold text-lg w-1/6 max-sm:hidden">
        <Link to="/">
        <HeaderLogo showText={false} />
        </Link>
      </div>
      <nav className='w-1/2 max-sm:w-5/6'>
        <ul className="flex justify-around w-full">
          {Object.keys(PAGES_PARSER).map((item,index)=>(
          <li key={index}>
              <Link title={PAGES_PARSER[item]} 
              onClick={onMenuPageClick} to={PAGES_PARSER[item]} 
              className={`headerLink max-sm:text-sm ${item === page ? ' text-primary':''}`}>
              {PAGES_PARSER[item]}
              </Link>
          </li>
          ))}
        </ul>
      </nav>
      <div className='w-1/6 text-end'>
        <Link title={PAGES_PARSER['Cart']} to="/cart">
          <ShoppingCart className="headerLink" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
