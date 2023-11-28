// components/BottomNavBar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bottom-navbar">
      <Link
        to="/home"
        className={location.pathname === "/home" ? "active" : ""}
      >
        <div>
          <img src="/Home.png" alt="Home" />
        </div>
      </Link>
      <Link
        to="/profile"
        className={location.pathname === "/profile" ? "active" : ""}
      >
        <div>
          <img src="/Group.png" alt="Profile" />
        </div>
      </Link>
      <Link
        to="/settings"
        className={location.pathname === "/settings" ? "active" : ""}
      >
        <div>
          <img src="/Vector.png" alt="Settings" />
        </div>
      </Link>
    </nav>
  );
};

export default BottomNavbar;
