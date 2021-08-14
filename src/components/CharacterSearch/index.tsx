import { Tooltip, Input } from "antd";
import { useDispatch } from "react-redux";
import { changeSearchValue } from "../../features/characters/characterSlice";

const { Search } = Input;

export function CharacterSearch() {
  const dispatch = useDispatch();

  return (
    <Tooltip
      trigger={["focus"]}
      title="Return characters with names that begin with the specified!"
      placement="bottomLeft"
    >
      <Search
        allowClear
        placeholder="Search Character by name..."
        enterButton="Search"
        size="large"
        onSearch={(value) => dispatch(changeSearchValue(value))}
      />
    </Tooltip>
  );
}
