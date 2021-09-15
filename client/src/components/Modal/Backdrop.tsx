import { motion } from 'framer-motion';
import styles from '../../styles/Modal.module.scss';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}
export const Backdrop = ({ children, onClick }: Props) => {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
