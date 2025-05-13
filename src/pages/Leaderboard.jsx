import React from "react";
import { useEffect, useState } from "react";
import leaderboardData from "../data/leaderboardData.js";
import crown from "../assets/crown.jpg";
import userawatar from "../assets/awatar2.png";
import { useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const navigate = useNavigate();

  const currentUser = "AMIT KUMAR";

  useEffect(() => {
    const sorted = [...leaderboardData].sort((a, b) => b.score - a.score);
    setUsers(sorted);
    const rank = sorted.findIndex((u) => u.name === currentUser) + 1;
    setMyRank({ ...sorted[rank - 1], rank });
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + 5);

  const topThree = users.slice(0, 3);
  const others = users.slice(3, visibleCount);
  return (
    <>
      <div className="bg-[#0f2c3f] min-h-screen text-white p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-yellow-400 text-2xl sm:text-3xl font-bold cursor-pointer"
        >
          <VscArrowLeft />
        </button>
        <h1 className="text-3xl text-center font-bold text-yellow-400 mb-6">
          Leaderboard
        </h1>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 mb-8">
          {topThree.map((user, index) => (
            <div
              key={index}
              className={`bg-[#183b55] p-4 rounded-xl flex flex-col items-center shadow-md  ${
                index === 1 ? "h-32" : index === 0 ? "h-40" : "h-28"
              } w-32 relative`}
            >
              {index === 0 && (
                <div className="absolute -top-5">
                  <img src={crown} alt="crown" className="w-10 h-10" />
                </div>
              )}
              <img
                src={userawatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-white"
              />
              <span className="mt-2 font-semibold">{user.name}</span>
              <span className="text-yellow-300 font-bold">{user.score}</span>
              <div
                className={`absolute top-2 right-2 text-white bg-blue-500 px-2 rounded-full text-sm`}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {myRank && (
          <div className="bg-[#125a74] rounded-md p-3 flex justify-between items-center mb-6 text-white font-medium shadow-md">
            <span className="text-lg font-semibold">{myRank.rank}</span>
            <div className="flex items-center gap-3">
              <img
                src={userawatar}
                alt="You"
                className="w-8 h-8 rounded-full"
              />
              <span>{myRank.name}</span>
            </div>
            <span className="flex items-center gap-1 text-yellow-300">
              💰 {myRank.score}
            </span>
          </div>
        )}

        {/* Other Users */}
        <div className="space-y-4">
          {others.map((user, i) => (
            <div
              key={i}
              className="bg-[#183b55] rounded-md p-3 flex justify-between items-center"
            >
              <span className="text-lg font-semibold">{i + 4}</span>
              <div className="flex items-center gap-3">
                <img
                  src={userawatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
              </div>
              <span className="text-yellow-300">💰 {user.score}</span>
            </div>
          ))}
        </div>

        {visibleCount < users.length && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-xl text-white font-semibold cursor-pointer"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Leaderboard;
