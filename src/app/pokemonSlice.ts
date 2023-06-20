import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import { lastValueFrom } from 'rxjs';
import { pokemonList$ } from '../services/api';

interface StateProps {
  pokemon: Pokemon[];
  history: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const initialState: StateProps = {
  pokemon: [],
  history: [],
  selectedPokemon: null,
  loading: false,
  error: null,
};

export const getPokemon = createAsyncThunk('pokemon/getPokemon', async () => {
  const pokemon: Pokemon[] = await lastValueFrom(pokemonList$);
  console.log(pokemon);
  return pokemon;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPokemon.fulfilled, (state, { payload }) => {
      state.pokemon = payload;
    });
  },
});

export default pokemonSlice.reducer;
