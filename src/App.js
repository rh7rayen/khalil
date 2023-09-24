import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendCode from "./SendCode";
import VerifCode from "./VerifCode";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SendCode />} />
        <Route path="/verif" element={<VerifCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
