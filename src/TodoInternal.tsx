import { useState } from "react";
import { allToLowerCase, stateIndexRemove, markTodo, renameTodo, renameLog } from "./functions.ts";

import TodoListItem from "./TodoListItem";

function TodoInternal() {
  // State bound to todo addition input
  const [draftText, setDraftText] = useState("");
  // Object structure for a todo item
  const [todos, setTodos] = useState([
    {
      done: false,
      name: "Sample task",
    },
    {
      done: true,
      name: "Sample task 2",
    },
  ]);
  // A record of all todos in a simple array, used to detect duplicates.
  const [loggedTodos, setLog] = useState(["Sample task", "Sample task 2"]);

  // Updates the value of the draft state to the input value.
  function updateDraft(): void {
    const draft = document.getElementById("todo-draft") as HTMLInputElement;
    setDraftText(draft.value);
  }

  // Submits what is in the draft to a new entry in the todo array, and the todo log. Updates the UI, of course.
  function submitTodo(event: any): void {
    if (event.which == 13) {
      if (allToLowerCase(loggedTodos).includes(draftText.toLowerCase())) {
        alert("The Todo list already contains this item!");
      } else if (!draftText) {
        setDraftText("[Unnamed task]");
      } else {
        setTodos((prev) => [...prev, { name: draftText, done: false }]);
        setLog((prev) => [...prev, draftText]);
        const draft = document.getElementById("todo-draft") as HTMLInputElement;
        draft.value = "";
        updateDraft();
      }
    }
  }

  // Removes the list item through each individual delete button.
  function removeTodo(todoIndex: number): void {
    setTodos((prev) => stateIndexRemove(prev, todoIndex));
    setLog((prev) => stateIndexRemove(prev, todoIndex));
  }

  function handleCheck(event: any, ind: number) {
    setTodos((prev) => markTodo(prev, ind, event.target.checked));
  }

  function handleRename(taskName: string, ind: number) {
    const renameDialog: string = `What would you like to rename '${taskName}'?`;
    var renameInput = prompt(renameDialog) ?? "";
    setTodos((prev) => renameTodo(prev, ind, renameInput));
    setLog((prev) => renameLog(prev, ind, renameInput));
  }

  function handleDelete(taskName: string, ind: number, completed: boolean) {
    if (!completed) {
      const deleteDialog: string = `Are you sure you want to delete '${taskName}'?`;
      var dialog = confirm(deleteDialog);
      if (dialog) {
        removeTodo(ind);
      }
    } else {
      removeTodo(ind);
    }
  }

  return (
    <>
      <input
        type="text"
        className="input-lg my-5"
        id="todo-draft"
        value={draftText}
        onChange={updateDraft}
        onKeyDown={submitTodo}
      />
      <div className="row">
        <div className="col-4">
          <ul className="list-group">
            {todos.length != 0 ? (
              todos.map((todo, index) => (
                <>
                  <TodoListItem
                    key={todo.name}
                    listInd={index}
                    completed={todo.done}
                    checkFunction={() => handleCheck(event, index)}
                    renameFunction={() => handleRename(todo.name, index)}
                    deleteFunction={() => handleDelete(todo.name, index, todo.done)}
                  >
                    {todo.name}
                  </TodoListItem>
                </>
              ))
            ) : (
              <>
                <h1>No Todos Yet</h1>
                <p>Add some!</p>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TodoInternal;
