import Image from 'next/image';
import spinner from '../assets/images/Loading.svg';

export const Spinner = () => {
  return (
    <div className='loading-svg'>
      <Image width={120} height={120} src={spinner} aria-label='Loading' />
    </div>
  );
};
