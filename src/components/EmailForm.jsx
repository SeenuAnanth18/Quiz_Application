import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../App.css"; // make sure CSS is imported

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userEmail", email);
    navigate("/quiz");
  };

  return (
    <div className="container">
      <h2>Welcome to the CausalFunnel Quiz App</h2>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
        Enter your email to begin the quiz. You'll have 30 minutes to answer 15 questions.
      </p>
      <form onSubmit={handleSubmit} className="form-style">
        <input
          type="email"
          required
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
        />
        <br />
        <button type="submit" className="start-btn">Start Quiz</button>
      </form>
    </div>
  );
}
