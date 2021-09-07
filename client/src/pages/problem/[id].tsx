import { Layout } from '../../components/Layout';
import { Canvas } from '../../components/Canvas';
import { AscentItem } from '../../components/AscentItem';
import { useCanvas } from '../../hooks/useCanvas';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Problem.module.scss';
import { useRouter } from 'next/router';
import { useGetProblemQuery, useMeQuery } from '../../generated/graphql';
import Link from 'next/link';
import { grades } from '../../utils/selectOptions';
import withApollo from '../../utils/withApollo';
import { StarRating } from '../../utils/StarRating';
import { AscentForm } from '../../components/form/AscentForm';
import Modal from '../../components/Modal';
import { FaCheck } from 'react-icons/fa';
import { DeleteProblemButton } from '../../components/buttons/deleteProblemButton';
import { EditProblemButton } from '../../components/buttons/editProblemButton';

const Problem = () => {
  const [{ canvas }, { initViewer, loadFromCoords }] = useCanvas();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const problemId = typeof router.query.id === 'string' ? router.query.id : '';

  const { data: meData } = useMeQuery();
  const { data, loading, error } = useGetProblemQuery({
    variables: {
      id: problemId
    }
  });
  const hasSent = data?.getProblem?.ascents.filter(
    (ascent) => ascent.userId === meData?.me?.id
  ).length;
  useEffect(() => {
    if (!initViewer) return;
    initViewer();
    if (!loadFromCoords || !data?.getProblem) return;
    loadFromCoords(data.getProblem.coordinates);
  }, [data?.getProblem, initViewer, loadFromCoords]);

  if (loading) {
    return null;
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
  const {
    id,
    title,
    rules,
    grade,
    consensusRating,
    consensusGrade,
    ascents,
    creator
  } = data.getProblem;
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

            <p>
              Grade:{' '}
              {typeof consensusGrade === 'number'
                ? grades[consensusGrade].label
                : grades[grade].label}
            </p>
            <p>
              Rating:{' '}
              {typeof consensusRating === 'number' ? (
                <StarRating rating={consensusRating} />
              ) : (
                'Project'
              )}
            </p>
            <p>Rules: {rules}</p>
            <p>Set by: {creator.name}</p>
            <div className={styles.buttons}>
              {creator.id === meData?.me?.id ? (
                <>
                  <DeleteProblemButton id={problemId} />
                  <EditProblemButton id={problemId} />
                </>
              ) : null}
              {!hasSent && (
                <button className='btn' onClick={() => setShowModal(true)}>
                  <FaCheck />
                </button>
              )}
            </div>
          </div>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AscentForm id={id} onClose={() => setShowModal(false)} />
          </Modal>
        )}

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
