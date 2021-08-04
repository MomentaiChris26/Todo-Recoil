import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../states";

const ItemCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    if (inputValue) {
      setTodoList((oldTodoList) => [
        ...oldTodoList,
        { id: getId(), name: inputValue, isComplete: false },
      ]);
      setInputValue("");
    }
  };

  const onChange = ({ target: { value } }) => {
    if (value) {
      setInputValue(value);
    }
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

let id = 0;
function getId() {
  return id++;
}

export default ItemCreator;
