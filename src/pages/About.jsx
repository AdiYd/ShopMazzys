import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLightbulb, faGlobe, faSpa, faBed, faBrain, faLeaf, faStar, faSmile, faRecycle } from '@fortawesome/free-solid-svg-icons';
import aboutContent from '../assets/json/About.json';
import contact from '../assets/json/contact.json';
import { ContactUs } from './Contact';

const AboutSection = ({ section }) => {
  const iconMap = {
    faHeart,
    faLightbulb,
    faGlobe,
    faSpa,
    faBed,
    faBrain,
    faLeaf,
    faStar,
    faSmile,
    faRecycle
  };
  return (
    <section className="mb-12">
      <h2 className="sectionTitle">{section.title}</h2>
      {section.description && <p className=" text-start mb-6">{section.description}</p>}
      {section.items && (
        <ul className="list-disc list-inside  mx-12 max-sm:mx-4 max-w-screen-md">
          {section.items.map((item, index) => (
            <li key={index} className="flex items-start mb-4 max-sm:flex-col">
              <div className='flex gap-4'>
                <FontAwesomeIcon 
                color = {item.color}
                icon={iconMap[item.icon]} 
                className="mr-2 mt-1" />
                <span className="font-semibold text-primary-dark">{item.title}:</span>
              </div>
              <span className="ml-2">{item.text}</span>
            </li>
          ))}
        </ul>
      )}
      {section.additionalText && <p className=" text-start">{section.additionalText}</p>}
    </section>
  );
};


const About = () => {
  return (
    <div dir='auto' className="pageContainer max-sm:px-4">
     <div className="text-center mb-8 mt-4 fade-in">
        <h1 className="text-3xl text-primary font-bold text-center mb-8">אודותינו</h1>
        <p className="text-center mb-12">
          ברוכים הבאים ל-ShopMazzys, המקום שבו יופי ואורח חיים נפגשים. המסע שלנו החל עם משימה פשוטה: לשפר את היופי והאורח חיים של נשים בכל רחבי העולם. היום, אנו גאים להיות מובילים עולמיים במתן מוצרים איכותיים לטיפוח ויופי שהפכו את חייהן של נשים רבות לטובים יותר.
        </p>
      </div>
      <div className="text-start">
        <section className="mb-12">
          <div className="flex gap-4">
            {/* <Logo /> */}
            <h2 className="sectionTitle">הסיפור שלנו</h2>
          </div>
          <p className="text-start">
            מהתחלות צנועות, ShopMazzys מונעת על ידי תשוקה ליצירת עולם יפה ושליו. המייסדת שלנו, בהשראת חוויות אישיות עם לחץ וחרדה, חלמה על מותג שיכול להציע הקלה והתחדשות לנשים בכל מקום. התחלנו את המסע שלנו במוסך קטן, מונעים על ידי חלום לעזור לקהילות ברחבי העולם למצוא שלווה פנימית עם המוצרים שלנו.
          </p>
          <p className="text-start">
            עם צוות מסור של מומחים בטיפוח ויופי, יצאנו למסע לעצב מוצרים שמשלבים את ההתקדמות החדשות ביותר עם טכניקות יופי עתיקות. תמיד בחיפוש אחר חדשנות בתחום היופי, אנו שואפים לשפר את חוויית היופי של לקוחותינו, ולהפוך את בתיהם למקומות של שלווה ויופי.
          </p>
        </section>



        <div>
          {aboutContent.he.sections.map((section, index) => (
            <AboutSection key={index} section={section} />
          ))}
        </div>
        <div className='w-3/4 mx-auto rounded-lg shadow max-sm:w-full'>
          <ContactUs whatsApp data={contact} />
        </div>
      </div>
    </div>
  );
}

export default About;