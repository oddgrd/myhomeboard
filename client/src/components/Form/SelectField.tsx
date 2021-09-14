import { useField } from 'formik';
import Select, { StylesConfig } from 'react-select';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from '../../styles/Form.module.scss';

type Option = {
  label: string;
  value: number;
};
type IsMulti = false;

interface Props {
  label: string;
  name: string;
  options: Option[];
  width: number;
  placeholder?: string;
}

const selectStyle: StylesConfig<Option, IsMulti> = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: 'none',
    background: state.isFocused ? '#3e445e' : '#313649',
    color: state.isSelected ? '#00ddff' : '#c3c4d6',
    padding: 10
  }),
  control: (provided, state) => ({
    ...provided,
    color: 'white',
    background: '#313649',
    width: state.selectProps.width,
    height: 50,
    border: 'none',
    borderRadius: '2px',
    boxShadow: state.menuIsOpen ? 'inset 0px 0px 0px 1px #00DDFF' : 'none'
  }),
  menu: (provided, state) => ({
    ...provided,
    background: '#313649',
    color: '#00ddff'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: '#00ddff' };
  }
};

export const SelectField = ({
  label,
  placeholder,
  options,
  ...props
}: Props) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const { height } = useWindowDimensions();
  return (
    <div className={styles.textInput}>
      <label htmlFor={props.name}>{label}</label>
      <Select
        {...props}
        options={options}
        value={
          (options
            ? options.find((option) => option.value === field.value)
            : '') as any
        }
        onChange={(option: Option) => setValue(option.value)}
        onBlur={() => setTouched(true)}
        styles={selectStyle}
        menuPlacement='auto'
        maxMenuHeight={height > 740 ? 250 : 205}
        placeholder={placeholder || '?'}
        instanceId={label}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
