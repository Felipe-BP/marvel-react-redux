import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import charactersReducer from '../features/characters/characterSlice';
import loggerMiddleware from '../middlewares/logger';
import { isDevMode } from '../utils/isDevMode';

export default function configureAppStore() {
    const store = configureStore({
      reducer: {
        characters: charactersReducer,
      },
      middleware: (getDefaultMiddleware) => isDevMode()
        ? getDefaultMiddleware().concat(loggerMiddleware)
        : getDefaultMiddleware()
    });

    if (isDevMode() && module.hot) {
      module.hot.accept('../features/characters/characterSlice', () =>
        store.replaceReducer(combineReducers({
            characters: charactersReducer,
        }))
      )
    }

    return store;
}

type Store = ReturnType<typeof configureAppStore>;
export type AppState = ReturnType<Store['getState']>; // infer state type
