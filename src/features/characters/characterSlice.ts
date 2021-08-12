import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

interface Character {
    id: number;
    name: string
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    // modified (Date, optional): The date the resource was most recently modified.,
    // resourceURI (string, optional): The canonical URL identifier for this resource.,
    // urls (Array[Url], optional): A set of public web site URLs for the resource.,
    // comics (ComicList, optional): A resource list containing comics which feature this character.,
    // stories (StoryList, optional): A resource list of stories in which this character appears.,
    // events (EventList, optional): A resource list of events in which this character appears.,
    // series (SeriesList, optional): A resource list of series in which this character appears.
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
