import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initGtmLeakedTextCleanup } from "./lib/gtm-leaked-text";

initGtmLeakedTextCleanup();

createRoot(document.getElementById("root")!).render(<App />);
