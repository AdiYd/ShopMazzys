import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { currDict } from '../components/Item';
import DeleteIcon from "@mui/icons-material/Delete";
import {  TextField, Checkbox, FormControlLabel, Box, Typography, Button, IconButton, Autocomplete} from '@mui/material';
import AddressForm from '../components/AddressForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';



const emptyBag = <svg className="w-24 h-24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor">
  <path fill="currentColor" fillRule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"/>
</svg>

const refBagFull = (itemCount)=> 
<svg className=" w-20 h-20" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="red">
  <path fill="currentColor" fillRule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z">
  </path>
  <circle cx="30" cy="10" r="7" fill="#EEB85D"/>
  <text x="30" y="10" textAnchor="middle" dy=".3em" fontSize="10" fontWeight={'700'} fill="#17332A">{itemCount}</text>
</svg>


const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateCart } = useContext(CartContext);

  let itemSum, cartItems, fullBagSection, totalPrice, totalItems;
  

  const handleQuantityChange = (item, type) => {
        let total = 0, quantity = 0;
        if (type === 'add'){
           quantity = item.quantity +1;
           total = Number(quantity*item.pricePerUnit).toFixed(2);
          updateCart({
            ...item,
            quantity,
            total : Number(quantity*item.pricePerUnit).toFixed(2)
          })
        }
        else if (type === 'remove'){
          quantity = item.quantity -1;
          total = Number(quantity*item.pricePerUnit).toFixed(2);
          updateCart({
            ...item,
            quantity,
            total
          })
        }
  };

  if (cart?.length){
    
    totalPrice = 0;
    totalItems = 0;
    console.log(cart);
    for (let item of cart){
      console.log(item.total, item.quantity);
      totalPrice = Number(totalPrice) + Number(item.total);
      totalItems = Number(totalItems) + Number(item.quantity);
    }
    totalPrice = totalPrice.toFixed(2);
    cartItems = <ul className='w-full'>
    {cart.map((item, indx) => (
     <li className=' block p-2 m-2 border-b' key={indx}>
          <div className='float-left top-4 max-xs:top-2'>
              <img className='w-20 h-20 rounded-2xl border shadow-lg' src={item.image} alt={item.title} />
              <div className='flex mt-8 max-xs:mt-4 max-xs:mb-2'>
                   <p className='text-primary font-bold'>סה"כ: ${(item.pricePerUnit * item.quantity).toFixed(2)}</p>
              </div>
          </div>
          <div className='pr-8'>
              <h4 className='text-start text-primary'>{item.title}</h4>
              <div>
                  <div>
                    {item.options && Object.keys(item.options).map((option, index)=>(
                      <span key={index} className=' text-sm flex gap-2'>
                      <p className='text-primary text-sm font-bold'>{option}:</p>
                      <p className='text-sm'>{item.options[option]}</p>
                      </span>
                    ))}
                  </div>
                  <div className='flex items-center gap-2 max-2xs:flex-col max-2xs:items-start'>
                      <p className='text-primary text-sm font-bold'>כמות:</p>
                      <div className='flex items-center border'>
                            <IconButton 
                            title='הורדת פריט'
                            onClick={(e)=>handleQuantityChange(item, 'remove')} 
                            disabled={item.quantity <= 1} 
                            sx = {{paddingX:'0.5em'}}
                            className={item.quantity <= 1 ? 'opacity-80' : ''}>
                              -
                            </IconButton>
                            <p
                                className='px-2'>
                                {item.quantity}
                            </p>
                            <IconButton 
                            onClick={(e)=>handleQuantityChange(item, 'add')} 
                              title='הוספת פריט'
                            disabled={item.quantity >= 10} 
                            sx = {{paddingX:'0.5em'}}
                            className={item.quantity >= 10 ? 'opacity-80' : ''}>
                              +
                            </IconButton>
                      </div>
                      <div className=''>
                      <IconButton
                          onClick={()=>{removeFromCart(item)}}
                          title='הסרת פריט'
                          sx={{marginRight: '2rem', cursor:'pointer'}}
                          color='primary'>
                          <FontAwesomeIcon 
                          icon={faTrashCan} size='sm' color='inherit' />
                      </IconButton>
                    </div>
                  </div>
              </div>
          </div>
       </li>
         ))}
                </ul> 
     itemSum = <div className='mx-4 p-4 border rounded-md max-sm:m-2 max-sm:border-none'>
              <h3 className='text-start text-lg font-bold text-primary my-4'>
              סה"כ פריטים בסל:  {totalItems}</h3>
              <h3 className='text-start text-lg font-bold text-primary my-4'>
              מחיר כולל:  {currDict[cart[0].currency]}{totalPrice}</h3>
              <Button
              className='max-sm:text-sm'
              sx={{textWrap:'nowrap'}} 
              variant="contained" color="success">
                לתשלום
              </Button>
                <div className='my-2 bg-neutral-100/50 max-sm:m-auto'>
                  <AddressForm />
                </div>
               </div>

    fullBagSection = <div className='flex justify-around max-sm:block'>
                        {cartItems}
                        {itemSum}
                      </div>
  }

  let emptyBagSection = <div className='m-3 items-center content-center'>
                            <p className='mb-6'>הסל שלך ריק </p>
                            <div className='flex justify-center gap-8'>
                                <Link to={"/מוצרים"}>
                                  <Button variant='contained' color='info'> לדף המוצרים</Button>
                                </Link>
                                <Link to={"/דף-הבית"}>
                                <Button variant='contained' color='secondary'> לדף הבית</Button>
                                </Link>
                            </div>
                        </div>



  return (
   <div className='p-4 items-center text-center max-sm:p-0 max-w-full'>
      <Typography variant='h4'  className="font-bold text-primary ">סל הקניות</Typography>
      <div className='flex justify-center'>
      {!cart.length ? refBagFull(0) : refBagFull(cart.length)}
      </div>
      {cart.length === 0 ? 
              emptyBagSection
             : 
              fullBagSection}
    </div>);
};

export default CartPage;
