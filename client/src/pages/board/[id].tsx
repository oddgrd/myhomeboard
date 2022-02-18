import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  FaCheck,
  FaCloudUploadAlt,
  FaEdit,
  FaList,
  FaSearch,
} from 'react-icons/fa';
import { DeleteBoardButton } from '../../components/Button/deleteBoardButton';
import { BoardForm } from '../../components/Form/BoardForm';
import { WhitelistForm } from '../../components/Form/WhitelistForm';
import { Layout } from '../../components/Layout';
import { Whitelist } from '../../components/Whitelist';
import { LayoutItem } from '../../components/ListItem/LayoutItem';
import { Modal } from '../../components/Modal/Modal';
import { Spinner } from '../../components/Spinner';
import {
  useGetBoardLayoutsQuery,
  useGetBoardQuery,
} from '../../generated/graphql';
import styles from '../../styles/Board.module.scss';
import withApollo from '../../utils/withApollo';

const Board = () => {
  const router = useRouter();
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const [showBoardForm, toggleShowBoardForm] = useState(false);
  const [showLayouts, toggleShowLayouts] = useState(false);
  const [showWhitelist, toggleShowWhitelist] = useState(false);

  const boardId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data, loading, error } = useGetBoardQuery({
    variables: { boardId },
    skip: !router.isReady,
  });
  const { data: layoutData } = useGetBoardLayoutsQuery({
    variables: { boardId },
    skip: !router.isReady,
  });

  if (error) {
    return <Layout>{error.message}</Layout>;
  }
  if (loading && !data?.getBoard) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  if (!data?.getBoard) {
    return (
      <Layout>
        <p>Board Not Found</p>
        <Link href='/'>
          <a className='back'>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }

  const { title, city, country, angles, description, adjustable, id } =
    data.getBoard;

  const editProps = {
    boardId: id,
    title,
    city,
    country,
    angles: angles.join(', '),
    description,
    adjustable,
  };

  return (
    <Layout title={title}>
      <div className={styles.board}>
        <h1>{title}</h1>
        <ul>
          <li>
            {' '}
            <button
              className='btn btn-link btn-dropdown'
              onClick={() => toggleShowBoardForm(!showBoardForm)}
            >
              <FaEdit size={28} /> Edit Board
            </button>
          </li>
          <li>
            <button
              className='btn btn-link btn-dropdown'
              onClick={() => setShowWhitelistModal(true)}
            >
              <FaCheck size={28} /> Whitelist User
            </button>
          </li>
          <li>
            <button
              className='btn btn-link btn-dropdown'
              onClick={() => toggleShowWhitelist(!showWhitelist)}
            >
              <FaList size={28} /> Show Whitelist
            </button>
          </li>
          <li>
            <button
              className='btn btn-link btn-dropdown'
              onClick={() => toggleShowLayouts(!showLayouts)}
            >
              <FaSearch size={28} /> Browse Layouts
            </button>
          </li>
          <li>
            <Link href={`/boards/${boardId}/create-layout`}>
              <a className='btn btn-link btn-dropdown'>
                <FaCloudUploadAlt size={28} /> Upload Layout
              </a>
            </Link>
          </li>
          <li>
            <DeleteBoardButton boardId={boardId} />
          </li>
        </ul>

        {showBoardForm && <BoardForm editProps={editProps} />}
        {showLayouts && (
          <div className={styles.layouts}>
            {' '}
            <div className={styles.layoutsHeader}>
              <h1>Layouts</h1>
            </div>
            {layoutData && layoutData.getBoardLayouts.length > 0 ? (
              layoutData.getBoardLayouts.map((layout, idx) => (
                <LayoutItem layout={layout} key={idx} />
              ))
            ) : (
              <h3>N/A</h3>
            )}
          </div>
        )}
        {showWhitelist && (
          <div className={styles.layouts}>
            <Whitelist boardId={boardId} />
          </div>
        )}
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {showWhitelistModal && (
          <Modal handleClose={() => setShowWhitelistModal(false)}>
            <WhitelistForm
              boardId={boardId}
              onClose={() => setShowWhitelistModal(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Board);
