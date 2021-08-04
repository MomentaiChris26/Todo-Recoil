import React from "react";
import { selector, atom, useRecoilState } from "recoil";
import { todoListState } from "../states";

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const handleUpdateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      <select value={filter} onChange={handleUpdateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

/**
 * Selectors represent a piece of derived state.
 * derived state is an output of passing a state to a function
 * that modifies it in some way
 * Allows building data based on other data
 */

// filtered state
const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

// Will rerun when todoListFilterState or todoListState changes
export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);
    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export default TodoListFilters;
