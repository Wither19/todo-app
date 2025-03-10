import { useState } from "react";
import "./App.scss";

import { allToLowerCase, stateIndexRemove, markTodo } from "./functions.ts";

import { IoMdRemoveCircleOutline } from "react-icons/io";

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
					className="input-lg"
					id="todo-draft"
					value={draftText}
					onChange={updateDraft}
					onKeyDown={submitTodo}
				/>
				<br />
				<br />
				<br />
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
														markTodo(prev, e.currentTarget.checked, index)
													);
												}}
											/>
											{todo.name}
											<span
												className="badge bg-danger rounded-pill cursor"
												onClick={() => removeTodo(index)}>
												<IoMdRemoveCircleOutline size="24" />
											</span>
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
