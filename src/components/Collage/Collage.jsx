import React, { useEffect, useState } from 'react';
import './Collage.css';
const [maxHeight, maxWidth] = ['200px', 'none'];

const generateImageUrls = (count) => {
  const urls = [];
  for (let i = 0; i < count; i++) {
    const width = Math.floor(Math.random() * 200) + 100; // Random width between 300 and 500
    const height = Math.floor(Math.random() * 200) + 100; // Random height between 300 and 500
    urls.push(`https://picsum.photos/${width}/${height}`);
  }
  return urls;
};

const Collage = ({imageList=[], count=4}) => {
  const [images, setImages] = useState(imageList);

  useEffect(() => {
    if (!(imageList.length-1)){
      const imageUrls = generateImageUrls(count);
      setImages([...imageList,...imageUrls]);
    }
  }, []);

  return (
    <div className="collage-container">
      <div className={`collage-item w-fit h-fit mx-auto shadow-md hover:shadow-lg collage-item-main`}>
          <img src={images[0]}
          style={{maxHeight: maxHeight, maxWidth: maxWidth}}
           alt={`Item main`} className="collage-img" />
        </div>
      {images.map((src, index) => (
        index>0 && <div key={index} className={`collage-item w-fit h-fit mx-auto shadow-md hover:shadow-lg collage-item-${index % 5}`}>
          <img src={src}
          style={{maxHeight: maxHeight, maxWidth: maxWidth}}
           alt={`Collage ${index}`} className="collage-img max-sm:h-auto max-sm:w-full" />
        </div>
      ))}
    </div>
  );
};

export default Collage;
