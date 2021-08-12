import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { CharactersState } from '../store/character.store';

export const useCharactersSelector: TypedUseSelectorHook<CharactersState> = useSelector;