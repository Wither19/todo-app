import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// import * as bootstrap from "bootstrap";

import "@fontsource-variable/ubuntu-sans/standard.css";

import "@fontsource-variable/inter/standard.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
