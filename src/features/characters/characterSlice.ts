import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

interface SerieSummary {
  name: string;
  resourceURI: string;
}
export interface Character {
    id: number;
    name: string
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    series: {
      available: number;
      collectionURI: string;
      items: Array<SerieSummary>;
    }
}

interface DataResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<Character>;
}

export interface CharacterState {
  value: DataResponse | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CharacterState = {
  value: null,
  status: 'idle',
};

export const fetchCharacterAsync = createAsyncThunk(
  'characters/fetchCharacters',
  async () => {
    const { data: resData } = await api.get<{ data: DataResponse }>('/v1/public/characters');
    return resData.data;
  }
);

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export default characterSlice.reducer;
