import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from '../styles/Searchbar.module.scss';

interface Props {
  setSearchPattern: Dispatch<SetStateAction<string>>;
}
export const Searchbar = ({ setSearchPattern }: Props) => {
  const [input, setInput] = useState('');
  const [showBar, toggleShowBar] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearchPattern(input);
    }, 1000);
    return () => clearTimeout(delaySearch);
  }, [input]);
  useEffect(() => {
    if (showBar) {
      document.getElementById('searchbar')!.focus();
    }
  }, [showBar]);

  return (
    <div className={styles.searchbar}>
      <input
        id='searchbar'
        type='text'
        name='input'
        placeholder='Search by title'
        onChange={(e) => setInput(e.target.value)}
        style={{ display: `${showBar ? 'inline' : 'none'}` }}
        value={input}
      />
      <button
        className='btn btn-icon'
        onClick={() => {
          toggleShowBar(!showBar);
          setInput('');
        }}
      >
        {showBar ? <FaTimes size={27} /> : <FaSearch size={27} />}
      </button>
    </div>
  );
};
