import { useState, useEffect } from 'react';
import { isServer } from '../utils/isServer';

export default function useWindowDimensions() {
  const [width, setWidth] = useState(!isServer() ? window.innerWidth : 1920);
  const [height, setHeight] = useState(!isServer() ? window.innerHeight : 1080);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return { width, height };
}
