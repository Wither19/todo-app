import { useState } from "react";
import "./scss/App.scss";

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

	function removeTodo(todoIndex: number): void {
		var end: boolean = false;
		if (todoIndex + 1 == todos.length) {
			end = true;
			setTodos((prev) => stateIndexRemove(prev, todoIndex, end));
			setLog((prev) => stateIndexRemove(prev, todoIndex, end));
		} else {
			end = false;
			setTodos((prev) => stateIndexRemove(prev, todoIndex, end));
			setLog((prev) => stateIndexRemove(prev, todoIndex, end));
		}
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
													style={{ transition: "background-color 150ms" }}
													className="badge bg-info rounded-pill cursor mx-2"
													onClick={() => {
														setTodos((prev) =>
															renameTodo(prev, index, todo.name)
														);
														setLog((prev) => renameLog(prev, index));
													}}>
													<FaEdit size="20" />
												</span>
												<span
													style={{ transition: "background-color 150ms" }}
													className={`badge bg-${
														todo.done ? "danger" : "secondary"
													} rounded-pill cursor mx-2`}
													onClick={() => removeTodo(index)}>
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
