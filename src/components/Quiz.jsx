import { useState } from 'react';

export default function Quiz({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (optionIndex) => {
    if (showResult) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: selectedAnswer,
        correct: currentQuestion.correct,
        isCorrect,
      },
    ]);

    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
      onComplete(score + (selectedAnswer === currentQuestion.correct ? 0 : 0), questions.length);
      // Note: score already updated in handleSubmit
    }
  };

  if (finished) {
    const finalScore = answers.filter((a) => a.isCorrect).length;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="quiz-results">
        <div className="quiz-results-header">
          <h3>Quiz Complete!</h3>
          <div className={`quiz-score ${percentage >= 70 ? 'passing' : 'needs-work'}`}>
            {finalScore}/{questions.length}
          </div>
          <p className="quiz-score-label">
            {percentage >= 70 ? 'Great job!' : 'Review the material and try again.'}
          </p>
        </div>
        <div className="quiz-review">
          {answers.map((answer, i) => (
            <div
              key={i}
              className={`quiz-review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="quiz-review-indicator">
                {answer.isCorrect ? '\u2713' : '\u2717'}
              </div>
              <div className="quiz-review-content">
                <p className="quiz-review-question">{answer.question}</p>
                <p className="quiz-review-answer">
                  Your answer: {questions[i].options[answer.selected]}
                </p>
                {!answer.isCorrect && (
                  <p className="quiz-review-correct">
                    Correct: {questions[i].options[answer.correct]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <span className="quiz-badge">Quiz</span>
        <span className="quiz-counter">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>
      <div className="quiz-progress">
        <div
          className="quiz-progress-fill"
          style={{
            width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>
      <h3 className="quiz-question">{currentQuestion.question}</h3>
      <div className="quiz-options">
        {currentQuestion.options.map((option, i) => {
          let className = 'quiz-option';
          if (showResult) {
            if (i === currentQuestion.correct) className += ' correct';
            else if (i === selectedAnswer) className += ' incorrect';
          } else if (i === selectedAnswer) {
            className += ' selected';
          }
          return (
            <button
              key={i}
              className={className}
              onClick={() => handleSelect(i)}
              disabled={showResult}
            >
              <span className="quiz-option-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="quiz-option-text">{option}</span>
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className="quiz-explanation">
          <p>{currentQuestion.explanation}</p>
        </div>
      )}
      <div className="quiz-actions">
        {!showResult ? (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Check Answer
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
