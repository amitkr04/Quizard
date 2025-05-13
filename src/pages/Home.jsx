import React from "react";

const Home = () => {
  return (
    <>
      <div className="bg-purple-600  flex items-center justify-center px-4 py-8  ">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Quiz */}
          <div className="bg-purple-600 text-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
              Create Quiz
            </h1>
            <p className="text-lg text-gray-100 mb-6">
              Create interactive quizzes in minutes with our online quiz maker
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md cursor-pointer">
              Create Quiz
            </button>
          </div>

          {/* Quizard AI */}
          <div className="bg-purple-600 text-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
              Quizard AI
            </h1>
            <p className="text-lg text-gray-100 mb-6">
              Create quizzes instantly with AI — just enter a topic and get
              engaging questions in seconds!
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md cursor-pointer">
              Generate Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Join game */}
      <div className="relative bg-white pt-20 pb-24">
        {/* Join Game Box */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="bg-purple-800  p-6 md:p-8  shadow-lg flex flex-col md:flex-row items-center gap-4 justify-center rounded-xl">
            <input
              type="text"
              placeholder="Enter Game Code"
              className="bg-white px-4 py-2 rounded-md border-none outline-none font-bold text-black w-full md:w-64"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-1 rounded-md">
              Join Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
