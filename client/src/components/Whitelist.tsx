import { useGetWhitelistQuery } from '../generated/graphql';
import { WhitelistItem } from './ListItem/WhitelistItem';
import { Spinner } from './Spinner';

interface Props {
  boardId: string;
}

export const Whitelist = ({ boardId }: Props) => {
  const { data, loading } = useGetWhitelistQuery({
    variables: { boardId },
  });
  if (!data && loading) {
    return <Spinner />;
  }
  return (
    <>
      <h1>Board Whitelist</h1>
      {data?.getWhitelist ? (
        data.getWhitelist.map((user, idx) => (
          <WhitelistItem {...user} boardId={boardId} key={idx} />
        ))
      ) : (
        <p>No users whitelisted</p>
      )}
    </>
  );
};
