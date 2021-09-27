import { useField } from 'formik';
import styles from '../../styles/FormComponents.module.scss';

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  maxLength?: number;
}

export const Textarea = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.formComponent}>
      <label htmlFor={props.name}>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
