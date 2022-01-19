import { useEffect, useRef, useState } from 'react';

export const useSorting = () => {
  const [order, setOrder] = useState('DESC');
  const selectedOrder = useRef('DESC');
  const selectedSort = useRef('DATE');
  const offsetRef = useRef(0);
  const [gradeState, setGradeState] = useState(0);
  const gradeStateRef = useRef(0);

  const toggleDateSort = () => {
    if (selectedSort.current === "GRADE") {
      selectedOrder.current = "ASC";
    } else {
      selectedOrder.current = selectedOrder.current === 'DESC' ? 'ASC' : 'DESC';
    }
    setOrder(selectedOrder.current);
    selectedSort.current = 'DATE';
    offsetRef.current = 0;
    gradeStateRef.current = 0;
    setGradeState(gradeStateRef.current);
  };

  const toggleGradeSort = () => {
    selectedSort.current = 'GRADE';
    offsetRef.current = 0;
    
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
    offsetRef.current = 0;
    gradeStateRef.current = 0;
    setGradeState(gradeStateRef.current);
  };

  useEffect(() => {
    selectedOrder.current = window.localStorage.getItem('order') || 'DESC';
    setOrder(selectedOrder.current);
    gradeStateRef.current = parseInt(
      window.localStorage.getItem('gradeState') || '0'
    );
    setGradeState(gradeStateRef.current);
    selectedSort.current = window.localStorage.getItem('sort') || 'DATE';
    offsetRef.current = parseInt(window.localStorage.getItem('offset') || '0');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('sort', selectedSort.current);
  }, [selectedSort.current]);
  useEffect(() => {
    window.localStorage.setItem('offset', offsetRef.current.toString());
  }, [offsetRef.current]);
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
      toggleDateSort,
      resetSort,
      toggleGradeSort,
    },
  ] as const;
};
