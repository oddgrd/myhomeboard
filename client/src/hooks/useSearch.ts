import { useEffect, useRef, useState } from 'react';

export const useSearch = () => {
  const [searchPattern, setSearchPattern] = useState('');
  const searchRef = useRef("");

  useEffect(() => {
    searchRef.current = window.localStorage.getItem('search') || "";
    setSearchPattern(searchRef.current);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('search', searchRef.current);
  }, [searchRef.current]);

  return [
    searchPattern, setSearchPattern, searchRef
  ] as const;
};