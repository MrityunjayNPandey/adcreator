import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import StepForm from "./Pages/stepForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stepForm" element={<StepForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
