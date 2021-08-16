import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { renderWithRouter } from './utils/test';
import { AppState } from './store/store';
import { Status } from './features/characters/characterSlice';
import App from './App';

const state: AppState = {
  characters: {
    status: Status.IDLE,
    searchValue: null,
    value: {
      count: 1,
      limit: 20,
      offset: 0,
      total: 1,
      results: [
        {
          id: 1234,
          name: 'Felipe Bueno Character',
          description: 'The best marvel character',
          series: {
            available: 0,
            collectionURI: '',
            items: []
          },
          thumbnail: {
            path: '',
            extension: '',
          }
        }
      ]
    }
  }
}

export const handlers = [
  rest.get('http://gateway.marvel.com/v1/public/characters', (req, res, ctx) => {
    return res(ctx.json({ data: state.characters.value }), ctx.delay(100));
  })
];

const server = setupServer(...handlers);

describe('<App />', () => {

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render home page', async () => {
    const screen = renderWithRouter(<App />, { preloadedState: state });

    expect(screen.queryByText(/Felipe Bueno Character/i)).not.toBeInTheDocument();

    // after fetch data
    expect(await screen.findByText(/Felipe Bueno Character/i)).toBeInTheDocument();
    expect(await screen.findByText(/Click here for details/i)).toBeInTheDocument();
  });

  it('should navigate to character details', async () => {
    const [ character ] = state.characters.value.results;
    const screen = renderWithRouter(<App />, {
      preloadedState: state,
      route: `/character/${1234}/details`,
      routeState: { character },
    });

    expect(await screen.findByText(/The best marvel character/i)).toBeInTheDocument();
    expect(await screen.findByText(/There's no series/i)).toBeInTheDocument();
  });
});
