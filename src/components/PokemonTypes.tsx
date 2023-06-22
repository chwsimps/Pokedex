import styles from '@/styles/PokemonTypes.module.scss';
import colors from '@/styles/_colors.module.scss';

interface PokemonTypesProps {
  typeNames: string[];
}

const PokemonTypes = ({ typeNames }: PokemonTypesProps) => {
  return (
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
  );
};

export default PokemonTypes;
