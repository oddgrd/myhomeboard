import styles from '../styles/Toolbar.module.scss';
import { FaUndo } from 'react-icons/fa';

interface Props {
  handleColor: ((color: string) => void) | undefined;
  undo: (() => void) | undefined;
}

export const Toolbar = ({ handleColor, undo }: Props) => {
  const handleChange = (e: any) => {
    if (handleColor && typeof e.target.value === 'string') {
      handleColor(e.target.value);
    }
  };

  return (
    <div className={styles.radioGroup} onChange={(e) => handleChange(e)}>
      <label className={styles.radioContainer}>
        <input
          type='radio'
          name='radio'
          value='#00FF00'
          defaultChecked={true}
        />
        <span
          className={styles.radio}
          style={{ backgroundColor: '#27b376' }}
        ></span>
      </label>

      <label className={styles.radioContainer}>
        <input type='radio' name='radio' value='#0000FF' />
        <span
          className={styles.radio}
          style={{ backgroundColor: '#3581d8' }}
        ></span>
      </label>

      <label className={styles.radioContainer}>
        <input type='radio' name='radio' value='#FFFF00' />
        <span
          className={styles.radio}
          style={{ backgroundColor: '#f9a73e' }}
        ></span>
      </label>

      <label className={styles.radioContainer}>
        <input type='radio' name='radio' value='#FF0000' />
        <span
          className={styles.radio}
          style={{ backgroundColor: '#bf212f' }}
        ></span>
      </label>

      <button className='btn btn-undo' onClick={undo}>
        <FaUndo />
      </button>
    </div>
  );
};
