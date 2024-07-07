import React, { useState, useEffect } from 'react';
import legalData from '../assets/json/legal.json';
import '../style/index.css';

const LegalPage = ({ section }) => {
  const [content, setContent] = useState({});
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    console.log(section);
    const selectedContent =  legalData[language] ? legalData[language][section] : legalData[section];
    console.log('selected: ', selectedContent);
    setContent(selectedContent);
  }, [section, language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="pageContainer">
      <div className="flex justify-end">
        <label htmlFor="language" className="mr-2">Language:</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="hebrew">Hebrew</option>
        </select>
      </div>
      <div dir="auto">
        <h1 className="text-3xl font-bold mt-4">{content?.title}</h1>
        <p className="mt-4">{content?.content}</p>
      </div>
    </div>
  );
};

export default LegalPage;
