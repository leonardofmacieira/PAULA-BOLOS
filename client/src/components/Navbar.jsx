import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer">
      <img
        src={logo}
        alt="Logo Paula Bolos"
        className="h-16 sm:h-17 w-auto cursor-pointer hover:scale-105 transition-transform duration-300 select-none"
        onClick={() => navigate("/")}
      />
      <button
        className="flex items-center gap-2 rounded-full text-sm bg-primary text-white px-10 py-2.5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        HOME
      </button>
    </div>
  );
};

export default Navbar;
