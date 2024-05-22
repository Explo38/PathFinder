// AnalyticsListener.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-HG7RMKC4WD";
ReactGA.initialize(TRACKING_ID);

const AnalyticsListener = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
};

export default AnalyticsListener;
