import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { Tooltip, Input } from "antd";

import { changeSearchValue } from "../../features/characters/characterSlice";
import { useAppSelector } from '../../hooks/useAppSelector';

const { Search } = Input;

export function CharacterSearch() {
  const [displayValue, setDisplayValue] = useState('');
  const { searchValue } = useAppSelector((state) => state.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplayValue(searchValue ?? '');
  }, [searchValue]);

  return (
    <Tooltip
      trigger={["focus"]}
      title="Return characters with names that begin with the specified!"
      placement="bottomLeft"
    >
      <Search
        aria-label="search-input"
        allowClear
        placeholder="Search Character by name..."
        enterButton="Search"
        size="large"
        value={displayValue}
        onChange={(event) => setDisplayValue(event.target.value)}
        onSearch={(value) => dispatch(changeSearchValue(value))}
      />
    </Tooltip>
  );
}
