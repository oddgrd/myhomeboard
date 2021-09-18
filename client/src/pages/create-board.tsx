import { BoardForm } from '../components/Form/BoardForm';
import { Layout } from '../components/Layout';
import withApollo from '../utils/withApollo';
import styles from '../styles/CreateProblem.module.scss';
const CreateBoard = () => {
  return (
    <Layout title='Create Board'>
      <div className={styles.createProblem}>
        <BoardForm />
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateBoard);
