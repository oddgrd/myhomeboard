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
  const { title, id, url, publicId, description, createdAt } = layout;
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
      <div className={styles.main}>
        <div className={styles.titleDiv}>
          <p className={styles.title}>{title}</p>
          <p>{description}</p>
        </div>
      </div>

      <div className={styles.right}>
        <p>
          {new Date(+createdAt).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
          })}
        </p>
      </div>
      <div className={styles.settings}>
        <button className='btn btn-delete btn-link' onClick={handleDelete}>
          <FaTimes size={28} />
        </button>
      </div>
    </div>
  );
};
