import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import RouterLink from '../components/RouterLink';
import styles from '@/styles/App.module.scss';

const Details = () => {
  // Redux hooks
  const { selectedPokemon } = useSelector((state: RootState) => state.pokemon);

  const { selected, species, evolution } = selectedPokemon;

  return (
    <div className={styles.main}>
      <h1 className={styles.main_header}>
        {selected?.name}
        <RouterLink className={styles.main_header_link_left}>
          Go Back
        </RouterLink>
      </h1>
    </div>
  );
};

export default Details;
