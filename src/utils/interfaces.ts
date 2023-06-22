import { EvolutionChain, Pokemon, PokemonSpecies } from 'pokenode-ts';

// State interfaces
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

// Helper interfaces
export interface EvolutionChainData {
  name: string;
  id: number;
}
