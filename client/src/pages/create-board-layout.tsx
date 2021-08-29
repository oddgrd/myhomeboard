import { Layout } from '../components/Layout';
import styles from '../styles/CreateProblem.module.scss';
import { BoardLayoutForm } from '../components/form/BoardLayoutForm';

const CreateBoardLayout = () => {
  return (
    <Layout title='Create Board'>
      <div className={styles.createProblem}>
        <BoardLayoutForm />
      </div>
    </Layout>
  );
};
export default CreateBoardLayout;
