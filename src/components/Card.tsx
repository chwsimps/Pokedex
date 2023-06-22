import { useNavigate } from 'react-router-dom';
import { Pokemon } from 'pokenode-ts';
import { pokemonData, pokemonIdFormat } from '../utils/helpers';
import styles from '@/styles/Card.module.scss';
import colors from '@/styles/_colors.module.scss';

interface CardProps {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  // Redux hooks
  const navigate = useNavigate();

  // Pokemon helper data
  const { imgSrc, typeNames, bgColor } = pokemonData(pokemon);

  const viewPokemonDetails = (id: number) => {
    localStorage.removeItem('selectedPokemon');
    navigate('/details', { state: { id } });
  };

  return (
    <div
      onClick={() => viewPokemonDetails(pokemon.id)}
      style={{ backgroundColor: colors[bgColor] }}
      className={styles.pokemon_card}
    >
      <p
        className={styles.pokemon_id}
        style={{
          backgroundColor: colors[`${bgColor}_light`],
        }}
      >
        {pokemonIdFormat(pokemon.id)}
      </p>
      <div className={styles.pokemon_card_details}>
        <h3>{pokemon.name}</h3>
        <div className={styles.pokemon_types}>
          {typeNames.map((type) => (
            <span
              key={type}
              className={styles.pokemon_type}
              style={{ backgroundColor: colors[`${type}_dark`] }}
            >
              {type}
            </span>
          ))}
        </div>
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
