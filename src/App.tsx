import { useState } from "react";
import "./App.scss";

import * as bootstrap from "bootstrap";

function App() {
	const [draftText, setDraftText] = useState("");

	const [todos, setTodos] = useState([
		{
			done: true,
			name: "Sample task",
		},
	]);

	const updateDraft = () => {
		const draft = document.getElementById("todo-draft") as HTMLInputElement;
		setDraftText(draft.value);
	};

	const submitDraft = () => {};

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
							onKeyUp={submitDraft}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-8"></div>
				</div>
			</div>
		</>
	);
}

export default App;
