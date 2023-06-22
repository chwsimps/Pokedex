import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import RouterLink from '../components/RouterLink';
import { evolutionData, pokemonData, speciesData } from '../utils/helpers';
import { getPokemonDetails } from '../store/pokemon/PokemonThunk';
import Loader from '../components/Loader';
import styles from '@/styles/Details.module.scss';
import colors from '@/styles/_colors.module.scss';
import PokemonTypes from '../components/PokemonTypes';

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
  const { imgSrc, typeNames, bgColor, height, weight } = pokemonData(selected);
  const { description, speciesType } = speciesData(species);
  const { evolutionChain } = evolutionData(evolution);

  // Styles
  const linearGradient = `linear-gradient(-15deg, ${colors[bgColor]} 65%, white 35%)`;

  return (
    <div className={styles.main}>
      <h1 className={styles.main_header}>
        {selected?.name}
        <RouterLink className={styles.main_header_link_left}>
          Go Back
        </RouterLink>
      </h1>

      <div className={styles.details}>
        <div className={styles.pokemon_detail_section}>
          <h4>Pokemon Data</h4>
          <p>
            Species <span className={styles.value}>{speciesType}</span>
          </p>
          <p>
            Height <span className={styles.value}>{height}</span>
          </p>
          <p>
            Weight <span className={styles.value}>{weight}</span>
          </p>
        </div>
        <PokemonTypes typeNames={typeNames} />
        <img src={imgSrc} className={styles.detail_img} alt={selected.name} />
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
