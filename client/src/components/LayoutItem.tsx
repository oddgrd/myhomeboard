import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  LayoutCoreFragment,
  useDeleteLayoutMutation,
} from '../generated/graphql';
import styles from '../styles/BoardItem.module.scss';
interface Props {
  layout: LayoutCoreFragment;
}

export const LayoutItem = ({ layout }: Props) => {
  const { title, id, url, publicId, description } = layout;
  const [deleteLayout] = useDeleteLayoutMutation();

  const handleDelete = async () => {
    if (
      window.confirm(
        'Are you sure? All associated problems will be deleted, and this is irreversible.'
      )
    ) {
      await toast.promise(
        deleteLayout({
          variables: { options: { publicId, layoutId: id, layoutUrl: url } },
          update: (cache) => {
            cache.evict({ id: 'Layout:' + id });
            cache.evict({ fieldName: 'getProblems' });
          },
        }),
        {
          pending: 'Deleting Layout',
          success: 'Layout deleted ☠️',
          error: 'Something went wrong',
        }
      );
    }
  };
  return (
    <div className={styles.boardItem}>
      <Link href='#'>
        <a className={styles.content}>
          <div className={styles.titleDiv}>
            <p className={styles.title}>{title}</p>
            <p>{description}</p>
          </div>
          <button className='btn btn-delete' onClick={handleDelete}>
            <FaTimes />
          </button>
        </a>
      </Link>
    </div>
  );
};
