import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Offline = () => {
  const router = useRouter();
  useEffect(() => {
    window.addEventListener('online', () => {
      router.reload();
    });
    return () =>
      window.removeEventListener('online', () => {
        router.reload();
      });
  }, []);
  return (
    <div>
      <h2>You are currently offline</h2>
      <button onClick={() => router.reload()} className='btn'>
        Reconnect
      </button>
    </div>
  );
};

export default Offline;
