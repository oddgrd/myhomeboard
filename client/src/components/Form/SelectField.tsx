import { useField } from 'formik';
import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import styles from '../../styles/FormComponents.module.scss';

type IsMulti = false;

type Option = {
  label: string;
  value: number;
};

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
    background: state.isFocused ? '#3e445e' : '#161923',
    color: state.isSelected ? '#00ddff' : '#c3c4d6',
    padding: 10
  }),
  control: (provided, state) => ({
    ...provided,
    color: 'white',
    background: '#161923',
    width: state.selectProps.width,
    height: 50,
    border: 'none',
    borderRadius: '2px',
    boxShadow: state.menuIsOpen ? 'inset 0px 0px 0px 1px #00DDFF' : 'none'
  }),
  menu: (provided, state) => ({
    ...provided,
    background: '#161923',
    color: '#00ddff',
    zIndex: 10
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
  const [error, setError] = useState<string | undefined>('Required');
  const [field, meta, helpers] = useField(props);
  const { setTouched, setValue } = helpers;

  return (
    <div className={styles.selectInput}>
      <label htmlFor={props.name}>{label}</label>
      <Select
        {...props}
        options={options}
        value={
          (options
            ? options.find((option) => option.value === field.value)
            : '') as any
        }
        onBlur={() => {
          setTouched(true);
        }}
        onChange={(option: Option) => {
          setError(undefined);
          setValue(option.value);
        }}
        styles={selectStyle}
        menuPlacement='auto'
        placeholder={placeholder || '?'}
        instanceId={label}
        isSearchable={false}
      />
      {meta.touched && error ? <div className='error'>{meta.error}</div> : null}
    </div>
  );
};
