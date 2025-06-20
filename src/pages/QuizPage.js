//           {submitted && (
//             answers[idx] === q.correctAnswer
//               ? <span style={{ color: 'green' }}>✔️ Đúng</span>
//               : <span style={{ color: 'red' }}>❌ Sai</span>
//           )}


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

// function QuizPage({ tests }) {
//   const { testIndex } = useParams();
//   const questions = tests[testIndex];
//   const [answers, setAnswers] = useState(Array(questions.length).fill(null));
//   const [submitted, setSubmitted] = useState(false);

//   const handleSelect = (qIdx, aIdx) => {
//     if (!submitted) {
//       const copy = [...answers];
//       copy[qIdx] = aIdx;
//       setAnswers(copy);
//     }
//   };

//   const correctCount = questions.filter((q, idx) => q.correctAnswer === answers[idx]).length;

//   const handleRetry = () => {
//     setAnswers(Array(questions.length).fill(null));  
//     setSubmitted(false);  
//   };

//   return (
//     <div className="quiz-container">
//       <h1>Đề số {parseInt(testIndex) + 1}</h1>
//       <Link to="/">← Quay lại danh sách đề</Link>
//       {questions.map((q, idx) => {
//         const isCorrect = answers[idx] === q.correctAnswer;
//         const isAnswered = answers[idx] !== null;
//         const isWrong = submitted && isAnswered && !isCorrect;
//         const isUnanswered = !isAnswered;

//         return (
//           <div
//             key={q.questionNumber}
//             className="quiz-question"
//             style={{
//               backgroundColor: submitted
//                 ? isCorrect
//                   ? "#d4edda" 
//                   : isWrong
//                   ? "#f8d7da" 
//                   : isUnanswered
//                   ? "#f8d7da" 
//                   : "" 
//                 : "",
//             }}
//           >
//             <p style={{fontWeight:"bold"}}><b>Câu {idx + 1}: </b>{q.questionTitle}</p>
//             {q.image && <img src={q.image} alt="" style={{ maxWidth: '100%', height: 'auto', display: "block", marginBottom: 8 }} />}
//             <div>
//               {q.answer.map((a, aIdx) => {
//                 const answerStyle = {
//                   backgroundColor: submitted && aIdx === q.correctAnswer ? "#28a745" : "",
//                   color: submitted && aIdx === q.correctAnswer ? "white" : "",
//                 };

//                 const wrongAnswerStyle = submitted && aIdx === answers[idx] && !isCorrect
//                   ? { backgroundColor: "#f8d7da", color: "white" }
//                   : {};

//                 return (
//                   <label key={aIdx} style={{ display: "block", margin: 4 }}>
//                     <input
//                       type="radio"
//                       name={`q${idx}`}
//                       value={aIdx}
//                       disabled={submitted}
//                       checked={answers[idx] === aIdx}
//                       onChange={() => handleSelect(idx, aIdx)}
//                     />
//                     <span style={{ ...answerStyle, ...wrongAnswerStyle }}>
//                       {a.content}
//                     </span>
//                   </label>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//       {!submitted
//         ? <button onClick={() => setSubmitted(true)}>Chấm điểm</button>
//         : (
//           <div>
//             <h2>Bạn đúng {correctCount} / {questions.length} câu</h2>
//             <button onClick={handleRetry}>Làm lại</button> 
//           </div>
//         )
//       }
//     </div>
//   );
// }

// export default QuizPage;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function QuizPage({ tests }) {
  const { testIndex } = useParams();
  const [questions, setQuestions] = useState(tests[testIndex]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

 
  const randomizeQuestions = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);  
    setQuestions(shuffledQuestions);
    setAnswers(Array(shuffledQuestions.length).fill(null));  
    setSubmitted(false);  
  };

  const handleSelect = (qIdx, aIdx) => {
    if (!submitted) {
      const copy = [...answers];
      copy[qIdx] = aIdx;
      setAnswers(copy);
    }
  };

  const correctCount = questions.filter((q, idx) => q.correctAnswer === answers[idx]).length;

  return (
    <div className="quiz-container">
      <h1>Đề số {parseInt(testIndex) + 1}</h1>
      <Link to="/">← Quay lại danh sách đề</Link>
      {questions.map((q, idx) => {
        const isCorrect = answers[idx] === q.correctAnswer;
        const isAnswered = answers[idx] !== null;
        const isWrong = submitted && isAnswered && !isCorrect;
        const isUnanswered = !isAnswered;

        return (
          <div
            key={q.questionNumber}
            className="quiz-question"
            style={{
              backgroundColor: submitted
                ? isCorrect
                  ? "#d4edda"  
                  : isWrong
                  ? "#f8d7da"  
                  : isUnanswered
                  ? "#f8d7da"  
                  : ""         
                : "",
            }}
          >
            <p style={{fontWeight:"bold"}}><b>Câu {idx + 1}: </b>{q.questionTitle}</p>
            {q.image && <img src={q.image} alt="" style={{ maxWidth: '100%', height: 'auto', display: "block", marginBottom: 8 }} />}
            <div>
              {q.answer.map((a, aIdx) => {
                const answerStyle = {
                  backgroundColor: submitted && aIdx === q.correctAnswer ? "#28a745" : "",
                  color: submitted && aIdx === q.correctAnswer ? "white" : "",
                };

                const wrongAnswerStyle = submitted && aIdx === answers[idx] && !isCorrect
                  ? { backgroundColor: "red", color: "white" }
                  : {};

                return (
                  <label key={aIdx} style={{ display: "block", margin: 4 }}>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={aIdx}
                      disabled={submitted}
                      checked={answers[idx] === aIdx}
                      onChange={() => handleSelect(idx, aIdx)}
                    />
                    <span style={{ ...answerStyle, ...wrongAnswerStyle }}>
                      {a.content}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
      {!submitted
        ? <button className='btn-primary' onClick={() => setSubmitted(true)}>Chấm điểm</button>
        : (
          <div>
            <h2>Bạn đúng {correctCount} / {questions.length} câu</h2>
            <button className='btn-primary' onClick={randomizeQuestions}>Làm lại</button> 
          </div>
        )
      }
    </div>
  );
}

export default QuizPage;