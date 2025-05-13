import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cardData from "../data/question.js";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { VscArrowLeft } from "react-icons/vsc";

const Review = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  if (!state)
    return <div className="text-center p-6 text-red">Invalid access</div>;

  const { result, totalTime, quizId } = location.state;

  console.log("Received state:", state);

  const quiz = cardData.find((q) => q.id === Number(quizId));
  console.log("quiz:", quiz);
  const questions = quiz?.questions || [];

  const timePerQuestion = (totalTime / questions.length).toFixed(0);

  return (
    <div className="bg-[#0e1f2f] min-h-screen text-white p-6 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap  justify-start items-center gap-2 mb-4">
          {" "}
          <button
            onClick={() => navigate(-1)}
            className="text-yellow-400 text-2xl sm:text-3xl font-bold cursor-pointer"
          >
            <VscArrowLeft />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400">
            Review Questions - {quiz?.title}
          </h1>
        </div>

        {questions.map((q, index) => {
          const userResponse = result[index];
          const isCorrect = userResponse.correct;
          const selectedOption = userResponse.selected;

          return (
            <div
              key={index}
              className="bg-[#112d44] rounded-lg p-4 sm:p-6 mb-6 shadow-md relative"
            >
              {/* Top-right coins and time */}
              <div className="absolute top-4 right-4 text-right space-x-2 lg:mt-2">
                <p className="text-xs sm:text-sm font-bold border border-white rounded px-2 py-1 inline-block">
                  ⏱️ {timePerQuestion}s
                </p>
                <p className="text-xs sm:text-sm font-bold text-yellow-400 border border-white rounded px-2 py-1 inline-block">
                  💰 {isCorrect ? 4 : 0}
                </p>
              </div>

              {/* Question header */}
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2">
                <span className="text-xl font-bold text-yellow-300">
                  {index + 1}.
                </span>
                <h2 className="text-base sm:text-lg font-semibold flex-1">
                  {q.question}
                </h2>
                <div className="flex items-center gap-2 lg:mr-26 lg:mb-1">
                  {isCorrect ? (
                    <FaCheckCircle className="text-green-400 text-xl" />
                  ) : (
                    <FaTimesCircle className="text-red-400 text-xl" />
                  )}
                  <p className="text-xs sm:text-sm font-bold text-white border border-white rounded px-2 py-1">
                    Single Select Question
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {q.options.map((opt, i) => {
                  let optionColor = "bg-[#183b55]";

                  if (opt === selectedOption && opt === q.answer) {
                    optionColor = "bg-green-600";
                  } else if (opt === selectedOption && opt !== q.answer) {
                    optionColor = "bg-red-600";
                  } else if (opt === q.answer) {
                    optionColor = "bg-green-600";
                  }

                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-lg shadow-md font-medium ${optionColor}`}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
