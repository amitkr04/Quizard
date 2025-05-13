import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import coin from "../assets/coin.png";
import { useCoin } from "../context/CoinContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();
  const { coins } = useCoin();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <header className="bg-purple-600 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-28 flex justify-between items-center h-16">
          {/* Hamburger for small screens only */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-white focus:outline-none ml-2"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link to="/" className="text-3xl font-bold text-white">
              Quizard
            </Link>
          </div>

          <Link className="md:hidden flex justify-center items-center gap-x-2 border-2 border-white rounded-full p-1 px-3 text-orange-200 text-tiny font-bold">
            <img src={coin} alt="coin" className="w-5 h-5 object-cover" />
            <span>{coins}</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="flex justify-center items-center hidden md:flex space-x-6">
            <Link to="/" className="text-white text-tiny font-bold">
              Discover
            </Link>
            <Link to="/Ai" className="text-white text-tiny font-bold ">
              AI
            </Link>
            <Link to="/join" className="text-white text-tiny font-bold">
              Join
            </Link>
            <Link to="/live" className="text-white text-tiny font-bold">
              Live Quiz
            </Link>
            <Link to="/creator" className="text-white text-tiny font-bold">
              Creator
            </Link>
            <Link to="/category" className="text-white text-tiny font-bold">
              Category
            </Link>
            <Link to="/profile" className="text-white text-tiny font-bold">
              AMIT KUMAR
            </Link>
            <Link className="flex justify-center items-center gap-x-2 border-2 border-white rounded-full p-1 pl-2 pr-2 text-orange-200 text-tiny font-bold ">
              <img src={coin} alt="coin" className="w-5 h-5 object-cover" />
              <span>{coins}</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Overlay on small screen */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden"></div>
      )}

      {/* Sidebar for small screen only */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 h-full bg-purple-600 shadow-md z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-4 pl-10 space-y-4">
          <Link to="/" className="text-white text-4xl font-bold">
            Quizard
          </Link>
          <Link to="/" className="text-white text-2xl font-bold">
            Discover
          </Link>
          <Link to="/Ai" className="text-white text-2xl font-bold ">
            AI
          </Link>
          <Link to="/join" className="text-white text-2xl font-bold">
            Join
          </Link>
          <Link to="/live" className="text-white text-2xl font-bold">
            Live Quiz
          </Link>
          <Link to="/creator" className="text-white text-2xl font-bold">
            Creator
          </Link>
          <Link to="/category" className="text-white text-2xl font-bold">
            Category
          </Link>
          <Link to="/profile" className="text-white text-2xl font-bold">
            AMIT KUMAR
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
