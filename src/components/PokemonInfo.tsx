import { useDispatch } from 'react-redux';
import { evolutionData, pokemonData, speciesData } from '../utils/helpers';
import { SelectedPokemon } from '../utils/interfaces';
import { getPokemonDetails } from '../store/pokemon/PokemonThunk';
import { AppDispatch } from '../store/store';
import styles from '@/styles/PokemonInfo.module.scss';
import colors from '@/styles/_colors.module.scss';

const PokemonInfo = ({ selected, species, evolution }: SelectedPokemon) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // Pokemon helper data
  const { abilities, typeNames, bgColor, height, weight, moves } =
    pokemonData(selected);
  const { speciesType } = speciesData(species);
  const { evolutionChain } = evolutionData(evolution);

  const viewPokemonDetails = (id: number) => {
    localStorage.removeItem('selectedPokemon');
    dispatch(getPokemonDetails(id));
  };

  return (
    <div className={styles.pokemon_info}>
      <div
        style={{
          backgroundColor: colors[`${bgColor}_light`],
        }}
        className={styles.pokemon_info_flex}
      >
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
        <p>
          Abilities
          <span className={styles.value}>
            {abilities.map((ability) => (
              <span key={ability}>{ability}</span>
            ))}
          </span>
        </p>

        {/* <PokemonTypes typeNames={typeNames} /> */}
      </div>

      <div
        style={{
          backgroundColor: colors[`${bgColor}_light`],
        }}
        className={styles.pokemon_info_flex}
      >
        <h4>Evolution</h4>
        {evolutionChain.map((evol) => (
          <p
            key={evol.id}
            onClick={() => viewPokemonDetails(evol.id)}
            className={styles.evolution_chip}
            style={{ backgroundColor: colors[`${bgColor}_dark`] }}
          >
            {evol.name}
          </p>
        ))}
      </div>

      <div
        style={{
          backgroundColor: colors[`${bgColor}_light`],
        }}
        className={styles.pokemon_info_block}
      >
        <h4>Moves</h4>
        {moves.map((move) => (
          <p key={move} className={styles.inline_block}>
            {move}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PokemonInfo;
