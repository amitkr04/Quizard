import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizData from "../data/question.js";

const QuizPlay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizData.find((q) => q.id === parseInt(id));
  if (!quiz) {
    return <div className="text-red-500 p-4">Quiz not found</div>;
  }
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState([]);
  const [questionTimer, setQuestionTimer] = useState(60); // 1 min
  const [autoNext, setAutoNext] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [showTimeUpPopup, setShowTimeUpPopup] = useState(false);

  const question = quiz.questions[currentQIndex];

  // Pre-quiz countdown
  useEffect(() => {
    if (showCountdown) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setShowCountdown(false);
            setStartTime(Date.now());
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCountdown]);

  // 1 min timer per question
  useEffect(() => {
    if (!showCountdown && !autoNext && selected === null) {
      const timer = setInterval(() => {
        setQuestionTimer((prev) => {
          if (prev <= 0) {
            setShowTimeUpPopup(true);
            clearInterval(timer);
            setTimeout(() => {
              setShowTimeUpPopup(false);
              handleAnswer(null);
            }, 3000);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [questionTimer, selected, showCountdown, autoNext]);

  // Go to next question after 3 sec or if "Next" clicked
  useEffect(() => {
    if (selected !== null && !autoNext) {
      const timer = setTimeout(() => {
        handleNext();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  const handleAnswer = (option) => {
    const isCorrect = option === question.answer;
    setSelected(option);
    setResult((prev) => [
      ...prev,
      {
        ...question,
        selected: option,
        correct: isCorrect,
        time: 60 - questionTimer,
      },
    ]);
  };

  const handleNext = () => {
    setSelected(null);
    setQuestionTimer(60);
    setAutoNext(false);
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      const totalTime = (Date.now() - startTime) / 1000;
      navigate("/result", { state: { result, totalTime, quizId: id } });
    }
  };

  if (showCountdown) {
    return (
      <div className="flex items-center justify-center h-screen text-6xl font-bold">
        {countdown === 0 ? "Go!" : countdown}
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#0e1f2f] ">
        {showCountdown ? (
          <div className="flex items-center justify-center h-screen  text-6xl font-bold">
            {countdown === 0 ? "Go!" : countdown}
          </div>
        ) : (
          <div className="flex flex-col  h-[65vh]">
            {showTimeUpPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white text-black p-8 rounded-lg shadow-lg text-center">
                  <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
                  <p className="text-lg">Moving to next question...</p>
                </div>
              </div>
            )}

            <div className="flex-1 p-6 max-w-2xl mx-auto w-full">
              <h2 className="text-xl font-bold mb-2 text-white">
                Q{currentQIndex + 1}: {question.question}
              </h2>
              <p className="mb-2 text-sm font-bold text-white">
                Time left: {questionTimer}s
              </p>
              <div className="grid gap-3">
                {question.options.map((opt, idx) => {
                  let color = "bg-white";
                  if (selected !== null) {
                    if (opt === question.answer) color = "bg-green-400";
                    else if (opt === selected && opt !== question.answer)
                      color = "bg-red-400";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => selected === null && handleAnswer(opt)}
                      className={`border px-4 py-2 rounded cursor-pointer ${color}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <button
                  onClick={() => {
                    setAutoNext(true);
                    handleNext();
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPlay;
