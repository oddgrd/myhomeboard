import Link from 'next/link';
import { LayoutCoreFragment } from '../generated/graphql';
import styles from '../styles/BoardItem.module.scss';
interface Props {
  layout: LayoutCoreFragment;
}

export const LayoutItem = ({ layout }: Props) => {
  const { title, id, creatorId, description } = layout;

  return (
    <div className={styles.boardItem}>
      <Link href='#'>
        <a className={styles.content}>
          <div className={styles.titleDiv}>
            <p className={styles.title}>{title}</p>
            <p>{description}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};
