// GoogleAnalytics.js

import React, { useEffect } from 'react';

const GoogleAnalytics = ({trackingID = 'G-E4230GM7MR'}) => {
  useEffect(() => {
    // This is your Google Analytics script

        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingID}`;
        script.async = true;
        script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        // eslint-disable-next-line no-undef
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', `${trackingID}`);
        };
        document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default GoogleAnalytics;
