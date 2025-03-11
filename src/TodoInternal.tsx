import { useState } from "react";
import {
	allToLowerCase,
	stateIndexRemove,
	markTodo,
	renameTodo,
	renameLog,
} from "./functions.ts";

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
				alert("You cannot add a blank item!");
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
										checkFunction={(e: any) => {
											setTodos((prev) =>
												markTodo(prev, index, e.target.checked)
											);
										}}
										renameFunction={() => {
											const renameDialog: string = `What would you like to rename '${todo.name}'?`;
											var renameInput = prompt(renameDialog) ?? "";
											setTodos((prev) => renameTodo(prev, index, renameInput));
											setLog((prev) => renameLog(prev, index, renameInput));
										}}
										deleteFunction={() => {
											if (!todo.done) {
												const deleteDialog: string = `Are you sure you want to delete '${todo.name}'?`;
												var dialog = confirm(deleteDialog);
												if (dialog) {
													removeTodo(index);
												}
											} else {
												removeTodo(index);
											}
										}}>
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
