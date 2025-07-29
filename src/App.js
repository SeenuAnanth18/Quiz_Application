import React from "react";
import { Routes, Route } from "react-router-dom";
import EmailForm from "./components/EmailForm";
import Quiz from "./components/Quiz";
import Report from "./components/Report";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EmailForm />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}
