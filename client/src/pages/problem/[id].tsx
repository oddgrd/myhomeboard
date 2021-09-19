import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaInfo } from 'react-icons/fa';
import { AscentItem } from '../../components/AscentItem';
import { DeleteProblemButton } from '../../components/Button/deleteProblemButton';
import { Canvas } from '../../components/Canvas';
import { AscentForm } from '../../components/Form/AscentForm';
import { EditProblemForm } from '../../components/Form/EditProblemForm';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal/Modal';
import { AnimatePresence } from 'framer-motion';
import { ProblemInfo } from '../../components/ProblemInfo';
import {
  useAddAscentMutation,
  useGetProblemQuery,
  useMeQuery
} from '../../generated/graphql';
import { useCanvas } from '../../hooks/useCanvas';
import styles from '../../styles/Problem.module.scss';
import { grades } from '../../utils/selectOptions';
import withApollo from '../../utils/withApollo';

const Problem = () => {
  const [{ canvas }, { initViewer, loadFromCoords }] = useCanvas();
  const [showEditProblemModal, setShowEditProblemModal] = useState(false);
  const [showAscentModal, setShowAscentModal] = useState(false);
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
    null;
  }

  if (error) {
    return <Layout>{error.message}</Layout>;
  }

  if (!data?.getProblem && !loading) {
    return (
      <Layout>
        <p>Problem Not Found</p>
        <Link href='/'>
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }
  // typescript complains if && !loading is included
  if (!data?.getProblem) {
    return null;
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
    createdAt,
    layoutUrl,
    boardSlug
  } = data.getProblem;

  const infoProps = {
    rules,
    grade,
    consensusGrade,
    consensusRating,
    name: creator.name,
    createdAt
  };
  const editProblemProps = {
    rules,
    grade,
    title,
    id
  };

  return (
    <Layout title={title}>
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
            <Canvas
              canvasRef={canvas}
              layoutUrl={layoutUrl}
              cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME!}
            />
          </div>
          <div className={styles.info}>
            <h2 className={styles.desktopTitle}>{title}</h2>
            <div className='hide'>
              <ProblemInfo {...infoProps} />
            </div>

            <div className={styles.buttons}>
              {creator.id === meData?.me?.id ? (
                <>
                  <DeleteProblemButton id={problemId} slug={boardSlug} />
                  <button
                    className='btn'
                    onClick={() => setShowEditProblemModal(true)}
                  >
                    <FaEdit size={22} />
                  </button>
                </>
              ) : null}
              {!sendStatus && meData?.me && (
                <button
                  className='btn'
                  onClick={() => setShowAscentModal(true)}
                >
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
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {showEditProblemModal && (
            <Modal handleClose={() => setShowEditProblemModal(false)}>
              <EditProblemForm
                onClose={() => setShowEditProblemModal(false)}
                {...editProblemProps}
              />
            </Modal>
          )}
          {showAscentModal && (
            <Modal handleClose={() => setShowAscentModal(false)}>
              <AscentForm
                id={id}
                boardSlug={boardSlug}
                onClose={() => setShowAscentModal(false)}
                mutation={addAscent}
              />
            </Modal>
          )}
          {showInfoModal && (
            <Modal handleClose={() => setShowInfoModal(false)}>
              <ProblemInfo {...infoProps} />
            </Modal>
          )}
        </AnimatePresence>

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
