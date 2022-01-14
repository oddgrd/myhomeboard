import { useEffect, useRef, useState } from 'react';

export const useSorting = () => {
  const [order, setOrder] = useState('DESC');
  const selectedOrder = useRef('DESC');
  const [sort, setSort] = useState('DATE');
  const selectedSort = useRef('DATE');
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const [gradeState, setGradeState] = useState(0);
  const gradeStateRef = useRef(0);

  const toggleDateSort = () => {
    selectedSort.current = 'DATE';
    setSort(selectedSort.current);
    selectedOrder.current = selectedOrder.current === 'DESC' ? 'ASC' : 'DESC';
    setOrder(selectedOrder.current);
    offsetRef.current = 0;
    setOffset(offsetRef.current);
    gradeStateRef.current = 0;
    setGradeState(gradeStateRef.current);
  };

  const toggleGradeSort = () => {
    selectedSort.current = 'GRADE';
    setSort(selectedSort.current);
    offsetRef.current = 0;
    setOffset(offsetRef.current);

    if (gradeStateRef.current === 0) {
      gradeStateRef.current += 1;
      setGradeState(gradeStateRef.current);
      selectedOrder.current = 'DESC';
      setOrder(selectedOrder.current);
    } else if (gradeStateRef.current === 1) {
      gradeStateRef.current += 1;
      setGradeState(gradeStateRef.current);
      selectedOrder.current = 'ASC';
      setOrder(selectedOrder.current);
    } else {
      resetSort();
    }
  };

  const resetSort = () => {
    selectedOrder.current = 'DESC';
    setOrder(selectedOrder.current);
    selectedSort.current = 'DATE';
    setSort(selectedSort.current);
    offsetRef.current = 0;
    setOffset(offsetRef.current);
    gradeStateRef.current = 0;
    setGradeState(gradeStateRef.current);
  };

  useEffect(() => {
    selectedOrder.current = window.localStorage.getItem('order') || 'DESC';
    setOrder(selectedOrder.current);
    selectedSort.current = window.localStorage.getItem('sort') || 'DATE';
    setSort(selectedSort.current);
    offsetRef.current = parseInt(window.localStorage.getItem('offset') || '0');
    setOffset(offsetRef.current);
    gradeStateRef.current = parseInt(
      window.localStorage.getItem('gradeState') || '0'
    );
    setGradeState(gradeStateRef.current);
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
  useEffect(() => {
    window.localStorage.setItem('gradeState', gradeStateRef.current.toString());
  }, [gradeState]);

  return [
    {
      selectedOrder,
      selectedSort,
      offsetRef,
      gradeStateRef,
    },
    {
      setOffset,
      toggleDateSort,
      resetSort,
      toggleGradeSort
    },
  ] as const;
};
