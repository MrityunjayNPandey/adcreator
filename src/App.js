import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Choose from "./Pages/choose";
import AdvancePanel from "./Pages/AdvancePanel";
import FinalPanel from "./Pages/FinalPanel";
import RenderImages from "./Pages/renderImages";
import Preview from "./Pages/preview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/editor" element={<AdvancePanel />} />
        <Route path="/finalpanel" element={<FinalPanel />} />
        <Route path="/renderImages" element={<RenderImages />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
