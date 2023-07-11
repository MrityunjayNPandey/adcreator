import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AdvancePanel from "./Pages/AdvancePanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<AdvancePanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
