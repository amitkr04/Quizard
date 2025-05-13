import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iplcard from "../assets/ipl.jpg";
import quizData from "../data/data.js";

const Card = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(5);

  const showMore = () => setVisibleCards((prev) => prev + 3);

  return (
    <>
      <div className="px-6 py-4">
        <h1 className="text-xl font-bold mb-4">Trending Quiz</h1>
        <div className="flex overflow-x-auto gap-4">
          {quizData.slice(0, visibleCards).map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="card bg-base-100 w-72 shadow cursor-pointer"
            >
              <figure className="relative">
                <img src={iplcard} alt="Quiz" />
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black bg-opacity-60 px-2 py-1 rounded">
                  {quiz.questions} Qs
                </div>
                <div className="absolute bottom-2 right-2 text-white text-sm font-semibold bg-black bg-opacity-60 px-2 py-1 rounded">
                  {quiz.plays} Plays
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{quiz.title}</h2>
              </div>
            </div>
          ))}
        </div>

        {visibleCards < quizData.length && (
          <div className="flex justify-end ">
            <button
              onClick={showMore}
              className="mt-4  bg-purple-300 text-purple-800 font-bold px-2 py-1 rounded cursor-pointer"
            >
              See All
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
