import Image from 'next/image';

export const Spinner = () => {
  return (
    <div className='loading-svg'>
      <Image
        width={120}
        height={120}
        src='/Loading.svg'
        aria-label='Loading'
        priority={true}
      />
    </div>
  );
};
