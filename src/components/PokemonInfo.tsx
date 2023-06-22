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
  const { abilities, bgColor, height, weight, moves } = pokemonData(selected);
  const { speciesType } = speciesData(species);
  const { evolutionChain } = evolutionData(evolution);

  // Evolution / pokemon detail dispatch
  const viewPokemonDetails = (id: number) => {
    localStorage.removeItem('selectedPokemon');
    dispatch(getPokemonDetails(id));
  };

  // Styles
  const bgColorType = (type: string) => ({
    backgroundColor: colors[`${bgColor}_${type}`],
  });

  interface PokemonInfoFlexProps {
    children: React.ReactNode;
    header: string;
    className: string;
  }

  const PokemonInfoFlex = (props: PokemonInfoFlexProps) => {
    return (
      <div style={bgColorType('light')} className={props.className}>
        <h4>{props.header}</h4>
        {props.children}
      </div>
    );
  };

  return (
    <div className={styles.pokemon_info}>
      <PokemonInfoFlex
        header="Pokemon Data"
        className={styles.pokemon_info_block}
      >
        <p>
          Species<span className={styles.value}>{speciesType}</span>
        </p>
        <p>
          Height<span className={styles.value}>{height}</span>
        </p>
        <p>
          Weight<span className={styles.value}>{weight}</span>
        </p>
        <p>
          Abilities
          <span className={styles.value_flex}>
            {abilities.map((ability) => (
              <span key={ability}>{ability}</span>
            ))}
          </span>
        </p>
      </PokemonInfoFlex>

      <PokemonInfoFlex header="Evolution" className={styles.pokemon_info_flex}>
        {evolutionChain.map((evol) => (
          <p
            key={evol.id}
            onClick={() => viewPokemonDetails(evol.id)}
            className={styles.evolution_chip}
            style={bgColorType('dark')}
          >
            {evol.name}
          </p>
        ))}
      </PokemonInfoFlex>

      <PokemonInfoFlex header="Moves" className={styles.pokemon_info_block}>
        {moves.map((move) => (
          <p key={move} className={styles.inline_block}>
            {move}
          </p>
        ))}
      </PokemonInfoFlex>
    </div>
  );
};

export default PokemonInfo;
