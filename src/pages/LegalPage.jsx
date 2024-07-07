import React, { useState, useEffect } from 'react';
import legalData from '../assets/json/legal.json';
import '../style/index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const LegalPage = ({ section }) => {
  const [content, setContent] = useState({});
  const navigate = useNavigate();
  const url = useLocation();
  const getQuery = () => {
    return new URLSearchParams(url.search);
  };
  const [language, setLanguage] = useState(getQuery().get('lang') ||'he');
  
  useEffect(() => {
    setLanguage(getQuery().get('lang') ||'he');
    const selectedContent =  legalData[language] ? legalData[language][section] : legalData[section];
    setContent(selectedContent);
  }, [section, language, url]);

  const handleLanguageChange = (e) => {
    let pathName = `${url.pathname}?lang=${e.target.value.slice(0,2)}`;
    console.log(pathName);
    navigate(pathName);
    // setLanguage();
    return
  };

  return (
    <div className="pageContainer">
      <div className="flex justify-start">
      <FormControl variant="outlined" color='success'>
      <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language"
            value={language === 'he' ? 'hebrew':'english'}
            onChange={handleLanguageChange}
            label="Language"
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="hebrew">עברית</MenuItem>
          </Select>
    </FormControl>
      </div>
      <div dir="auto">
        <h1 className="text-3xl font-bold mt-4">{content?.title}</h1>
        <p className="mt-4">{content?.content}</p>
      </div>
    </div>
  );
};

export default LegalPage;
