import { ApolloClient } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import Select, { StylesConfig } from 'react-select';

type IsMulti = false;

type Option = {
  label: string;
  value: string;
};

const selectStyle: StylesConfig<Option, IsMulti> = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: 'none',
    background: state.isFocused ? '#3e445e' : '#161923',
    color: state.isSelected ? '#e9c46a' : '#c3c4d6',
    padding: 10,
  }),
  control: (provided, state) => ({
    ...provided,
    color: 'white',
    background: '#161923',
    width: state.selectProps.width,
    height: 40,
    border: 'none',
    borderRadius: '2px',
    boxShadow: state.menuIsOpen ? 'inset 0px 0px 0px 1px #e9c46a' : 'none',
  }),
  menu: (provided, state) => ({
    ...provided,
    background: '#161923',
    color: '#e9c46a',
    zIndex: 10,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: '#e9c46a' };
  },
};

interface Props {
  options: Option[];
  width: number;
  placeholder: string;
  sortState: string;
  selectSort: (sort: string) => void;
  client: ApolloClient<any>;
  disabled: boolean;
}

export const SortMenu = ({
  placeholder,
  options,
  selectSort,
  client,
  sortState,
  disabled,
  ...props
}: Props) => {
  const [sortType, setSortType] = useState(options[0]);
  const sortRef = useRef(options[0]);
  useEffect(() => {
    switch (sortState) {
      case 'newest':
        sortRef.current = options[0];
        setSortType(sortRef.current);
        break;
      case 'oldest':
        sortRef.current = options[1];
        setSortType(sortRef.current);
        break;
      case 'easiest':
        sortRef.current = options[2];
        setSortType(sortRef.current);
        break;
      case 'hardest':
        sortRef.current = options[3];
        setSortType(sortRef.current);
        break;
    }
  }, [sortState]);
  const handleChange = (option: Option | null) => {
    if (!option) return;
    switch (option.value) {
      case 'newest':
        selectSort('newest');
        setSortType(options[0]);
        client.cache.evict({ fieldName: 'getProblems' });
        break;
      case 'oldest':
        selectSort('oldest');
        setSortType(options[1]);
        client.cache.evict({ fieldName: 'getProblems' });
        break;
      case 'easiest':
        selectSort('easiest');
        setSortType(options[2]);
        client.cache.evict({ fieldName: 'getProblems' });
        break;
      case 'hardest':
        selectSort('hardest');
        setSortType(options[3]);
        client.cache.evict({ fieldName: 'getProblems' });
        break;
    }
  };
  return (
    <Select
      {...props}
      value={sortType}
      onChange={handleChange}
      options={options}
      styles={selectStyle}
      menuPlacement='auto'
      placeholder={placeholder}
      instanceId={placeholder}
      isSearchable={false}
      isDisabled={disabled}
    />
  );
};
