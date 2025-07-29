import React from "react";

export default function Report() {
  const questions = JSON.parse(localStorage.getItem("quizQuestions") || "[]");
  const answers = JSON.parse(localStorage.getItem("quizAnswers") || "{}");

  if (questions.length === 0) {
    return (
      <div className="container report-container">
        <h2>No report to show.</h2>
      </div>
    );
  }

  let correct = 0;

  questions.forEach((q, index) => {
    if (answers[index] === q.correct) {
      correct++;
    }
  });

  return (
    <div className="container report-container">
      <h2 className="report-title">Quiz Report</h2>
      <div className="report-summary">
        <p><strong>Total Questions:</strong> {questions.length}</p>
        <p><strong>Correct Answers:</strong> {correct}</p>
        <p>
          <strong>Score:</strong>{" "}
          <span className={correct / questions.length >= 0.7 ? "score-pass" : "score-fail"}>
            {((correct / questions.length) * 100).toFixed(2)}%
          </span>
        </p>
      </div>

      <hr className="divider" />

      {questions.map((q, idx) => {
        const isCorrect = answers[idx] === q.correct;
        return (
          <div
            key={idx}
            className={`report-question ${isCorrect ? "correct" : "incorrect"}`}
          >
            <p className="question-text" dangerouslySetInnerHTML={{ __html: `Q${idx + 1}: ${q.question}` }} />
            <p>
              <strong>Your Answer:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: answers[idx] || "<i>Not Answered</i>",
                }}
              />
            </p>
            {!isCorrect && (
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span dangerouslySetInnerHTML={{ __html: q.correct }} />
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
