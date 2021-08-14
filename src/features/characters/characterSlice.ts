import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { AppState } from '../../store/store';

export enum Status {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  FAILED = 'FAILED'
}

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
  value: DataResponse;
  status: Status;
}

const initialState: CharacterState = {
  value: {
    offset: 0,
    limit: 20,
    total: 0,
    count: 0,
    results: [],
  },
  status: Status.IDLE,
};

export const fetchCharacterAsync = createAsyncThunk<DataResponse, void, { state: AppState }>(
  'characters/fetchCharacters',
  async (_, { getState }) => {
    const { offset, limit } = getState().characters.value;
    const { data: resData } = await api.get<{ data: DataResponse }>('/v1/public/characters', {
      params: { offset, limit }
    });
    return resData.data;
  }
);

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.value.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterAsync.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchCharacterAsync.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      });
  },
});

export const { changeCurrentPage } = characterSlice.actions;
export default characterSlice.reducer;
