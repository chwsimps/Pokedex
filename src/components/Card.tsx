import styles from '@/styles/Card.module.scss';
import colors from '@/styles/_colors.module.scss';
import { Pokemon } from 'pokenode-ts';

interface CardProps {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  const imgSrc: string = pokemon.sprites.other?.dream_world
    .front_default as string;
  const typeNames: string[] = pokemon.types.map((t) => t.type.name);
  const bgColor: string = typeNames[0];

  const padNumber = (num: number) => `#${num.toString().padStart(4, '0')}`;

  return (
    <div
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
