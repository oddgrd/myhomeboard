import { Layout } from '../../components/Layout';
import { Canvas } from '../../components/Canvas';
import { AscentItem } from '../../components/AscentItem';
import { useCanvas } from '../../hooks/useCanvas';
import { useEffect } from 'react';
import styles from '../../styles/Problem.module.scss';
import { useRouter } from 'next/router';
import { useGetProblemQuery, useMeQuery } from '../../generated/graphql';
import Link from 'next/link';
import { grades } from '../../utils/ratingsAndGrades';
import withApollo from '../../utils/withApollo';
import { StarRating } from '../../utils/StarRating';
import { EditDeleteProblemButtons } from '../../components/EditDeletePostButtons';

const Problem = () => {
  const [{ canvas }, { initViewer, loadFromCoords }] = useCanvas();
  const router = useRouter();
  const problemId = typeof router.query.id === 'string' ? router.query.id : '';

  const { data: meData } = useMeQuery();
  const { data, loading, error } = useGetProblemQuery({
    variables: {
      id: problemId
    }
  });

  useEffect(() => {
    if (!initViewer) return;
    initViewer();
    if (!loadFromCoords || !data?.getProblem) return;
    loadFromCoords(data.getProblem.coordinates);
  }, [data?.getProblem, initViewer, loadFromCoords]);

  if (loading) {
    return <Layout>...loading</Layout>;
  }

  if (error) {
    return <Layout>{error.message}</Layout>;
  }

  if (!data?.getProblem) {
    return (
      <Layout>
        <p>Problem Not Found</p>
        <Link href='/'>
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }
  const { title, rules, grade, rating, ascents, creator } = data.getProblem;
  return (
    <Layout title='Problem'>
      <div className={styles.problem}>
        <h2 className={styles.mobileTitle}>{title}</h2>
        <div className={styles.viewer}>
          <div className={styles.board}>
            <Canvas canvasRef={canvas} />
          </div>
          <div className={styles.info}>
            <h2 className={styles.desktopTitle}>{title}</h2>
            <p>Grade: {grades[grade].label}</p>
            <p>
              Rating:{' '}
              {rating || rating === 0 ? (
                <StarRating rating={rating} />
              ) : (
                'Project'
              )}
            </p>
            <p>Rules: {rules}</p>
            <p>Set by: {creator.name}</p>
            {creator.id === meData?.me?.id ? (
              <EditDeleteProblemButtons id={problemId} />
            ) : null}
          </div>
        </div>
        <div className={styles.ascents}>
          {ascents.length > 0 && <h3>Ascents:</h3>}
          {ascents &&
            ascents.map((ascent, idx) => {
              return <AscentItem ascent={ascent} key={idx} />;
            })}
        </div>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: true })(Problem);
