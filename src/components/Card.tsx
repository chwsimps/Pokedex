import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from 'pokenode-ts';
import { AppDispatch } from '../app/store';
import { getPokemonDetails } from '../app/pokemonSlice';
import styles from '@/styles/Card.module.scss';
import colors from '@/styles/_colors.module.scss';

interface CardProps {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const viewPokemonDetails = async (id: number) => {
    await dispatch(getPokemonDetails(id));
    navigate('/details');
  };

  // Img url
  const imgSrc: string = pokemon.sprites.other?.dream_world
    .front_default as string;

  // Pokemon type
  const typeNames: string[] = pokemon.types.map((t) => t.type.name);
  const bgColor: string = typeNames[0];

  // Pokemon ID format
  const padNumber = (num: number) => `#${num.toString().padStart(4, '0')}`;

  return (
    <div
      onClick={() => viewPokemonDetails(pokemon.name)}
      style={{ backgroundColor: colors[bgColor] }}
      className={styles.pokemon_card}
    >
      <p
        className={styles.pokemon_id}
        style={{
          backgroundColor: colors[`${bgColor}_light`],
        }}
      >
        {padNumber(pokemon.id)}
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
