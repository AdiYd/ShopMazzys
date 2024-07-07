import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';


export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState( ()=>{
    const customerCart = Cookies.get('customerCart');
    if (customerCart){
      return JSON.parse(customerCart)
    }
    return []
  });

  const updateCart = (item)=>{
    let i = 0, updatedCart = [...cart];
    for (let product of cart){
        if (item.id === product.id && item.name === product.name){
            updatedCart[i] = item;
        }
        i++;
    } 
    setCart(updatedCart);
    Cookies.set('customerCart', JSON.stringify(updatedCart),{expires:7})
  }

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    Cookies.set('customerCart', JSON.stringify(updatedCart),{expires:7})

  };
  const removeFromCart = (item)=>{
    const updatedCart = cart.filter(product => item.id !==product.id );
    setCart(updatedCart);
    Cookies.set('customerCart', JSON.stringify(updatedCart), { expires: 7 });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart , updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
