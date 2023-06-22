import { useNavigate } from 'react-router-dom';
import { Pokemon } from 'pokenode-ts';
import { pokemonData } from '../utils/helpers';
import styles from '@/styles/Card.module.scss';
import colors from '@/styles/_colors.module.scss';
import PokemonTypes from './PokemonTypes';

interface CardProps {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  // Redux hooks
  const navigate = useNavigate();

  // Pokemon helper data
  const { imgSrc, typeNames, bgColor, pokemonNum } = pokemonData(pokemon);

  const viewPokemonDetails = (id: number) => {
    localStorage.removeItem('selectedPokemon');
    navigate('/details', { state: { id } });
  };

  // Styles
  const bgColorType = (type: string) => ({
    backgroundColor: colors[`${bgColor}_${type}`],
  });

  return (
    <div
      onClick={() => viewPokemonDetails(pokemon.id)}
      style={{ backgroundColor: colors[bgColor] }}
      className={styles.pokemon_card}
    >
      <p className={styles.pokemon_id} style={bgColorType('light')}>
        {pokemonNum}
      </p>
      <div className={styles.pokemon_card_details}>
        <h3>{pokemon.name}</h3>
        <PokemonTypes typeNames={typeNames} />
      </div>
      <img
        src={imgSrc}
        className={styles.pokemon_card_img}
        alt={pokemon.name}
      />
    </div>
  );
};

export default Card;
