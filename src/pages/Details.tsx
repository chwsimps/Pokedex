import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import RouterLink from '../components/RouterLink';
import styles from '@/styles/App.module.scss';

const Details = () => {
  // Redux hooks
  const { selectedPokemon: pokemon } = useSelector(
    (state: RootState) => state.pokemon,
  );

  return (
    <div className={styles.main}>
      <h1 className={styles.main_header}>
        {pokemon?.name}
        <RouterLink className={styles.main_header_link_left}>
          Go Back
        </RouterLink>
      </h1>
    </div>
  );
};

export default Details;
