import React, { useContext, useState } from 'react';
import { Box, Button, Typography, Select, MenuItem, TextField, IconButton } from '@mui/material';
import useWindowDimensions from '../assets/useWindowDimensions';
import productInfo from '../assets/json/productData.json';
import '../style/item.css';
import Collage from './Collage/Collage';
import { Carousel, StyledButton } from './MUI';
import { CartContext } from '../context/CartContext';

export const currDict = {
    usd: '$',      // USA
    eur: '€',      // Europe
    thb: '฿',      // Thailand
    cny: '¥',      // China
    nis: '₪'       // Israel
  };

const createObjectFromList = (keysList, defaultValue = '', data)=> {
    if (!keysList?.length){
        return {}
    }
    return keysList.reduce((obj, key) => {
      obj[key] = data ? data[key][0]: defaultValue;
      return obj;
    }, {});
  }   

const Item = ({productData=productInfo[0] ,maxQuantity=10, minQuantity=1}) => {
    const [buyingOptions, setbuyingOptions] = useState(createObjectFromList(Object.keys(productData.buyingOptions),'',productData.buyingOptions));
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const {width} = useWindowDimensions();
    const [quantity, setQuantity] = useState(1);
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

    const onClickHandler = (e)=>{
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
        addToCart(customerRequest);
    }

  return (
    <div id='itemContainer' className="w-full mx-auto rounded-lg p-4 max-sm:px-0 max-sm:border-none">
       <div className="block flex-col md:flex-row">
         {/* Item options menu */}
         <div className="w-full z-40 p-4 h-fit mx-2 ml-8 float-right md:w-1/3  bg-gray-50 rounded-lg shadow-xl border">
          <Typography variant="h6" className="mb-2">Price: {currDict[productData.currency]}{productData.price}</Typography>
          {productData.discount && <Typography variant="body2" className="text-secondary mb-4">Discount: {Math.floor(100*(1-productData.price/productData.originalPrice))}%</Typography>}
            {/*    Select from produt's buying Options   */}
            {Object.keys(productData.buyingOptions).map((item,index)=>(
                <div key={index} className='my-4'>
                <Typography  variant="body1" className="mb-2">{`Select ${item}`}</Typography>
                    <Select
                        // defaultValue={productData.buyingOptions[item][0]}
                        value={buyingOptions[item]}
                        onChange={(e) => setbuyingOptions(p=>({...p, [item]: e.target.value}))}
                        fullWidth
                        className="mb-4"
                    >
                        {productData.buyingOptions[item].map((option, indx) => (
                        <MenuItem key={indx} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </div>
            ))}

          <Typography variant="body1" className="mb-2">Quantity</Typography>
          <div className="flex justify-center items-center mb-4">
            <IconButton 
            title='הורדת פריט'
            onClick={handleDecreaseQuantity} 
            disabled={quantity <= minQuantity} 
            sx = {{paddingX:'1em'}}
            className={quantity <= minQuantity ? 'opacity-80' : ''}>
              -
            </IconButton>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              inputProps={{ min: minQuantity, max: maxQuantity, className: 'text-center w-16' }}
              className="mx-2"
            />
            <IconButton 
             title='הוספת פריט'
            onClick={handleIncreaseQuantity} 
            disabled={quantity >= maxQuantity} 
            sx = {{paddingX:'1em'}}
            className={quantity >= maxQuantity ? 'opacity-80' : ''}>
              +
            </IconButton>
          </div>
          <div className='flex gap-4 my-4'>
          <Typography variant="body1" className="mb-2">Total Price: </Typography>
            <span>{currDict[productData.currency]}{Number(quantity*productData.price).toFixed(2)}</span>
            </div>

            <div className='flex justify-center'>
                <StyledButton
                onClick={onClickHandler}
                variant="contained"
                // fullWidth
            >
                Add to Cart
            </StyledButton>
            </div>
        </div>
         {/* Item Description and Creative */}
        <div className="w-full p-4 max-sm:py-8">
            <Typography sx={{fontWeight:'700'}} variant="h4" className="text-primary font-bold mb-4">{productData.title}</Typography>
            <Typography variant="body1" className="mb-4">{productData.description}</Typography>
            <Collage imageList={[process.env.PUBLIC_URL +productData.image,...productData.collageImage]} /> 
            {productData.video ?
                <div className="my-6 py-4 mx-auto max-sm:px0 overflow-hidden w-fit h-fit">
                <iframe 
                className='rounded-lg shadow-lg'
                width={2*width/3} 
                height={Math.min(2*width*0.7/3, 400)}
                src={productData.video} 
                title="Best Facebook Ads Strategy For Shopify Tutorial 2024 (Step-By-Step)" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen>
                </iframe>
            </div>: undefined}
            <Typography variant="body1" className="mb-4">{productData.descriptionBody}</Typography>
            {productData.carouselImage?.length >1 ?
                <Carousel arrows={Boolean(productData.carouselImage.length-1)} >
                    {productData.carouselImage.map((image, index) => (
                        <div key={index} className='flex justify-center'>
                            <img src={image} alt={`Product ${index+1}`} className="w-2/3 mx-auto rounded-md max-h-96" />
                        </div>
                    ))}
                </Carousel> :
                productData.carouselImage?.length  ?
                    <div className='flex justify-center'>
                        <img  src={productData.carouselImage[0]} alt={`Product ${1}`} className="max-w-full mx-auto rounded-2xl max-h-96" />
                    </div> : undefined
            }
        </div>
      </div>
    </div>
  );
};

export default Item;
