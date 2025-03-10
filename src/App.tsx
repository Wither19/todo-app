import { useState } from "react";
import "./App.scss";

import { IoMdRemoveCircleOutline } from "react-icons/io";

// import * as bootstrap from "bootstrap";

function App() {
	const [draftText, setDraftText] = useState("");
	const [todos, setTodos] = useState([
		{
			done: true,
			name: "Sample task",
		},
	]);
	const [loggedTodos, setLog] = useState(["Sample task"]);

	function updateDraft(): void {
		const draft = document.getElementById("todo-draft") as HTMLInputElement;
		setDraftText(draft.value);
	}

	function submitTodo(event: any): void {
		if (event.type == "keydown" && event.which == 13) {
			if (
				loggedTodos
					.map((item) => item.toLowerCase())
					.includes(draftText.toLowerCase())
			) {
				alert("The Todo list already contains this item!");
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
		if (todoIndex + 1 == todos.length) {
			setTodos((prev) => prev.slice(0, todoIndex));
		} else {
			setTodos((prev) => [
				...prev.slice(0, todoIndex),
				...prev.slice(todoIndex + 1),
			]);
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
				<div className="row">
					<div className="col-4"></div>
					<div className="col-8">
						<input
							type="text"
							id="todo-draft"
							value={draftText}
							onChange={updateDraft}
							onKeyDown={submitTodo}
						/>
					</div>
				</div>
				<br />
				<br />
				<br />
				<div className="row">
					<div className="col-8">
						<div className="list-group">
							{todos.length != 0 ? (
								todos.map((todo, index) => (
									<div className="row">
										<div className="col-6">
											<li key={todo.name} className="list-group-item">
												{todo.name}
											</li>
										</div>
										<div className="col-2">
											<button
												onClick={() => removeTodo(index)}
												type="button"
												className="btn btn-danger">
												<IoMdRemoveCircleOutline />
											</button>
										</div>
									</div>
								))
							) : (
								<>
									<h1>No Todos Yet</h1>
									<p>Add some!</p>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
