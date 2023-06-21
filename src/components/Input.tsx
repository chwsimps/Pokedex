import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { AppDispatch } from '../app/store';
import { getPokemon, getPokemonByName } from '../app/pokemonSlice';
import styles from '@/styles/Input.module.scss';

const Input = () => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const searchPokemonRef = useRef(new Subject<string>());

  useEffect(() => {
    const subscription = searchPokemonRef.current
      .pipe(
        debounceTime(500),
        switchMap((inputValue: string) =>
          dispatch(getPokemonByName(inputValue)),
        ),
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [dispatch]);

  const onPokemonSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value?.toLowerCase();

      if (value !== '') {
        searchPokemonRef.current.next(value);
      } else {
        dispatch(getPokemon());
      }
    },
    [dispatch, searchPokemonRef],
  );

  return (
    <div className={styles.input_container}>
      <p className={styles.input_container_description}>
        Search for a Pokémon by name or using its National Pokédex number.
      </p>
      <input
        onChange={onPokemonSearch}
        type="text"
        placeholder="Name or number"
      />
    </div>
  );
};

export default Input;
