import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentJobId");
    setShowMenu(false);

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#165668] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              H
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Hire<span className="text-[#165668]">Lens</span>
            </h1>
          </div>

          {/* Nav Links */}

          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-slate-600 hover:text-[#165668] font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              to="/features"
              className="text-slate-600 hover:text-[#165668] font-medium transition-colors"
            >
              Resume Analyzer
            </Link>

            <Link
              to="/dashboard"
              className="text-slate-600 hover:text-[#165668] font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">
            {!user ? (
              <Link
                to="/login"
                className="bg-[#165668] hover:bg-[#124654] text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Login / Sign-up
              </Link>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-11 h-11 rounded-full border border-slate-300 hover:border-[#165668] hover:bg-[#E6F4F7] flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-700"
                  >
                    <path d="M20 21a8 8 0 1 0-16 0" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50">
                    {/* User Info */}

                    <div className="px-5 py-4 bg-[#F7FCFD]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#165668] text-white flex items-center justify-center font-bold text-lg">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {user.name}
                          </h3>

                          <p className="text-sm text-slate-500">Recruiter</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-red-50 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-red-500"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>

                        <span className="font-semibold text-red-600">
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
