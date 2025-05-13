import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cardData from "../data/data.js";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaTwitterSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { useCoin } from "../context/CoinContext.jsx";
import { VscArrowLeft } from "react-icons/vsc";

const QuizResult = () => {
  const { setCoins } = useCoin();
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  if (!state) return <div>Invalid access.</div>;

  const { result, totalTime, quizId } = location.state;

  console.log("Received state:", state);

  const quiz = cardData.find((q) => q.id === Number(quizId));
  console.log("quizresult:", quiz);
  const quizTitle = quiz?.title || "Quiz Result";

  const total = result.length;
  const correct = result.filter((r) => r.correct).length;
  const incorrect = result.filter((r) => r.selected && !r.correct).length;
  const unattempt = result.filter((r) => r.selected === null).length;
  const accuracy = ((correct / total) * 100).toFixed(2);
  const coins = correct * 4;

  setCoins(coins);

  const timePerQues = (totalTime / total).toFixed(0);
  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${mins} m ${seconds} s`;
  };

  //copy of the page
  const [copied, setCopied] = useState(false);
  const link = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  //handle review

  const handleReview = () => {
    navigate("/review", {
      state: {
        result: result,
        totalTime: totalTime,
        quizId: quizId,
      },
    });
  };

  return (
    <>
      <div className="bg-[#0e1f2f] text-white p-6">
        <div className="max-w-3xl mx-auto">
       <div className="flex flex-wrap  justify-start items-center gap-2">

       <button
            onClick={() => navigate(-1)}
            className="text-yellow-400 text-2xl sm:text-3xl font-bold cursor-pointer mb-5"
          >
            <VscArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
            {quizTitle}
          </h1>
       </div>
          <div className="grid grid-cols-2 gap-4 bg-[#112d44] rounded-xl p-6 shadow-lg">
            <StatBox label="Coin Earned" value={coins} emoji="💰" />
            <StatBox label="Your Score" value={coins} emoji="🏆" />
            <StatBox label="Correct" value={correct} emoji="✅" />
            <StatBox label="Incorrect" value={incorrect} emoji="❌" />

            <StatBox label="Accuracy" value={`${accuracy} %`} emoji="🎯" />
            <StatBox
              label="Time Spent"
              value={formatTime(totalTime)}
              emoji="⏱️"
            />
            <StatBox label="Unattempted" value={unattempt} emoji="⚪" />
            <StatBox
              label="Time/Ques"
              value={`${timePerQues} sec`}
              emoji="⏳"
            />
            <StatBox label="Live Rank" value="4" emoji="🥉" />
          </div>
          <div className="grid grid-cols-2 gap-4  mt-8 bg-[#112d44] rounded-xl p-6 shadow-lg">
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="flex items-center justify-between bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold cursor-pointer border-1 border-white"
            >
              Share Score <CiShare2 />
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box text-black">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg mb-4">Share</h3>
                <div className="flex justify-center items-center space-x-4 text-2xl">
                  <FaFacebook className="text-blue-500" />
                  <FaWhatsappSquare className="text-green-500" />
                  <IoMailOpenOutline className="text-gray-500" />
                  <FaTwitterSquare className="text-blue-400" />
                  <FaTelegram className="text-blue-400" />
                </div>
                <div className="flex py-4 space-x-1">
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded text-sm"
                    value={link}
                    readOnly
                  />

                  {copied && (
                    <p className="text-green-600 text-sm mt-2 mb-2 text-left">
                      Copied!
                    </p>
                  )}

                  <button
                    onClick={handleCopy}
                    className="bg-red-200 hover:bg-red-300 text-black px-2 font-bold text-sm rounded-full cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </dialog>
            <button
              onClick={handleReview}
              className="flex items-center justify-between bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold cursor-pointer border-1 border-white"
            >
              Review Questions <IoIosArrowForward />
            </button>
            <button
              onClick={() => navigate("/leaderboard")}
              className="col-span-2 relative bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold cursor-pointer border-1 border-white"
            >
              <span className="block text-center">Leaderboard</span>
              <MdOutlineArrowCircleRight className="absolute right-4 top-1/2 -translate-y-1/2 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const StatBox = ({ label, value, emoji }) => (
  <div className="bg-[#183b55] rounded-lg p-4 flex justify-between items-center text-lg font-medium shadow-inner">
    <span>
      {emoji} {label}
    </span>
    <span className="text-yellow-300">{value}</span>
  </div>
);

export default QuizResult;
