import { useRecoilValue } from "recoil";
import ItemCreator from "./ItemCreator";
import TodoItem from "./TodoItem";
import TodoListStats from "./TodoListStats";
import TodoListFilters, { filteredTodoListState } from "./TodoListFilters";
import FetchWeatherData from "./FetchWeatherData";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const TodoList = () => {
  const TodoList = useRecoilValue(filteredTodoListState);
  return (
    <>
      <ErrorBoundary>
        <FetchWeatherData />
      </ErrorBoundary>

      <TodoListStats />
      <TodoListFilters />
      <ItemCreator />
      {TodoList.map((todoItem) => {
        return <TodoItem key={todoItem.id} item={todoItem} />;
      })}
    </>
  );
};

export default TodoList;
