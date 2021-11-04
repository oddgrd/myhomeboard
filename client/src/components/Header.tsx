import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import styles from '../styles/Header.module.scss';
import { DropdownMenu } from './DropdownMenu';
import { Modal } from './Modal/Modal';

interface Props {
  navTitle?: string;
  children?: React.ReactNode;
}

export const Header = ({ navTitle, children }: Props) => {
  const [menuModal, toggleMenuModal] = useState(false);
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.main}>
          {navTitle ? (
            <h2 className={styles.title}>{navTitle}</h2>
          ) : (
            <button
              aria-label='Go back'
              title='Go Back'
              className='btn btn-icon btn-animation'
              onClick={() => {
                router.back();
              }}
            >
              <FaArrowLeft size={38} />
            </button>
          )}
        </div>
        <nav>
          {children}
          <button
            title='Open Menu'
            aria-label='Open dropdown menu'
            className='btn btn-link'
            onClick={() => toggleMenuModal(!menuModal)}
          >
            <FaBars size={28} />
          </button>
        </nav>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {menuModal && (
          <Modal handleClose={() => toggleMenuModal(false)}>
            <DropdownMenu onClose={() => toggleMenuModal(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </header>
  );
};
