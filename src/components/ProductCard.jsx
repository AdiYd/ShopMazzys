import React, {useState} from 'react';
import { StyledButton } from './MUI';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { currDict } from './Item';
import useWindowDimensions from '../assets/useWindowDimensions';


const SaleIcon = (...props) => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`w-9 text-green-700 -rotate-6 h-16 absolute opacity-80 -left-16 -bottom-8`}
    fill="currentColor"
  >
    <g transform="scale(-1, -1) translate(-24, -14)">
      <path d="M21.41,11.58,12.42,2.59A2,2,0,0,0,11,2H5A2,2,0,0,0,3,4V10a2,2,0,0,0,.59,1.41l9,9a2,2,0,0,0,2.83,0l6-6A2,2,0,0,0,21.41,11.58ZM6.5,8.5a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,6.5,8.5ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z" />
    </g>
    <text
      x="50%"
      y="100%"
      textAnchor="middle"
      fill="black"
      fontSize="9"
      fontWeight="bold"
    >
      Sale!
    </text>
  </svg>
);

const defaultImageClass = "w-full mx-auto max-h-56 shadow rounded-t-lg rounded-b-none object-cover";
const ProductCard = ({ 
  productData,
  imageAsUrl = false,
  minQuantity = 1,
  maxQuantity = 10,
  showProductCount = true ,
  showDescription = true,
  showOldPrice = true,
  showPrice = true, 
  showTitle = true,
  smallTitle = false,
  showButton = true,
  border=false,
  shadow = false,
  buttonText = 'הוספה לסל',
  onBtnClick = (e)=>{console.log(e.target?.innerText, ' Clicked!')},
  onClick,
  imageWidth,
  isSale = false,
  showDiscount = false,
  discountText = 'הנחה',
  imageClass =  defaultImageClass,
  containerClass='',
  cardHeight }) => {
    const [quantity, setQuantity] = useState(1);
    const {width, hight} = useWindowDimensions();
    const handleDecreaseQuantity = () => {
      if (quantity > minQuantity) {
      setQuantity(quantity - 1);
      }
  };

  const handleIncreaseQuantity = () => {
      if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
      }
  };

  const onClickHandler = ()=>{
    let buyingOptions ={};
    for (let catrgory in productData.buyingOptions){
      buyingOptions[catrgory] = productData.buyingOptions[catrgory][0]
    }
    let customerRequest = {
      image: process.env.PUBLIC_URL + productData.image,
      id: productData.id,
      title: productData.title,
      options: buyingOptions,
      quantity,
      currency: productData.currency,
      pricePerUnit: productData.price,
      total: Number(quantity*productData.price).toFixed(2)
  }
  console.log('This is Client request: ', customerRequest);
  onBtnClick(customerRequest)
  }

  let imageSrc = imageAsUrl ? productData.image : process.env.PUBLIC_URL+productData.image;
  return (
    productData && <div 
    className={`card mx-auto ${border ? 'border':''} ${shadow ? 'shadow-md':''} cursor-pointer ${containerClass}`} style={{height:cardHeight}}>
      {(productData.discount && showDiscount) && <button 
        className="absolute top-4 left-4 px-2 py-1 text-xs rounded-md bg-red-950 text-white">
        {`${Math.floor(100*(1-productData.price/productData.originalPrice))}% ${discountText}`}
      </button>}
      <div className="w-full block overflow-hidden">
      <img 
      onClick={onClick}
      id='cardImg' 
      src={imageSrc} 
      style={{width: width<300 ? `${width/2-10}px`: `${imageWidth}px`, height:imageWidth&&!imageClass ?`${0.8*imageWidth}px`:undefined }}
      alt={productData.name} className={`${imageClass}`} />
      </div>
      <div className='px-4 max-xs:px-1' onClick={onClick}>
        {showTitle&&!smallTitle ? 
        <>
          <p className="font-bold text-primary mb-2 mt-4 max-xs:mt-2 max-sm:text-base mx-auto max-xs:text-xs">
        {productData.title}</p>
        <hr className='mb-2 mt-0 mx-auto w-2/3 max-xs:hidden border-b' /></>
        : smallTitle && <p className='flex w-full my-4 max-xs:my-2 max-xs:text-xs text-sm text-start font-bold'>
          {productData.title}
        </p>}
        
        {showDescription &&<p className="text-gray-500 text-sm">{productData.description}</p>}
      </div>
      {showPrice && <div dir='ltr' onClick={onClick} className="mt-2 mx-auto flex justify-center">
        {(productData.originalPrice && showOldPrice) &&
        <div className="relative w-fit mx-auto max-sm:text-xs">
          {isSale &&  <SaleIcon />}
          <p className="line-through text-sm text-gray-500">
          {productData.originalPrice}</p>
        </div>}
        <p className="font-bold md:text-xl text-red-800 ml-2">{currDict[productData.currency]}{productData.price}</p>
      </div>}
        {(showProductCount && showButton )?  
              <div dir='ltr' className="flex w-auto mx-4 align-baseline max-xs:mx-1 justify-between items-center mt-2">
                 <div className='flex w-auto justify-center'>
                      <Button
                      size='small'
                      variant='contained' color='info'                
                      sx={{textWrap:'nowrap'}}  
                      onClick={onClickHandler}  className="btn-primary mx-2">{buttonText}</Button>
                  </div>
                  <div className="flex w-fit items-center">
                      <IconButton 
                       title='הורדת פריט'
                      onClick={handleDecreaseQuantity} 
                      disabled={quantity <= minQuantity} 
                      sx = {{paddingX:'0.5em'}}
                      className={quantity <= minQuantity ? 'opacity-80' : ''}>
                        -
                      </IconButton>
                      <TextField
                        type="number"
                        fullWidth={true}
                        value={quantity}
                        sx={{width:'fit-content'}}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        inputProps={{ min: minQuantity, max: maxQuantity, className: 'text-center w-8' }}
                        // className="mx-2"
                      />
                      <IconButton 
                       title='הוספת פריט'
                      onClick={handleIncreaseQuantity} 
                      disabled={quantity >= maxQuantity} 
                      sx = {{paddingX:'0.5em'}}
                      className={quantity >= maxQuantity ? 'opacity-80' : ''}>
                        +
                      </IconButton>
                  </div>
             </div> : 
             <div className='mt-2 mx-2 items-center w-auto p-0 mb-0'>
                    <Button
                    size='small'
                    variant="contained" 
                    color='info'
                    onClick={onClickHandler} 
                    sx={{textWrap:'nowrap'}}  
                    className="btn-primary w-2/3 rounded-md self-center mx-auto">{buttonText}</Button>
              </div>
             }

    </div>
  );
};

export default ProductCard;
