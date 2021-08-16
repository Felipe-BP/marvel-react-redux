import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { Status } from '../features/characters/characterSlice';
import { AppState } from '../store/store';
import { renderWithRouter, fireEvent } from '../utils/test';
import { Home } from './Home';

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
        },
        {
          id: 12345,
          name: 'Spider man Character',
          description: 'Spider man description',
          series: {
            available: 0,
            collectionURI: '',
            items: []
          },
          thumbnail: {
            path: '',
            extension: '',
          }
        },
      ]
    }
  }
}

let nameStartsWith: string | null = null;

export const handlers = [
  rest.get('http://gateway.marvel.com/v1/public/characters', (req, res, ctx) => {
    const data = { ...state.characters.value };

    if (nameStartsWith) {
      data.results = data.results.filter(({ name }) => name.startsWith(nameStartsWith as string));
    }

    return res(ctx.json({ data }), ctx.delay(100));
  }),
];

const server = setupServer(...handlers)

describe('<Home />', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    nameStartsWith = null;
    server.resetHandlers();
  })
  afterAll(() => server.close())

  it('should show a loading and show characters after fetch', async () => {
    const screen = renderWithRouter(<Home />, { preloadedState: state });

    const loadingEl = screen.getByTestId('loading');
    expect(loadingEl).toBeTruthy();

    // after fetch data
    expect(await screen.findByText(/Felipe Bueno Character/i)).toBeInTheDocument();
    expect(await screen.findByText(/Spider man Character/i)).toBeInTheDocument();
  });

  it('should show empty result after search', async () => {
    const screen = renderWithRouter(<Home />, { preloadedState: state });

    const searchInput = screen.getByLabelText('search-input');
    const searchButton = screen.getByTestId('search-bar-col')
      .querySelector('.ant-input-search-button') as HTMLElement; // TODO refactor to not use class
    fireEvent.change(searchInput, { target: { value: 'test' } });
    nameStartsWith = 'test';
    fireEvent.click(searchButton);

    expect(await screen.findByText(/No Data/i)).toBeInTheDocument();

    const emptyEl = screen.getByTestId('empty');
    expect(emptyEl).toBeTruthy();
  });

  it('should search character', async () => {
    const screen = renderWithRouter(<Home />, { preloadedState: state });

    const searchInput = screen.getByLabelText('search-input');
    const searchButton = screen.getByTestId('search-bar-col')
      .querySelector('.ant-input-search-button') as HTMLElement; // TODO refactor to not use class
    fireEvent.change(searchInput, { target: { value: 'Spider' } });
    nameStartsWith = 'Spider';
    fireEvent.click(searchButton);

    expect(await screen.findByText(/Spider man Character/i)).toBeInTheDocument();
    expect(screen.queryByText(/Felipe Bueno Character/i)).not.toBeInTheDocument();
  });
});