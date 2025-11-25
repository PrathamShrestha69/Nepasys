import React from "react";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router";

const NavigationBar = () => {
  return (
    <div className="shadow-2xl shadow-dark px-5 ">
      {/* Desktop view */}
      <nav className="hidden xl:flex xl:justify-between xl:items-center xl:h-16 xl:max-w-7xl xl:mx-auto">
        <div className="text-2xl font-extrabold">
          <Link t to="/">
            Nepasys
          </Link>
        </div>
        <div className="flex flex-row items-center gap-5 ">
          <Link
            to="/"
            className="mx-4 text-lg  hover:scale-110 transition-transform duration-200 font-bold"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="mx-4  flex flex-row items-center hover:scale-110 transition-transform duration-200"
          >
            <IoMdCart className="h-10 w-10" />
          </Link>
          <label className="toggle text-base-content">
            <input type="checkbox" value="dark" className="theme-controller" />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>
      </nav>
      {/* Mobile view */}
      <nav>
        <div className="flex justify-between items-center h-16 xl:hidden">
          <div className="text-2xl font-bold">
            <Link to="/">Nepasys</Link>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Link to="/cart" className="mx-4  flex flex-row items-center">
              <IoMdCart className="h-8 w-8" />
            </Link>
            <label className="toggle text-base-content">
              <input
                type="checkbox"
                value="dark"
                className="theme-controller"
              />
              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>
              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
