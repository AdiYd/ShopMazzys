import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInstagram, faFacebook, faTiktok} from '@fortawesome/free-brands-svg-icons';
import footerContent from './footerContent.json';
import { Link } from 'react-router-dom';

const SocialIcons = () => (
  <div className="flex w-full justify-between gap-2">
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} size="xl" className="text-pink-500 hover:fill-slate-200" />
    </a>
    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faTiktok} size="xl" className="text-black hover:fill-slate-200" />
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faFacebook} size="xl" className="text-blue-600 hover:fill-slate-200" />
    </a>
  </div>
);



const Footer = () => {
  const [language, setLanguage] = useState('he');
  const content = footerContent[language];
  return (
    <footer className="bg-white border-t shadow-lg  text-primary-light p-4 pt-8">
      <div style={{direction: language === 'he' ? '':'auto'}}  className="flex justify-between items-center">
        <div className='w-3/4'>
          <h2 className="font-bold my-4">ShopMazzys</h2>
          <ul className='flex gap-4 max-sm:flex-col text-sm'>
            <li><Link to={`תנאי-שימוש?lang=${language}`} className="footerLink">{content.termsOfService}</Link></li>
            <li><Link to={`עוגיות?lang=${language}`} className="footerLink">{content.cookiesPolicy}</Link></li>
            <li><Link to={`הצהרת-פרטיות?lang=${language}`} className="footerLink">{content.privacyPolicy}</Link></li>
            <li><Link to={`הצהרת-נגישות?lang=${language}`} className="footerLink">{content.accessibilityStatement}</Link></li>
          </ul>
        </div>
        <div className='w-1/4 px-2 text-center max-sm:w-1/2'>
            <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
