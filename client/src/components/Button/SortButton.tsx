import { MutableRefObject } from 'react';
import { ApolloClient } from '@apollo/client';
import {
  FaClock,
  FaDiceOne,
  FaDiceSix,
  FaDiceThree,
  FaRegClock,
} from 'react-icons/fa';

interface Props {
  toggleSort: () => void;
  state: MutableRefObject<number> | MutableRefObject<string>;
  order?: MutableRefObject<string>;
  client: ApolloClient<any>;
}

export const SortButton = ({ toggleSort, state, order, client }: Props) => {
  const grade =
    state.current === 0 ? (
      <FaDiceThree size={27} />
    ) : state.current === 1 ? (
      <FaDiceSix size={27} />
    ) : (
      <FaDiceOne size={27} />
    );
  const date =
    order?.current === 'DESC' || state.current === 'GRADE' ? (
      <FaClock size={26} />
    ) : (
      <FaRegClock size={26} />
    );

  return (
    <button
      className={'btn btn-icon btn-right'}
      aria-label='Toggle Grade Sort'
      title='Toggle Grade Sort'
      onClick={() => {
        toggleSort();
        client.cache.evict({ fieldName: 'getProblems' });
      }}
    >
      {order ? date : grade}
    </button>
  );
};
