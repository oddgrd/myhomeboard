import styles from '../../styles/Profile.module.scss';

interface Props {
  label: string;
  data: string | number;
}

export const ProfileItem = ({ label, data }: Props) => {
  return (
    <div className={styles.profileItem}>
      <strong>{label}</strong>
      <p>{data}</p>
    </div>
  );
};
