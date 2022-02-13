import { useEffect, useRef, useState } from 'react';

export const useSorting = () => {
  const [sort, setSort] = useState('newest');
  const selectedSort = useRef('newest');
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);

  const selectSort = (sort: string) => {
    switch (sort) {
      case 'newest':
        selectedSort.current = "newest";
        setSort(selectedSort.current);
        break;
      case 'oldest':
        selectedSort.current = "oldest";
        setSort(selectedSort.current);
        break;
      case 'easiest':
        selectedSort.current = "easiest";
        setSort(selectedSort.current);
        break;
      case 'hardest':
        selectedSort.current = "hardest";
        setSort(selectedSort.current);
        break;
    }
    offsetRef.current = 0;
    setOffset(offsetRef.current);
  }

  useEffect(() => {
    selectedSort.current = window.localStorage.getItem('sort') || 'newest';
    setSort(selectedSort.current);
    offsetRef.current = parseInt(window.localStorage.getItem('offset') || '0');
    setOffset(offsetRef.current);
  }, [])

  useEffect(() => {
    window.localStorage.setItem('sort', selectedSort.current);
  }, [selectedSort.current]);
  useEffect(() => {
    window.localStorage.setItem('offset', offsetRef.current.toString());
  }, [offsetRef.current]);

  return [
    {
      selectedSort,
      offsetRef,
      sort
    },
    {
      selectSort
    },
  ] as const;
}
