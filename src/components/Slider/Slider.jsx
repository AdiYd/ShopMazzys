import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './Slider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useWindowDimensions from '../../assets/useWindowDimensions';


export const SwiperCarousel = ({children,...props}) => {
    const {width} = useWindowDimensions();
  return (
    <div className="swiper-container relative w-full">
      <Swiper
          className='scroll-my-4 py-4 w-5/6 static max-sm:w-full max-sm:mx-1'
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={15}
          slidesPerView='auto'
          navigation = {width>680}  //Arrows
          pagination={width >680 && {dynamicBullets:false, clickable:true}} //Dots
          scrollbar={width<=680 && {draggable: true}} //Bar
          freeMode={true}
          freemodemomentum='true'
          freemodesticky='true'
          cssMode={true}
          resistance={true}
          resistanceRatio={0.5}
          speed={300}  // Adjust the speed to make the transition smoother
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          {...props}
        >
        {children.map((item, index)=>(
            <SwiperSlide key={index} className='flex h-auto my-4 max-w-fit justify-center'>
                {item}
            </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};