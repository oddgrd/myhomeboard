import { Layout } from '../components/Layout';
import styles from '../styles/CreateProblem.module.scss';
import { BoardForm } from '../components/form/BoardForm';

const CreateBoard = () => {
  return (
    <Layout title='Create Board'>
      <div className={styles.createProblem}>
        <BoardForm />
      </div>
    </Layout>
  );
};
export default CreateBoard;
