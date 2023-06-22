import { EvolutionChain, Pokemon, PokemonSpecies } from 'pokenode-ts';

export interface SelectedPokemon {
  selected: Pokemon;
  species: PokemonSpecies;
  evolution: EvolutionChain;
}

export interface StateProps {
  initialPokemonList: Pokemon[];
  pokemonList: Pokemon[];
  history: Pokemon[];
  selectedPokemon: SelectedPokemon;
  isLoading: boolean;
  isError: boolean;
}
