import { ReactNode } from 'react';
import { Queries } from '@testing-library/dom';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore, PreloadedState } from '@reduxjs/toolkit';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import charactersReducer, { CharacterState } from '../features/characters/characterSlice';

type WrapperProps = {
    children?: ReactNode;
}

type Options<Q extends Queries> = RenderOptions<Q> & {
    preloadedState?: PreloadedState<{ characters: CharacterState }>;
    store?: EnhancedStore;
};

function render<Q extends Queries>(
    ui: React.ReactElement,
    {
        preloadedState,
        store = configureStore<{ characters: CharacterState }>({ reducer: { characters: charactersReducer }, preloadedState }),
        ...renderOptions
    }: Options<Q> = {}
) {
    function Wrapper({ children }: WrapperProps) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function renderWithRouter<Q extends Queries>(
    ui: React.ReactElement,
    {
        preloadedState,
        store = configureStore<{ characters: CharacterState }>({ reducer: { characters: charactersReducer }, preloadedState }),
        route = '/',
        routeState = {},
        ...renderOptions
    }: Options<Q> & { route?: string; routeState?: unknown } = {}
) {
    const history = createBrowserHistory();
    history.push(route, routeState);

    function Wrapper({ children }: WrapperProps) {
        return <Provider store={store}>
            <Router history={history}>{children}</Router>
        </Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render, renderWithRouter };