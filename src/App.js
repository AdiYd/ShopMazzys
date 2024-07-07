
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import CartProvider from './context/CartContext';
import LegalPage from './pages/LegalPage';
import HeaderMui from './components/HeaderMui';
import products from './assets/json/productData.json';

export const debug = (...args)=>{
  console.log(...args)
}

const PageWrapper = () => {
  const { arg } = useParams();
  try{
      for (let item of products){
        if (item?.title === arg){
          debug('Routing to : ', arg);
          return <Products productName={arg} />;
        }
      }
      return <Products />
    }
      catch{
        return <Products />
    }
};


// JavaScript to handle scroll event
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar){
    return
  }
  if (window.scrollY > 800){
    navbar.classList.add('hidden');
    navbar.classList.remove('scrolled');
  }
  if (window.scrollY < 500) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('hidden');
  }
  //  else {
  //   navbar.classList.remove('scrolled','hidden');
  //   navbar.classList.add('menu-transparent');
  // }
});

const App = () => {
  return (
    <CartProvider>
      <Router>
        <HeaderMui />
        <main className="flex-grow relative" style={{minHeight:'75vh'}}>
          <Routes>
            <Route path='*' index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/relaxWave" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/*" element={<Products productName={'none'} />} />
            <Route path="/products/:arg" element={<PageWrapper />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms-and-conditions" element={<LegalPage section="termsAndConditions" />} />
            <Route path="/cookies-policy" element={<LegalPage section="cookiesPolicy" />} />
            <Route path="/privacy-policy" element={<LegalPage section="privacyPolicy" />} />
            <Route path="/disclaimer" element={<LegalPage section="disclaimer" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
