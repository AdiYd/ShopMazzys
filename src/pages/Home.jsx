import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../assets/json/productData.json';
import customeRec from '../assets/json/customersRec.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGift, faL } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../assets/useWindowDimensions';
import { SwiperCarousel } from '../components/Slider/Slider';
import { colors } from '@mui/material';

export const mazzysLogo = ({flowerColor='#F4CBCB',width=200,height=100 , r=10 ,textColor, showText = true, showLogo=true,shadow = false, ...props}={})=>{
  const cx = width / 2;
  const cy = showText ? height / 3 : height/2;

  return (
    <svg id='Logo' width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...props} xmlns="http://www.w3.org/2000/svg">
      {showLogo && <g className={`${shadow ? 'dropShadow':''} cursor-pointer`}>
      {/* <circle className='' style={{fill: flowerColor}} cx={cx} cy={cy - 1.8 * r} r={r} />
      <circle className='' style={{fill: flowerColor}} cx={cx} cy={cy + 1.8 * r} r={r} /> */}
      <circle className='' style={{fill: flowerColor}} cx={cx - 1.4 * r} cy={cy - 1.1*r} r={r} />
      <circle className='' style={{fill: flowerColor}} cx={cx + 1.4 * r} cy={cy - 0.9*r} r={r} />
      <circle className='' style={{fill: flowerColor}} cx={cx - 1.4 * r} cy={cy + 0.9*r} r={r} />
      <circle className='' style={{fill: flowerColor}} cx={cx + 1.4 * r} cy={cy + 1.1*r} r={r} />
      <circle cx={cx} cy={cy} r={r} fill={'currentColor'}/>
      </g>}
      {showText &&
      <text color ={textColor || 'currentColor'} className="textLogo text-primary-orange" x={cx + width / 4} y={cy + height / 2}>MAZZY'S</text>}
    </svg>
  );
}



const Home = () => {
  const navigate = useNavigate();
  const {width} = useWindowDimensions();

  const onSumbitfunction = (event)=>{
    event.preventDefault();
    const data = new FormData(event.target);
    const formObject = Object.fromEntries(data.entries());
    console.log(formObject);
  }

  return (
    <div className="">
        <HomeContentHeb 
          navigate ={navigate}
          onSumbitHandler={onSumbitfunction}
          width={width} />
    </div>
  );
};

export default Home;


const HomeContentHeb = ({navigate, width, onSumbitHandler}) => (
  <div className="pageContainer max-sm:px-0">
    <header className="text-center mb-8 mt-4 fade-in">
      <div className='flex justify-center'>
      {mazzysLogo({className:'cursor-ponter', shadow: true})}
      </div>
      <h1 className="hidden">Mezzys</h1>
      <h2 className="mt-4 text-xl">היעד שלך ליופי וטיפוח</h2>
    </header>

    <section className="mb-12 max-sm:px-8">
      <h2 className="text-2xl font-bold text-primary mb-4">המשימה שלנו</h2>
      <p className="text-neutral-dark">
        ב-Mezzys, אנו מחויבים לשפר את רווחתך באמצעות מוצרים חדשניים ליופי ואסתטיקה שמשלבים טכנולוגיה מודרנית עם טכניקות יופי נצחיות. המשימה שלנו היא לעזור לך למצוא רוגע והקלה מהלחצים של חיי היומיום.
      </p>
    </section>

    <section className="mb-12 max-sm:px-2">
      <h2 className="text-2xl font-bold text-primary mb-4">מוצרים נבחרים</h2>
      <div className="flex flex-wrap justify-around justify-items-center gap-4">
        <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-2 max-sm:gap-2">
          {products.map((item, index) => (
            item.id < 31 && (
              <ProductCard
                key={index}
                buttonText="פרטים נוספים"
                showPrice={false}
                onBtnClick={() => { navigate(`מוצרים/${item.title}`); }}
                imageClass="w-full h-52 mx-auto rounded-t-lg rounded-b-none object-cover"
                containerClass='width-44 shadow-md rounded-lg'
                className="w-4 rounded-t-lg rounded-b-none"
                showProductCount={false}
                isSale={true}
                showDiscount={item.id === 20}
                productData={item}
              />
            )
          ))}
        </div>
      </div>
    </section>

    <section className="mb-12 max-sm:px-8">
      <h2 className="text-2xl font-bold text-primary text-center mb-4">מבצעי הנחות מיוחדים</h2>
      <div className="flex relative items-center my-8 justify-around flex-wrap gap-4">
        <div className="w-11/12 mx-auto max-sm:w-full">
          <SwiperCarousel>
            {products.map((item, index) => (
              <ProductCard
                key={index}
                buttonText="פרטים נוספים"
                showPrice={true}
                showTitle={false}
                smallTitle={true}
                showDescription={false}
                imageWidth={250}
                imageClass="w-full h-52 mx-auto rounded-t-lg rounded-b-none object-cover"
                containerClass='width-44 shadow-md rounded-lg'
                onBtnClick={() => { navigate(`מוצרים/${item.title}`); }}
                showProductCount={false}
                isSale={false}
                showDiscount={item.id === 20}
                productData={item}
              />
            ))}
          </SwiperCarousel>
        </div>
      </div>
    </section>

    <section className="mb-12 max-sm:px-4">
      <h2 className="sectionTitle">המלצות לקוחות</h2>
      <SwiperCarousel >
      {customeRec.map((item, index)=>(
        <div key={index} className="bg-neutral-50 p-6 w-80 rounded-lg shadow-md">
            <blockquote 
            style={{borderColor: item.borderColor}}
            className="text-neutral-dark italic border-r-4 border-primary pr-4">
            {item.quote}
            </blockquote>
            <p className="mt-2 text-left text-neutral-dark">- {item.author}</p>
        </div>
      ))}
      </SwiperCarousel>
      

{/* 
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <blockquote className="text-neutral-dark italic border-r-4 border-primary pr-4">
          "המוצרים של Mezzys עזרו לי לשפר את מראה העור והאסתטיקה הכללית. פשוט מדהים!"
        </blockquote>
        <p className="mt-2 text-left text-neutral-dark">- יוחנן ד.</p>
      </div> */}
    </section>

    <section className="bg-primary/90 text-primary-white fill-primary-white p-6 text-center border rounded-2xl w-4/5 mx-auto max-sm:w-full max-sm:px-4 max-sm:border-none max-sm:rounded-none">
      <div className="items-center justify-center gap-8 mb-8 max-sm:gap-4">
        <FontAwesomeIcon 
         className="shake mb-4 text-orange-400" 
         icon={faBell} size="xl" color="inherit" />
        <h2 dir='rtl' className="text-xl">🎁 &nbsp; הירשמו למבצעים והנחות &nbsp; 🎉</h2>
      </div>
      <form dir='rtl' onSubmit={onSumbitHandler} className="flex flex-col md:items-center md:space-x-4 max-sm:flex-col">
        <div className="flex items-center text-black justify-around w-full max-sm:flex-col">
          <input
            type="name"
            name='name'
            required
            placeholder="שם"
            className="focus-visible:outline-primary-orange text-center inputField my-2 w-2/5 max-sm:w-4/5 max-sm:mx-auto"
          />
          <input
            dir='ltr'
            type="email"
            name="email"
            required
            placeholder="אימייל"
            className="focus-visible:outline-primary-orange text-center inputField my-2 w-2/5 max-sm:w-4/5 max-sm:mx-auto"
          />
          <button type='submit' className="cool-button my-2 text-sm h-min p-2 max-sm:w-4/5 max-sm:m-auto">הרשמו</button>
        </div>
        <label className="flex justify-center my-4 items-center">
          <input name="updateMe" type="checkbox" defaultChecked className="mr-2" />
          עדכן אותי במוצרים חדשים
        </label>
      </form>
    </section>
  </div>
);



