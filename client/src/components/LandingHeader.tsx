import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../../public/Logo-simple.svg";
import styles from "../styles/Header.module.scss";
import { DropdownMenu } from "./DropdownMenu";
import { Modal } from "./Modal/Modal";

// Slimmed down header for landing to reduce first contentful paint
export const LandingHeader = () => {
  const [menuModal, toggleMenuModal] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src={logo}
            alt="Covegg19 Logo"
            width={42}
            height={42}
            priority={true}
          />
          <strong className="hide">myHomeBoard</strong>
        </div>
        <nav>
          <ul>
            <li>
              <Link href={`/login`}>
                <a className="btn btn-link">
                  <strong>GET STARTED</strong>
                </a>
              </Link>
            </li>
            <li>
              <button
                className="btn btn-link"
                onClick={() => toggleMenuModal(!menuModal)}
              >
                <FaBars size={28} />
              </button>
            </li>
          </ul>
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
