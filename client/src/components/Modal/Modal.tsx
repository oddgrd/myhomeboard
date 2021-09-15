import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from '../../styles/Modal.module.scss';
import { Backdrop } from './Backdrop';
import ReactDOM from 'react-dom';

interface Props {
  handleClose: () => void;
  children: React.ReactNode;
}
const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffnes: 500
    }
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
};

export const Modal = ({ handleClose, children }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = (
    <Backdrop onClick={handleClose}>
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {children}
      </motion.div>
    </Backdrop>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
};
