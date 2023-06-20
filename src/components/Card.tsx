import styles from '@/styles/Card.module.scss';
import colors from '@/styles/_colors.module.scss';
import { Pokemon } from 'pokenode-ts';

interface CardProps {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  const imgSrc = pokemon.sprites.other?.dream_world.front_default as string;
  const typeNames = pokemon.types.map((t) => t.type.name);

  return (
    <div
      style={{ backgroundColor: colors[typeNames[0]] }}
      className={styles.pokemon_card}
    >
      <div className={styles.pokemon_card_details}>
        <p className={styles.detail_id}>{pokemon.id}</p>
        <h3>{pokemon.name}</h3>
        {typeNames.map((type) => (
          <span
            className={styles.pokemon_type}
            style={{ backgroundColor: colors[`${type}_type`] }}
          >
            {type}
          </span>
        ))}
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
