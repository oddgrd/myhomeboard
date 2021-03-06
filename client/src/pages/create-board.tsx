// import { BoardForm } from '../components/Form/BoardForm';
import { Layout } from '../components/Layout';
import withApollo from '../utils/withApollo';
import styles from '../styles/CreateProblem.module.scss';
import { useIsAuth } from '../hooks/useIsAuth';
const CreateBoard = () => {
  useIsAuth();
  return (
    <Layout title='Create Board'>
      <div className={styles.createProblem}>
        {/* <BoardForm /> */}
        <p className='center-text'>
          This functionality is temporarily disabled.
        </p>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateBoard);
