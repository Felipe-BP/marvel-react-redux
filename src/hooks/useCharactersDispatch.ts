import { useDispatch } from 'react-redux';
import { CharactersDispatch } from '../store/character.store';

export const useCharactersDispatch = () => useDispatch<CharactersDispatch>();
