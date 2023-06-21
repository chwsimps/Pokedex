import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import { lastValueFrom } from 'rxjs';
import { pokemonByName$, pokemonList$ } from '../services/api';

const selectedPokemon: Pokemon | null =
  localStorage.getItem('selectedPokemon') !== null
    ? JSON.parse(localStorage.getItem('selectedPokemon') as string)
    : null;

// Define shape of the state
interface StateProps {
  pokemon: Pokemon[];
  history: Pokemon[];
  selectedPokemon: Pokemon | null;
  isLoading: boolean;
  isError: boolean;
}

// Define initial state
const initialState: StateProps = {
  pokemon: [],
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
  reducers: {},
  extraReducers(builder) {
    // getPokemon
    builder.addCase(getPokemon.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPokemon.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.pokemon = payload;
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
      state.pokemon = [payload];
      state.history.push(payload);
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

export default pokemonSlice.reducer;
