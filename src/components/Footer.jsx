import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Language & Social Icons */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          {/* Language */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <TbWorld className="text-lg" />
            English
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 text-3xl">
            <a href="https://facebook.com" target="_blank">
              <FaFacebookSquare />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaSquareInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank">
              <FaSquareXTwitter />
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-4 md:space-y-0 border-t border-white/20 pt-4">
          {/* Copyright */}
          <div className="text-sm font-semibold">
            Quizard &copy; 2025. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm font-semibold space-y-2 sm:space-y-0">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/privacy">Privacy & Cookies Policy</Link>
            <Link to="/terms">Terms and Conditions</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
