import characterReducer, {
    Status,
    CharacterState,
    changeCurrentPage,
    changeSearchValue,
} from './characterSlice';

describe('character reducer', () => {
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

    it('should setup the initial state', () => {
        expect(characterReducer(undefined, { type: 'unknown' })).toEqual({
            ...initialState
        });
    });

    it('should change to expected page', () => {
        const state = characterReducer(initialState, changeCurrentPage(2));
        expect(state.value).toMatchObject({ offset: 2 });
    });

    it('should change current search character value', () => {
        const state = characterReducer(initialState, changeSearchValue('Spider'));
        expect(state.searchValue).toMatch('Spider');
    });
});