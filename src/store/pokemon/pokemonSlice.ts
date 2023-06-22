import { createSlice } from '@reduxjs/toolkit';
import {
  getPokemon,
  getPokemonByName,
  getPokemonDetails,
} from './PokemonThunk';
import { SelectedPokemon, StateProps } from '../../utils/interfaces';

// Set localStorage for default value
const selectedPokemon: SelectedPokemon =
  localStorage.getItem('selectedPokemon') !== null
    ? JSON.parse(localStorage.getItem('selectedPokemon') as string)
    : null;

// Define initial state
const initialState: StateProps = {
  initialPokemonList: [],
  pokemonList: [],
  history: [],
  selectedPokemon,
  isLoading: false,
  isError: false,
};

// Define the slice
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setInitPokemonList(state) {
      state.pokemonList = state.initialPokemonList;
    },
  },
  extraReducers(builder) {
    // getPokemon
    builder.addCase(getPokemon.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPokemon.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.pokemonList = payload;
      if (!state.initialPokemonList.length) state.initialPokemonList = payload;
    });

    builder.addCase(getPokemon.rejected, (state) => {
      state.isError = true;
    });

    // getPokemonByName
    builder.addCase(getPokemonByName.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPokemonByName.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.history.push(payload);
      state.pokemonList = [payload];
    });

    builder.addCase(getPokemonByName.rejected, (state) => {
      state.isError = true;
    });

    // getPokemonDetails
    builder.addCase(getPokemonDetails.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPokemonDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.selectedPokemon = payload;
      localStorage.setItem('selectedPokemon', JSON.stringify(payload));
    });

    builder.addCase(getPokemonDetails.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { setInitPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
