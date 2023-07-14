import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import StepForm from "./Pages/stepForm";
import AdvancePanel from "./Pages/AdvancePanel";
import FinalPanel from "./Pages/FinalPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stepForm" element={<StepForm />} />
        <Route path="/editor" element={<AdvancePanel />} />
        <Route path="/finalpanel" element={<FinalPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
