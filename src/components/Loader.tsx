import styles from '@/styles/Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.pokeball}></div>
    </div>
  );
};

export default Loader;
