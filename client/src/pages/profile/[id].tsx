import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { Spinner } from '../../components/Spinner';
import { ProfileItem } from '../../components/ListItem/ProfileItem';

import {
  useGetSentProblemsQuery,
  useGetUserQuery,
} from '../../generated/graphql';
import withApollo from '../../utils/withApollo';
import styles from '../../styles/Profile.module.scss';
import { useIsAuth } from '../../hooks/useIsAuth';
import { AscentChart } from '../../components/AscentChart';
import { useMemo } from 'react';

const Profile = () => {
  useIsAuth();
  const router = useRouter();
  const profileId = typeof router.query.id === 'string' ? router.query.id : '';

  const { data, loading } = useGetUserQuery({
    variables: { id: profileId },
  });

  const { data: sendData, loading: sendLoading } = useGetSentProblemsQuery({
    variables: { userId: profileId },
    fetchPolicy: 'cache-and-network',
  });

  const ascentGrades = useMemo(() => {
    let grades: number[] = Array(20).fill(0);
    sendData?.getSentProblems
      ?.map((p) => p.consensusGrade)
      .forEach((g) => typeof g === 'number' && (grades[g] += 1));
    return grades;
  }, [sendData?.getSentProblems]);

  if ((!data && loading) || sendLoading) {
    return (
      <Layout title='Profile'>
        <Spinner />
      </Layout>
    );
  }
  if (!data?.getUser) {
    return (
      <Layout title='Profile'>
        <p>Profile not found</p>
        <button
          className='btn'
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </button>
      </Layout>
    );
  }

  const { name, avatar, problems } = data.getUser;

  const getAverage = (values: number[]) => {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => {
      return acc + val;
    });
    return (sum / values.length).toFixed(2);
  };

  return (
    <Layout title='Profile'>
      <div className={styles.profile}>
        <section className={styles.head}>
          <div>
            <Image
              src={avatar ? avatar : ''}
              width={62}
              height={62}
              priority={true}
            />
          </div>
          <h1>{name}</h1>
        </section>
        <section className={styles.body}>
          <ProfileItem label='Problems Created' data={problems?.length || 0} />
          <ProfileItem
            label='Avg Problem Rating'
            data={
              problems && problems.length > 0
                ? getAverage(
                    problems
                      .filter((p) => typeof p.consensusRating === 'number')
                      .map((p) => (p.consensusRating as number) + 1)
                  ) + ' / 3'
                : 'N/A'
            }
          />
        </section>
        <section className={styles.chart}>
          <h3>Ascents</h3>
          <AscentChart {...ascentGrades} />
        </section>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Profile);
