import { Layout } from '../../components/Layout';
import { Canvas } from '../../components/Canvas';
import { AscentItem } from '../../components/AscentItem';
import { useCanvas } from '../../hooks/useCanvas';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Problem.module.scss';
import { useRouter } from 'next/router';
import {
  useAddAscentMutation,
  useGetProblemQuery,
  useMeQuery
} from '../../generated/graphql';
import Link from 'next/link';
import { grades } from '../../utils/selectOptions';
import withApollo from '../../utils/withApollo';
import { AscentForm } from '../../components/form/AscentForm';
import Modal from '../../components/Modal';
import { FaCheck, FaInfo } from 'react-icons/fa';
import { DeleteProblemButton } from '../../components/buttons/deleteProblemButton';
import { EditProblemButton } from '../../components/buttons/editProblemButton';
import { ProblemInfo } from '../../components/ProblemInfo';

const Problem = () => {
  const [{ canvas }, { initViewer, loadFromCoords }] = useCanvas();
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const router = useRouter();
  const problemId = typeof router.query.id === 'string' ? router.query.id : '';

  const [addAscent] = useAddAscentMutation();
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
    creator,
    sendStatus,
    createdAt
  } = data.getProblem;
  const infoProps = {
    rules,
    grade,
    consensusGrade,
    consensusRating,
    name: creator.name,
    createdAt
  };
  return (
    <Layout title='Problem'>
      <div className={styles.problem}>
        <div className={styles.mobileTitle}>
          <h2>{title}</h2>
          <h2 className={styles.grade}>
            {typeof consensusGrade === 'number'
              ? grades[consensusGrade].label
              : grades[grade].label}
          </h2>
        </div>

        <div className={styles.viewer}>
          <div className={styles.board}>
            <Canvas canvasRef={canvas} />
          </div>
          <div className={styles.info}>
            <h2 className={styles.desktopTitle}>{title}</h2>
            <div className='hide'>
              <ProblemInfo {...infoProps} />
            </div>

            <div className={styles.buttons}>
              {creator.id === meData?.me?.id ? (
                <>
                  <DeleteProblemButton id={problemId} />
                  <EditProblemButton id={problemId} />
                </>
              ) : null}
              {!sendStatus && (
                <button className='btn' onClick={() => setShowModal(true)}>
                  <FaCheck size={22} />
                </button>
              )}
              <button
                className='btn hide-desktop'
                onClick={() => setShowInfoModal(true)}
              >
                <FaInfo size={22} />
              </button>
            </div>
          </div>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AscentForm
              id={id}
              onClose={() => setShowModal(false)}
              mutation={addAscent}
            />
          </Modal>
        )}
        {showInfoModal && (
          <Modal onClose={() => setShowInfoModal(false)}>
            <ProblemInfo {...infoProps} />
          </Modal>
        )}

        <div className={styles.ascents}>
          {ascents.length > 0 && <h3>Ascents:</h3>}
          {ascents &&
            ascents.map((ascent, idx) => {
              return (
                <AscentItem
                  ascent={ascent}
                  problemId={id}
                  currentUserId={meData?.me?.id}
                  key={idx}
                />
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Problem);
