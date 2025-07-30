# 🧠 Quiz App - React

This is a simple quiz application built using React for the CausalFunnel Software Engineer Intern assignment.

## 🚀 Features

- Email-based quiz entry
- 15 questions fetched from Open Trivia DB API
- 30-minute countdown timer with auto-submit
- Navigation across questions
- Visual indicator of attempted and visited questions
- Final report page showing correct vs submitted answers

---

## 📺 Preview

Watch the demo video here: [https://drive.google.com/file/d/1pp-Z4uD-0ZEn6QXHaMbZubNDtKLfYHYT/view?usp=drivesdk]

---

## 🌐 Live App

Visit the live application: [https://quiz-application-three-gamma.vercel.app/]

---

## 🛠️ Tech Stack

- React.js
- HTML, CSS
- Open Trivia DB API

---

## 📦 Installation & Running Locally

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
npm install
npm start
```

---

## 📝 Assumptions

- Email validation is basic and stored only in localStorage (not used further).
- All quiz questions are fetched at once when the quiz starts.
- Quiz is auto-submitted after the timer runs out.

---

## 🧩 Component Overview

- **EmailForm**: Start page where user enters email to begin quiz.
- **QuizPage**: Displays the 15 quiz questions, timer, and navigation.
- **ResultPage**: Shows correct answers and user's submitted answers.

---

## 🔄 Challenges Faced

- Managing timer with auto-submit logic
- Preserving state while navigating between questions
- Displaying clean UI with minimal dependencies

---


## 📚 API Reference

- **Open Trivia DB API**: https://opentdb.com/api.php?amount=15

---

## 👨‍💻 Author

**Seenu Ananth**  
---
