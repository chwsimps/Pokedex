import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import { lastValueFrom } from 'rxjs';
import { pokemonByName$, pokemonList$ } from '../services/api';

// Set localStorage for default value
const selectedPokemon: Pokemon | null =
  localStorage.getItem('selectedPokemon') !== null
    ? JSON.parse(localStorage.getItem('selectedPokemon') as string)
    : null;

// Define shape of the state
interface StateProps {
  initialPokemonList: Pokemon[];
  pokemonList: Pokemon[];
  history: Pokemon[];
  selectedPokemon: Pokemon | null;
  isLoading: boolean;
  isError: boolean;
}

// Define initial state
const initialState: StateProps = {
  initialPokemonList: [],
  pokemonList: [],
  history: [],
  selectedPokemon,
  isLoading: false,
  isError: false,
};

// Async thunks
export const getPokemon = createAsyncThunk(
  'pokemon/getPokemon',
  async () => await lastValueFrom(pokemonList$),
);

export const getPokemonByName = createAsyncThunk(
  'pokemon/getPokemonByName',
  async (name: string) => await lastValueFrom(pokemonByName$(name)),
);

export const getPokemonDetails = createAsyncThunk(
  'pokemon/getPokemonDetails',
  async (name: string) => await lastValueFrom(pokemonByName$(name)),
);

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
