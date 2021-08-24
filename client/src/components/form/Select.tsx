import { useField } from 'formik';
import styles from '../../styles/Form.module.scss';

interface Props {
  label: string;
  name: string;
  options: { label: string; value: number }[];
}

export const Select = ({ label, options, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.textInput}>
      <label htmlFor={props.name}>{label}</label>
      <select {...field} {...props}>
        {options.map((option, idx) => {
          return <option value={option.value} label={option.label} key={idx} />;
        })}
      </select>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
