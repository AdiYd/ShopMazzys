import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import { styled } from '@mui/material/styles';
import { HeaderLogo, Logo } from './Header';
import PAGES from '../assets/json/pages.json';
import { debug } from '../App';
import { CartContext } from '../context/CartContext';
import { mazzysLogo } from '../pages/Home';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);


const refBagFull = (itemCount, className = 'w-16 h-10')=> 
<svg className={className} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="orange">
  <path fill="currentColor" fillRule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z">
  </path>
  <circle cx="30" cy="10" r="7" fill="#EEB85D"/>
  <text x="30" y="10" textAnchor="middle" dy=".3em" fontSize="10" fontWeight={'700'} fill="#17332A">{itemCount}</text>
</svg>


const emptyBag = 
<svg className="w-16 h-10" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor">
  <path fill="currentColor" fillRule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"/>
</svg>



const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {cart} = useContext(CartContext);
  const [cartEmpty, setCartEmpty] = useState(true);

  useEffect(()=>{
    if (cart?.length > 0){
      setCartEmpty(false);
    }
    else {
      setCartEmpty(true);
    }
  },[cart])

  const setPageName = ()=>{
    let currPage;
    let fullPath = decodeURIComponent(location.pathname);
    if (fullPath.startsWith('/')){
      fullPath = fullPath.slice(1);
    }
    if (fullPath.includes('/')){
      currPage = fullPath.slice(0,fullPath.indexOf('/')).toLowerCase();
    }
    else {
        currPage =  fullPath.toLowerCase();
    }
    // console.log('This is the page: ', currPage);
    if (Object.values(PAGES).includes(currPage)){
      return  currPage
    }
    else{
      return 'דף-הבית'
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(setPageName);


  useEffect(()=>{
    setPage(setPageName)  
  },[location.pathname])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <div className='max-w-full' id='navbar'>
      <AppBar sx={{background:'white',direction:'ltr', color:'#403162'}} position="fixed">
        <Toolbar>
          <Typography sx={{ flexGrow: 1, padding:'0px', margin:'0px' }}>
          <Link className='text-black' to={'דף-הבית'}>
            {mazzysLogo({showText:false,shadow:true, height:50, width:50, r:8})}
          </Link>
          </Typography>
          <div dir='rtl' className="sectionDesktop w-1/2 self-end flex justify-around max-sm:hidden">
            {Object.keys(PAGES).map((item, index)=>(
             item !=='Cart' && <Typography key={index} variant="p">
                <Link to={PAGES[item]} 
                onClick={()=>setPage(item)}
                className={` text-nowrap mx-8 ${page===PAGES[item] ? 'text-primary-orange font-bold':''}`}>
                {PAGES[item]==='דף-הבית' ? 'דף הבית' : PAGES[item] || 'דף הבית'}
                </Link>
              </Typography>
              
            ))}
          </div>
          <div className='ml-4 mr-2 self-end max-sm:self-center max-sm:mx-8'>
          <Link 
          onClick={()=>setPage('סל-קניות')}
          className={`block ${page === 'סל-קניות' ? 'text-primary-orange':'bg-inherit'}`}
          to="/סל-קניות" style={{ textDecoration: 'none',margin: '0 10px' }}>
            {cartEmpty ? emptyBag : refBagFull(cart.length || 0)}
              {/* <IconButton color="inherit">
                <ShoppingBag  />
              </IconButton> */}
            </Link>
          </div>
          <div className="sectionMobile text-center hidden max-sm:block">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              className='text-center'
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              
              {Object.keys(PAGES).map((item, index)=>(
                <div key={index} className='flex justify-center'>
                    <MenuItem variant="button">
                    <Link 
                    onClick={()=>{setPage(item); setAnchorEl(null)}}
                    to={PAGES[item]} className={`mx-8 font-bold ${page===item ? 'text-primary-orange':''}`}>
                     {PAGES[item]==='דף-הבית' ? 'דף הבית' : PAGES[item] || 'דף הבית'}
                     </Link>
                    </MenuItem>
                </div>
            ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </div>
    {(!cartEmpty&& page!=='סל-קניות') && <div title='Checkout'
            className='rounded-full bg-white/80 cursor-pointer z-50 shadow-lg hover:shadow-xl border fixed bottom-1/4 right-2 w-fit h-fit'>
            <Link className='cursor-pointer' to={'/סל-קניות'}>
              {refBagFull(cart.length, 'w-16 h-16 max-sm:w-12 max-sm:h-12')}
            </Link>
        </div>}
    </>
  );
};

export default Header;
