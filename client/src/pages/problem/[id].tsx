import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaCog, FaInfo } from 'react-icons/fa';
import { AscentItem } from '../../components/ListItem/AscentItem';
import { DeleteProblemButton } from '../../components/Button/deleteProblemButton';
import { Canvas } from '../../components/Canvas';
import { AscentForm } from '../../components/Form/AscentForm';
import { EditProblemForm } from '../../components/Form/EditProblemForm';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal/Modal';
import { ProblemInfo } from '../../components/ProblemInfo';
import { Spinner } from '../../components/Spinner';
import { useGetProblemQuery, useMeQuery } from '../../generated/graphql';
import { useCanvas } from '../../hooks/useCanvas';
import styles from '../../styles/Problem.module.scss';
import { grades } from '../../assets/selectOptions';
import withApollo from '../../utils/withApollo';

const Problem = () => {
  const [{ canvas }, { initViewer, loadFromCoords }] = useCanvas();
  const [showEditProblemModal, setShowEditProblemModal] = useState(false);
  const [showAscentModal, setShowAscentModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const router = useRouter();
  const problemId = typeof router.query.id === 'string' ? router.query.id : '';

  const { data: meData } = useMeQuery();
  const { data, loading, error } = useGetProblemQuery({
    variables: {
      id: problemId,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    initViewer();
    if (!data?.getProblem) return;
    loadFromCoords(data.getProblem.coordinates);
  }, [data?.getProblem, initViewer, loadFromCoords]);

  if (error) {
    return <Layout>{error.message}</Layout>;
  }
  if (loading && !data?.getProblem) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  if (!data?.getProblem) {
    return (
      <Layout>
        <p>Problem Not Found</p>
        <Link href='/'>
          <a className='back'>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }

  const {
    id,
    title,
    rules,
    grade,
    avgRating,
    avgGrade,
    ascents,
    creator,
    createdAt,
    layout,
    boardId,
    angle,
    ascentIds,
  } = data.getProblem;

  const infoProps = {
    rules,
    grade,
    avgGrade,
    avgRating,
    name: creator.name,
    angle,
    createdAt,
  };
  const editProblemProps = {
    rules,
    grade,
    title,
    id,
    angle,
    boardId,
  };
  const whitelistedAndNotSent =
    ascentIds &&
    ascentIds.indexOf(meData?.me?.id || '') === -1 &&
    meData?.me?.boardWhitelist?.includes(boardId);

  return (
    <Layout
      title={title}
      navChildren={
        <div className={styles.buttons}>
          {whitelistedAndNotSent && (
            <button
              title='Register Ascent'
              aria-label='Register ascent'
              className='btn btn-link'
              onClick={() => setShowAscentModal(true)}
            >
              <FaCheck size={28} />
            </button>
          )}

          <button
            title='Problem Info'
            aria-label='Problem Info'
            className='btn btn-link hide-desktop'
            onClick={() => setShowInfoModal(true)}
          >
            <FaInfo size={28} />
          </button>
          {creator && creator.id === meData?.me?.id && (
            <>
              <button
                title='Edit Problem'
                aria-label='Edit problem'
                className='btn btn-link'
                onClick={() => setShowEditProblemModal(true)}
              >
                <FaCog size={28} />
              </button>

              <DeleteProblemButton id={problemId} boardId={boardId} />
            </>
          )}
        </div>
      }
    >
      <div className={styles.problem}>
        <div className={styles.mobileTitle}>
          <h2>{title}</h2>
          <h2 className={styles.grade}>{grades[avgGrade ?? grade].label}</h2>
        </div>

        <div className={styles.viewer}>
          <div className={styles.board}>
            <Canvas canvasRef={canvas} layoutUrl={layout.url} />
          </div>
          <div className={styles.info}>
            <h2 className={styles.desktopTitle}>{title}</h2>
            <div className='hide'>
              <ProblemInfo {...infoProps} />
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
                boardId={boardId}
                onClose={() => setShowAscentModal(false)}
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

export default withApollo({ ssr: false })(Problem);
