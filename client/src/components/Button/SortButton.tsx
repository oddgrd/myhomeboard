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
      <FaDiceThree size={28} />
    ) : state.current === 1 ? (
      <FaDiceSix size={28} />
    ) : (
      <FaDiceOne size={28} />
    );
  const date =
    order?.current === 'DESC' || state.current === 'GRADE' ? (
      <FaClock size={27} />
    ) : (
      <FaRegClock size={27} />
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
