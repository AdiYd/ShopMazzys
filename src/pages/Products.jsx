import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Typography } from '@mui/material';
import products from '../assets/json/productData.json';
import { useLocation, useNavigate } from 'react-router-dom';
import Item from '../components/Item';
import { CartContext } from '../context/CartContext';
import { generateImageUrls } from '../components/Collage/Collage';

const productsName = products.map(item=>item.title);

const scrollToSection = (targetID = 'itemContainer') => {
  const section = document.getElementById(targetID);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const imageList = generateImageUrls(products.length);

const Products = ({productName}) => {
  const [product, setProduct] = useState(productName);
  const {cart, addToCart, removeFromCart} = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location, ' <-- This is your location')
  useEffect(()=>{
      if (product !== productName && productsName.includes(productName)){
        setProduct(productName);
      }
  },[productName, product])

const onAddToCartClick = (customerRequest)=>{
    addToCart(customerRequest);
}

  return (
    <div className="pageContainer max-sm:px-4 max-xs:px-1">
    <div className="text-center mb-8 mt-4 fade-in ">
      <h1 className="text-3xl font-bold text-primary ">Our Products</h1>
      <p className="text-lg mb-6">
        Our products carefully picked and designed to enrich your lifestyle and well-being. With our innovative and eco-friendly products. Designed to boost your energy levels, our collection features cool gadgets that promote relaxation, tranquility, and a healthier lifestyle.
      </p>
    </div>
    <div className='m-4 max-sm:mx-0 rounded-lg'>
      { products.map((item, indx)=> item.title === product ? 
      <Item key={indx} productData={item} />:undefined)}
    </div>
    {productsName.includes(product) &&
      <h2 className="text-2xl font-bold text-primary mb-4">מומלצים עבורך:</h2>}
      <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-2 max-sm:gap-1">
          {products.map((item, index) => (
             (
              index <102 &&<ProductCard
                key={index+item.price}
                buttonText="פרטים נוספים"
                showPrice={false}
                onBtnClick={() => { navigate(`מוצרים/${item.title}`); }}
                imageClass="w-52 h-52 mx-auto rounded-t-lsm rounded-b-none object-cover"
                containerClass='width-44 rounded-sm'
                // className="w-4 rounded-t-lg rounded-b-none"
                showProductCount={false}
                isSale={true}
                imageAsUrl
                showDiscount={item.id === 20}
                productData={{...item, image:imageList[index]}}
              />
            )
          ))}
        </div>


      <div className="p-4 flex gap-x-4 flex-wrap gap-y-8 justify-around max-sm:p-8">
        {products?.map((product,indx) => {
          return(
          <ProductCard 
          imageAsUrl
          containerClass='h-auto min-w-64 max-xs:w-5/6'
          onClick={()=>{navigate(`/מוצרים/${product.title}`); setTimeout(()=>{scrollToSection()},200)}}
          shadow
          onBtnClick={onAddToCartClick}
          key={indx}  
          productData={{...product, image: imageList[indx]}} />
        )})}
      </div>
    </div>
  );
};

export default Products;
