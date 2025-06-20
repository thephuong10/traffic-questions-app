import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function QuizHardPage({ tests }) {
  const { testIndex } = useParams();
  const [questions, setQuestions] = useState(tests[testIndex]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(true); 
  const [feedback, setFeedback] = useState(null); 
  const [hasFailed, setHasFailed] = useState(false); 
  const [isCompleted, setIsCompleted] = useState(false); 
  const [isSubmitted,setIsSubmitted] = useState(false);

 
  const randomizeQuestions = () => {
    //const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setQuestions([...questions]);
    setAnswers(Array(shuffledQuestions.length).fill(null));
    setCurrentQuestion(0);
    setIsNextDisabled(true); 
    setFeedback(null); 
    setHasFailed(false); 
    setIsCompleted(false); 
    setIsSubmitted(false)
  };

  
  const handleSelect = (qIdx, aIdx) => {
    const copy = [...answers];
    copy[qIdx] = aIdx;
    setAnswers(copy);
    setIsNextDisabled(false); 
  };

  
  const handleNext = () => {
    if(!isNextDisabled) {
      setIsSubmitted(true);
      setIsNextDisabled(true);
      const isCorrect = answers[currentQuestion] === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setFeedback('correct');
        setTimeout(() => {
          setIsSubmitted(false);
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setFeedback(null); 
          } else {
            setIsCompleted(true); 
          }
        }, 500); 
      } else {
        setFeedback('incorrect');
        // setIsNextDisabled(true); 
        setHasFailed(true); 
      }
    }
  };

  
  const handleRetry = () => {
    randomizeQuestions(); 
  };

  
  const correctCount = answers.filter((a, idx) => a === questions[idx].correctAnswer).length;

  return (
    <div className="quiz-container">
      <h1>Đề số {parseInt(testIndex) + 1}</h1>
      <Link to="/">← Quay lại danh sách đề</Link>
      <div className="quiz-question" style={{ backgroundColor: feedback === 'correct' ? '#d4edda' : feedback === 'incorrect' ? '#f8d7da' : '' }}>
        <p><b>Câu {currentQuestion + 1}: </b>{questions[currentQuestion].questionTitle}</p>
        {questions[currentQuestion].image && <img src={questions[currentQuestion].image} alt="" style={{ maxWidth: '100%', height: 'auto', display: "block", marginBottom: 8 }} />}
        <div>
          {questions[currentQuestion].answer.map((a, aIdx) => {
            const isCorrectAnswer = aIdx === questions[currentQuestion].correctAnswer;
            const isSelected = answers[currentQuestion] === aIdx;

            const answerStyle = {
                color:'',
                backgroundColor:''
            };

            if(isSubmitted) {
              if(isCorrectAnswer){
                answerStyle['backgroundColor'] = 'green';
                answerStyle['color'] = 'white';
              }
              if(!isCorrectAnswer && isSelected){
                answerStyle['backgroundColor'] = 'red';
                answerStyle['color'] = 'white';
              }
            } 


            

            return (
              <label key={aIdx} style={{ display: "block", margin: 4 }}>
                <input
                  type="radio"
                  name={`q${currentQuestion}`}
                  value={aIdx}
                  disabled={feedback !== null} 
                  checked={isSelected}
                  onChange={() => handleSelect(currentQuestion, aIdx)}
                />
                <span style={answerStyle}>
                  {a.content}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        
        {isCompleted || hasFailed ? (
          <button onClick={handleRetry}>Làm lại</button> 
        ) : (
          <button 
            onClick={handleNext} 
            //disabled={isNextDisabled} 
            style={isNextDisabled ? ({
              backgroundColor: 'gray',
              cursor: 'not-allowed'
            }) : {}}>
            Tiếp theo
          </button> 
        )}
      </div>

      
      {isCompleted && feedback === 'correct' && (
        <div>
          <h2>Chúc mừng! Bạn đã trả lời đúng tất cả {correctCount} / {questions.length} câu!</h2>
          <button onClick={handleRetry}>Làm lại</button>
        </div>
      )}

      
      {feedback === 'incorrect' && !isCompleted && (
        <div>
          <h2>Oops! Sai mất rồi, làm lại từ đầu thôi.</h2>
        </div>
      )}
    </div>
  );
}

export default QuizHardPage;
