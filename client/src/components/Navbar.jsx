import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import show from "/images/icons/menu.svg";

import show_show from "/images/icons/menu.svg";
import hide from "/images/icons/x.svg";

import useAuth from "../hooks/useAuth";
import LogOutBtn from "./LogOutBtn";
import NotificationsNew from "../features/notifications/Notifications";
import defaultImg from "/images/user.svg";
import { ChatState } from "../context/ChatProvider";
const Navbar = ({ active, setActive, hoverShow }) => {
  // const { pathname } = useLocation();

  const { userName, userRole, userId, userImage } = useAuth();
  const { notification, setNotification } = ChatState();
  const [hidden, setHidden] = useState(false);
  const toggleNavbar = () => {
    setHidden(!hidden);
  };
  const closeToggle = () => {
    setHidden(!hidden);
    const menuToggle = document.getElementById("navbarSupportedContent");
    menuToggle.classList.remove("show");
  };

  return (
    <>
      <header className="main_header px-lg-2 px-0">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <div>
              <Link
                //  className="navbar-brand" to="/"

                className={`transition navbar-brand ${
                  hoverShow ? "ShowBar" : ""
                } ${active ? "activeBar" : ""}`}
              >
                <img
                  src="/images/logo.png"
                  alt="logo-img"
                  style={{ height: "40px" }}
                />
              </Link>
              <button
                type="button"
                className="bg-transparent border-0 mx-lg-5 mx-0"
                onClick={() => setActive(!active)}
              >
                <img
                  src="/images/icons/back-arrow.svg"
                  alt="arrow"
                  style={active ? { transform: "rotateY(180deg)" } : {}}
                />
              </button>
            </div>
            {/* 
            <div className="toggle-btn d-flex align-items-center justify-content-center">
                <button
                  type="button"
                  onClick={() => setActive(!active)}
                  className="h-100 border-0 bg-transparent transition shadow-none"
                >
                  <svg
                    className={hoverShow ? "svgRotate" : ""}
                    style={active ? { transform: "rotateY(180deg)" } : {}}
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    width="20px"
                    fill="var(--dark-blue)"
                    viewBox="0 0 512 512"
                  >
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                  </svg>
                </button>
              </div> */}

            <button
              onClick={toggleNavbar}
              className="navbar-toggler border-0 shadow-none p-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {/* <span className="navbar-toggler-icon"></span> */}
              <span className="navbar-toggler-icon">
                <img src={hidden ? hide : show_show} alt="" />
              </span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="page__heading">
                <h6 className="mb-0">Dashboard</h6>
              </div>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3 gap-0 align-items-lg-center align-items-start">
                <li className="nav-item" onClick={closeToggle}>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={`/user-settings`}
                  >
                    <img src="/images/icons/setting.svg" alt="setting-svg" />
                  </Link>
                </li>
                <li className="nav-item">
                  <NotificationsNew />
                </li>
                <li
                  className="nav-item d-flex gap-3 align-items-center py-2 py-lg-0"
                  onClick={closeToggle}
                >
                  <div className="user_profile">
                    <span className="d-flex">
                      <img
                        src={userImage !== "" ? userImage : "/images/user.svg"}
                        alt="profile-img"
                        id="fileInput"
                      />
                    </span>
                  </div>
                  <div className="profile_info">
                    <p className="mb-0" style={{ textTransform: "capitalize" }}>
                      {userName}
                    </p>
                    <span style={{ textTransform: "capitalize" }}>
                      {userRole}
                    </span>
                  </div>
                </li>

                <li className="nav-item">
                  <LogOutBtn />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
