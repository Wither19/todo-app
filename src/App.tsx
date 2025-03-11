import { useState } from "react";
import "./scss/App.scss";

import "@fontsource-variable/ubuntu-sans/standard.css";

import "@fontsource-variable/inter/standard.css";

import {
	allToLowerCase,
	stateIndexRemove,
	markTodo,
	renameTodo,
	renameLog,
} from "./functions.ts";

import { FaTrash, FaEdit } from "react-icons/fa";

// import * as bootstrap from "bootstrap";

function App() {
	// State bound to todo addition input
	const [draftText, setDraftText] = useState("");
	// Object structure for a todo item
	const [todos, setTodos] = useState([
		{
			done: false,
			name: "Sample task",
		},
	]);
	// A record of all todos in a simple array, used to detect duplicates.
	const [loggedTodos, setLog] = useState(["Sample task"]);

	// Updates the value of the draft state to the input value.
	function updateDraft(): void {
		const draft = document.getElementById("todo-draft") as HTMLInputElement;
		setDraftText(draft.value);
	}

	// Submits what is in the draft to a new entry in the todo array, and the todo log. Updates the UI, of course.
	function submitTodo(event: any): void {
		if (event.type == "keydown" && event.which == 13) {
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
			<div className="container-md">
				<div className="row">
					<div className="col-4"></div>
					<div className="col-4">
						<div className="display-3">Todo App</div>
					</div>
					<div className="col-4"></div>
				</div>
				<br />
				<br />
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
										<li
											key={todo.name}
											className="list-group-item d-flex justify-content-between align-items-center">
											<input
												className="form-check-input my-1"
												type="checkbox"
												checked={todo.done}
												onChange={(e) => {
													setTodos((prev) =>
														markTodo(prev, e.target.checked, index)
													);
												}}
											/>
											<span className={todo.done ? "completed" : ""}>
												{todo.name}
											</span>
											<div>
												<span
													className="badge bg-info rounded-pill cursor mx-2"
													onClick={() => {
														var renameInput =
															prompt(
																`What would you like to rename '${todo.name}'?`
															) ?? "";
														setTodos((prev) =>
															renameTodo(prev, index, renameInput)
														);
														setLog((prev) =>
															renameLog(prev, index, renameInput)
														);
													}}>
													<FaEdit size="20" />
												</span>
												<span
													className={`badge bg-${
														todo.done ? "danger" : "secondary"
													} rounded-pill cursor mx-2`}
													onClick={() => {
														var dialog = confirm(
															`Are you sure you want to delete '${todo.name}'?`
														);

														if (dialog) {
															removeTodo(index);
														}
													}}>
													<FaTrash size="20" />
												</span>
											</div>
										</li>
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
			</div>
		</>
	);
}

export default App;
