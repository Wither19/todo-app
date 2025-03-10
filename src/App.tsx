import { useState } from "react";
import "./App.scss";

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

	const updateDraft = () => {
		const draft = document.getElementById("todo-draft") as HTMLInputElement;
		setDraftText(draft.value);
	};

	const submitDraft = (event: any) => {
		if (event.type == "keydown" && event.which == 13) {
			if (loggedTodos.includes(draftText)) {
				alert("The Todo list already contains this item!");
			} else {
				setTodos((prev) => [...prev, { name: draftText, done: false }]);
				setLog((prev) => [...prev, draftText]);
				const draft = document.getElementById("todo-draft") as HTMLInputElement;
				draft.value = "";
				updateDraft();
			}
		}
	};

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
							onKeyDown={submitDraft}
						/>
					</div>
				</div>
				<br />
				<br />
				<br />
				<div className="row">
					<div className="col-8">
						<div className="list-group">
							{todos.map((todo) => (
								<li key={todo.name} className="list-group-item">
									{todo.name}
								</li>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
