
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import topics from './data/questions.json';
import questions from './data/topics.json';
import { generateTests } from './helpers/helperFunctions';
import MainPage from './pages/MainPage';
import QuizPage from './pages/QuizPage';
import QuizHardPage from './pages/QuizHardPage';




// const tests = generateTests(questions, 10, 25);

//  console.log(JSON.stringify(generateTests(topics, 10, 25)));


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage tests={questions} />} />
        <Route path="/test/:testIndex" element={<QuizPage tests={questions} />} />
        <Route path="/test-hard/:testIndex" element={<QuizHardPage tests={questions}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
