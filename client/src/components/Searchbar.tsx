import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from '../styles/Searchbar.module.scss';

interface Props {
  setSearchPattern: Dispatch<SetStateAction<string>>;
  searchRef: MutableRefObject<string>;
}
export const Searchbar = ({ setSearchPattern, searchRef }: Props) => {
  const [input, setInput] = useState('');
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    if (searchRef.current.length > 0) {
      setShowBar(true);
      setInput(searchRef.current);
    }
  }, [searchRef.current]);
  useEffect(() => {
    if (showBar) {
      document.getElementById('searchbar')!.focus();
    }
  }, [showBar]);
  useEffect(() => {
    const debounce = setTimeout(() => {
      searchRef.current = input;
      setSearchPattern(input);
    }, 1000);
    return () => clearTimeout(debounce);
  }, [input]);

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
          if (showBar) {
            setShowBar(false);
            setInput('');
          } else {
            setShowBar(true);
          }
        }}
      >
        {showBar ? <FaTimes size={27} /> : <FaSearch size={27} />}
      </button>
    </div>
  );
};
