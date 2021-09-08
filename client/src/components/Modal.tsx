import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/Modal.module.scss';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ onClose, children }: Props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  const backDropHandler = (e: any) => {
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
    document.addEventListener('click', backDropHandler, true);
    return () => document.removeEventListener('click', backDropHandler, true);
  }, []);

  const modalContent = (
    <div className={styles.overlay}>
      <div className={styles.wrapper} ref={modalWrapperRef}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href='#' onClick={handleCloseClick} aria-label='Close Modal'>
              <FaTimes size={35} />
            </a>
          </div>
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
