import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import RouterLink from '../components/RouterLink';
import { pokemonData } from '../utils/helpers';
import { getPokemonDetails } from '../store/pokemon/PokemonThunk';
import Loader from '../components/Loader';
import styles from '@/styles/Details.module.scss';
import colors from '@/styles/_colors.module.scss';

const Details = () => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const { state: locState } = useLocation();
  const { isLoading, selectedPokemon } = useSelector(
    (state: RootState) => state.pokemon,
  );

  useEffect(() => {
    dispatch(getPokemonDetails(locState.id));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  const { selected, species, evolution } = selectedPokemon;

  // Pokemon helper data
  const { imgSrc, typeNames, bgColor } = pokemonData(selected);

  // Styles
  const linearGradient = `linear-gradient(-15deg, ${colors[bgColor]} 65%, white 35%)`;
  console.log(linearGradient);

  return (
    <div className={styles.main}>
      <h1 className={styles.main_header}>
        {selected?.name}
        <RouterLink className={styles.main_header_link_left}>
          Go Back
        </RouterLink>
      </h1>

      {/* Background layer based on Pokemon */}
      <div
        style={{ background: linearGradient }}
        className={styles.bkgd_layer}
      ></div>
    </div>
  );
};

export default Details;
