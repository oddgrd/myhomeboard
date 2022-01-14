import { useEffect, useRef, useState } from 'react';

export const useSorting = () => {
  const [order, setOrder] = useState('DESC');
  const selectedOrder = useRef('DESC');
  const [sort, setSort] = useState('DATE');
  const selectedSort = useRef('DATE');
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  
  const toggleOrder = () => {
    selectedOrder.current = selectedOrder.current === 'DESC' ? 'ASC' : 'DESC';
    setOrder(selectedOrder.current);
  };

  const resetSort = () => {
    selectedOrder.current = 'DESC';
    setOrder(selectedOrder.current);
    selectedSort.current = 'DATE';
    setSort(selectedSort.current);
    offsetRef.current = 0;
    setOffset(offsetRef.current);
  }
  
  useEffect(() => {
    selectedOrder.current = window.localStorage.getItem('order') || 'DESC';
    setOrder(selectedOrder.current);
    selectedSort.current = window.localStorage.getItem('sort') || 'DATE';
    setSort(selectedSort.current);
    offsetRef.current = parseInt(window.localStorage.getItem('offset') || '0');
    setOffset(offsetRef.current);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('sort', selectedSort.current);
  }, [sort]);
  useEffect(() => {
    window.localStorage.setItem('offset', offsetRef.current.toString());
  }, [offset]);
  useEffect(() => {
    window.localStorage.setItem('order', selectedOrder.current);
  }, [order]);

  return [
    {
      order, selectedOrder, sort, selectedSort, offset, offsetRef
    }, {
      setOrder, setSort, setOffset, toggleOrder, resetSort
    }
  ] as const;
}