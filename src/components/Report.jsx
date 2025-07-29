import React from "react";

export default function Report() {
  const questions = JSON.parse(localStorage.getItem("quizQuestions") || "[]");
  const answers = JSON.parse(localStorage.getItem("quizAnswers") || "{}");

  if (questions.length === 0) {
    return <h2>No report to show.</h2>;
  }

  let correct = 0;

  questions.forEach((q, index) => {
    if (answers[index] === q.correct) {
      correct++;
    }
  });

  return (
    <div className="container">
      <h2>Quiz Report</h2>
      <p>Total Questions: {questions.length}</p>
      <p>Correct Answers: {correct}</p>
      <p>Score: {((correct / questions.length) * 100).toFixed(2)}%</p>

      <hr />

      {questions.map((q, idx) => (
        <div key={idx} className="report-question">
          <p dangerouslySetInnerHTML={{ __html: `Q${idx + 1}: ${q.question}` }} />

          <p>
            <strong>Your Answer: </strong>
            {answers[idx] ? (
              <span dangerouslySetInnerHTML={{ __html: answers[idx] }} />
            ) : (
              <i>Not Answered</i>
            )}
          </p>

          <p>
            <strong>Correct Answer: </strong>
            <span dangerouslySetInnerHTML={{ __html: q.correct }} />
          </p>
        </div>
      ))}
    </div>
  );
}
