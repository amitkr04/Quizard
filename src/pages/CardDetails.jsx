import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizData from "../data/data.js";
import iplcard from "../assets/ipl.jpg";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizData.find((q) => q.id === parseInt(id));

  if (!quiz) return <div className="p-4 text-red-500">Quiz not found.</div>;
  return (
    <>
      <div className="p-6 bg-blue-950">
        <button
          onClick={() => navigate(-1)}
          className="hidden sm:block text-purple-600 text-xl font-bold  mb-4 cursor-pointer"
        >
          Back
        </button>
        <div className="bg-white p-6   rounded shadow-md max-w-md mx-auto text-center space-y-2">
          <img src={iplcard} alt={quiz.title} className="rounded mb-4" />
          <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
          <p className="font-semibold text-sm">
            Answer these simple questions correctly and earn coins
          </p>
          <p>
            <strong>Difficulty:</strong> {quiz.difficulty}
          </p>
          <p>
            <strong>Questions:</strong> {quiz.questions}
          </p>

          <div className="flex flex-col">
            <button
              className="mt-4 bg-purple-600 text-white px-16 py-1 border-2 border-white rounded-full cursor-pointer"
              onClick={() => navigate(`/play/${quiz.id}`)}
            >
              Play
            </button>
            <button className="mt-4 bg-red-300 text-white px-10 py-1 border-2 border-white rounded-full cursor-pointer">
              Play With Friends
            </button>
            <button className="mt-4 bg-purple-600 text-white px-16 py-1 border-2 border-white rounded-full cursor-pointer">
              Flashcards
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
