import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow py-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary ml-2" to="/">
          Track My Expense
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-left">
            {loginUser && (
              <p className="mb-2 mb-lg-0 me-lg-3 fw-semibold text-center text-lg-start">
                {loginUser.name}
              </p>
            )}
            <button className="btn btn-danger btn-sm" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
