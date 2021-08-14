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
  searchValue: string | null;
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
  searchValue: null
};

export const fetchCharactersAsync = createAsyncThunk<DataResponse, void, { state: AppState }>(
  'characters/fetchCharacters',
  async (_, { getState }) => {
    const {
      searchValue,
      value: { offset, limit }
    } = getState().characters;

    const { data: resData } = await api.get<{ data: DataResponse }>('/v1/public/characters', {
      params: {
        offset,
        limit,
        ...(searchValue ? { nameStartsWith: searchValue } : {})
      }
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
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersAsync.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchCharactersAsync.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      });
  },
});

export const { changeCurrentPage, changeSearchValue } = characterSlice.actions;
export default characterSlice.reducer;
