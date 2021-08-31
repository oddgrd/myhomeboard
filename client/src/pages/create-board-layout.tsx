import { Layout } from '../components/Layout';
import styles from '../styles/CreateProblem.module.scss';
import { BoardLayoutForm } from '../components/form/BoardLayoutForm';
import withApollo from '../utils/withApollo';

const CreateBoardLayout = () => {
  return (
    <Layout title='Create Board'>
      <div className={styles.createProblem}>
        <BoardLayoutForm />
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(CreateBoardLayout);
