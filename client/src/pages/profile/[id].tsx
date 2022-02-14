import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { Spinner } from '../../components/Spinner';
import {
  useGetSentProblemsQuery,
  useGetUserQuery,
} from '../../generated/graphql';
import withApollo from '../../utils/withApollo';
import styles from '../../styles/Profile.module.scss';
import { useIsAuth } from '../../hooks/useIsAuth';
import { ProfileChart } from '../../components/ProfileChart';
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
      ?.map((p) => p.avgGrade)
      .forEach((g) => typeof g === 'number' && (grades[g] += 1));
    return grades;
  }, [sendData?.getSentProblems]);

  const problemGrades = useMemo(() => {
    let grades: number[] = Array(20).fill(0);
    data?.getUser?.problems
      ?.map((p) => p.avgGrade ?? p.grade)
      .forEach((g) => typeof g === 'number' && (grades[g] += 1));
    return grades;
  }, [data?.getUser?.problems]);

  if (!data && loading) {
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

  const { name, avatar } = data.getUser;

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

        <section className={styles.chart}>
          <ProfileChart
            ascentGrades={ascentGrades}
            problemGrades={problemGrades}
          />
        </section>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Profile);
