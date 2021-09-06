import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/Modal.module.scss';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}
export default function Modal({ onClose, children, title }: Props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  const backDropHandler = (e: any) => {
    console.log('still goin');
    if (!modalWrapperRef?.current?.contains(e.target)) {
      onClose();
    }
  };
  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    setIsBrowser(true);
    document.addEventListener('click', backDropHandler);
    return () => document.removeEventListener('click', backDropHandler);
  }, []);

  const modalContent = (
    <div className={styles.overlay}>
      <div className={styles.wrapper} ref={modalWrapperRef}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href='#' onClick={handleCloseClick}>
              <FaTimes />
            </a>
          </div>
          {title && <div>{title}</div>}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
}

// https://devrecipes.net/modal-component-with-next-js/
