import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import charactersReducer from '../features/characters/characterSlice';
import loggerMiddleware from '../middlewares/logger';

export default function configureCharactersStore() {
    const store = configureStore({
      reducer: {
        characters: charactersReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../features/characters/characterSlice', () =>
            store.replaceReducer(combineReducers({
                characters: charactersReducer,
            }))
        )
    }

    return store;
}

type Store = ReturnType<typeof configureCharactersStore>;
export type CharactersDispatch = Pick<Store, 'dispatch'>;
export type CharactersState = ReturnType<Store['getState']>; // infer state type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  CharactersState,
  unknown,
  Action<string>
>;
