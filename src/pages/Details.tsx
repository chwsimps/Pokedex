import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import RouterLink from '../components/RouterLink';
import { pokemonData } from '../utils/helpers';
import { getPokemonDetails } from '../store/pokemon/PokemonThunk';
import PokemonInfo from '../components/PokemonInfo';
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
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const { selected, species, evolution } = selectedPokemon;
  console.log({ selected, species, evolution });

  // Pokemon helper data
  const { imgSrc, bgColor } = pokemonData(selected);

  // Styles
  const linearGradient = `linear-gradient(-15deg, ${colors[bgColor]} 65%, white 35%)`;

  return (
    <div className={styles.main}>
      <h1 className={styles.main_header}>
        {selected?.name}
        <RouterLink to="/" className={styles.main_header_link_left}>
          Go Back
        </RouterLink>
      </h1>

      <div className={styles.details}>
        <img src={imgSrc} className={styles.details_img} alt={selected.name} />
        <PokemonInfo
          selected={selected}
          species={species}
          evolution={evolution}
        />
      </div>

      {/* Background layer based on Pokemon */}
      <div
        style={{ background: linearGradient }}
        className={styles.bkgd_layer}
      ></div>
    </div>
  );
};

export default Details;
