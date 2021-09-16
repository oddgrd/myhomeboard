import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from '../../styles/Modal.module.scss';
import { Backdrop } from './Backdrop';
import ReactDOM from 'react-dom';

interface Props {
  handleClose: () => void;
  children: React.ReactNode;
  variants?: Variants;
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
      type: 'spring',
      damping: 16
    }
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
};

export const Modal = ({ handleClose, children, variants }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = (
    <Backdrop onClick={handleClose}>
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        variants={variants || dropIn}
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
