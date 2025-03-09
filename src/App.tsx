import { useState } from "react";
import "./App.scss";

import * as bootstrap from "bootstrap";

function App() {
	const [draftText, setDraftText] = useState("");

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
				<div className="row"></div>
			</div>
		</>
	);
}

export default App;
