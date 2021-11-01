import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMeQuery } from '../generated/graphql';

export const useIsWhitelisted = (boardId: string) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.push('/login');
      return;
    }
    if (!loading && !data?.me?.boardWhitelist?.includes(boardId)) {
      toast.error('You are not whitelisted for this board');
      router.back();
    }
  }, [data, router, loading]);
};
