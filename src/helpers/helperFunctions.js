export function generateTests(questions, numTests = 10, numPerTest = 25) {
  
  if (questions.length < numTests * numPerTest) {
    throw new Error('Không đủ câu hỏi để tạo các đề thi!');
  }

 
  const shuffled = [...questions].sort(() => Math.random() - 0.5);

  const tests = [];
  
  for (let i = 0; i < numTests; i++) {
    tests.push(shuffled.slice(i * numPerTest, (i + 1) * numPerTest));
  }

  return tests;
}