import { useField } from 'formik';
import styles from '../../styles/Form.module.scss';

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

export const Inputfield = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.textInput}>
      <label htmlFor={props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
