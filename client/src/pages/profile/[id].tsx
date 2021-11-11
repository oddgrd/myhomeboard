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
import { attempts, grades } from '../../assets/selectOptions';

const Profile = () => {
  const router = useRouter();
  const profileId = typeof router.query.id === 'string' ? router.query.id : '';

  const { data, loading } = useGetUserQuery({
    variables: { id: profileId },
  });
  const { data: sendData, loading: sendLoading } = useGetSentProblemsQuery({
    variables: { userId: profileId },
    fetchPolicy: 'no-cache',
  });
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
  const { name, avatar, problems, ascents } = data.getUser;

  const getAverage = (values: number[]) => {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => {
      return acc + val;
    });

    return sum / values.length;
  };
  const getAverageRounded = (values: number[]) => {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => {
      return acc + val;
    });

    return Math.round(sum / values.length);
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
          {sendData?.getSentProblems && (
            <>
              <ProfileItem
                label='Highest Grade'
                data={
                  sendData.getSentProblems.length === 0
                    ? 'N/A'
                    : grades[
                        Math.max(
                          ...sendData.getSentProblems
                            .map((problem) => problem.consensusGrade as number)
                            .reduce(
                              (acc: number[], curr: number) => acc.concat(curr),
                              []
                            )
                        )
                      ].label
                }
              />
              <ProfileItem
                label='Avg Grade'
                data={
                  sendData.getSentProblems.length === 0
                    ? 'N/A'
                    : grades[
                        getAverageRounded(
                          sendData.getSentProblems.map(
                            (problem) => problem.consensusGrade as number
                          )
                        )
                      ].label
                }
              />
            </>
          )}

          <ProfileItem label='Ascents' data={ascents?.length || 0} />
          <ProfileItem
            label='Avg Attempts'
            data={
              ascents && ascents.length > 0
                ? attempts[getAverageRounded(ascents.map((a) => a.attempts))]
                    .label
                : 'N/A'
            }
          />
          <ProfileItem label='Problems Created' data={problems?.length || 0} />
          <ProfileItem
            label='Avg Problem Rating'
            data={
              problems && problems.length > 0
                ? getAverage(
                    problems
                      .filter((p) => typeof p.consensusRating === 'number')
                      .map((p) => (p.consensusRating as number) + 1)
                  ).toFixed(2) + ' / 3'
                : 'N/A'
            }
          />
        </section>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Profile);
