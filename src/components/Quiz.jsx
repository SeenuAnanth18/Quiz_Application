import "./../App.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState([]);
  const [timer, setTimer] = useState(1800); // 30 mins
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  // Fetch questions
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=15")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((q) => ({
          question: q.question,
          correct: q.correct_answer,
          options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(formatted);
      });
  }, []);

  // Auto-submit when time runs out
  const handleSubmit = useCallback(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
    clearInterval(intervalRef.current);
    navigate("/report");
  }, [answers, questions, navigate]);

  // Timer logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleSubmit();
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [handleSubmit]);

  // Track visited questions
  useEffect(() => {
    if (!visited.includes(current)) {
      setVisited((prev) => [...prev, current]);
    }
  }, [current]);

  const handleOptionClick = (option) => {
    setAnswers((prev) => ({ ...prev, [current]: option }));
  };

  const formatTime = () => {
    const min = String(Math.floor(timer / 60)).padStart(2, "0");
    const sec = String(timer % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  if (questions.length === 0) return <h3>Loading questions...</h3>;

  const q = questions[current];

  return (
    <div className="container">
      <h2>CausalFunnel Quiz Application</h2>
      <div className="timer">Time Left: {formatTime()}</div>

      <h3 dangerouslySetInnerHTML={{ __html: `Q${current + 1}: ${q.question}` }} />

      <div className="options">
        {q.options.map((opt, idx) => (
          <label key={idx}>
            <input
              type="radio"
              name={`q-${current}`}
              value={opt}
              checked={answers[current] === opt}
              onChange={() => handleOptionClick(opt)}
            />
            <span dangerouslySetInnerHTML={{ __html: opt }} />
          </label>
        ))}
      </div>

      <div className="nav-buttons">
        {current > 0 && <button onClick={() => setCurrent(current - 1)}>Previous</button>}
        {current < questions.length - 1 && <button onClick={() => setCurrent(current + 1)}>Next</button>}
        {current === questions.length - 1 && <button onClick={handleSubmit}>Submit</button>}
      </div>

      <div className="qnav">
        <h4>Jump to Question:</h4>
        {questions.map((_, idx) => (
          <button
            key={idx}
            className={
              answers[idx]
                ? "answered"
                : visited.includes(idx)
                ? "visited"
                : ""
            }
            onClick={() => setCurrent(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
