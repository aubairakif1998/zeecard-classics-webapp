// components/BottomNavBar.tsx
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const BottomNavbar = () => {
  const location = useLocation();
  const { id } = useParams(); // Use the useParams hook to get the id parameter

  return (
    <nav className="bottom-navbar">
      <Link
        to={`/${id}/home`}
        className={location.pathname === `/${id}/home` ? "active" : ""}
      >
        <div>
          <img src="/Home.png" alt="Home" />
        </div>
      </Link>
      <Link
        to={`/${id}/profile`}
        className={location.pathname === `/${id}/profile` ? "active" : ""}
      >
        <div>
          <img src="/Group.png" alt="Profile" />
        </div>
      </Link>
      <Link
        to={`/${id}/settings`}
        className={location.pathname === `/${id}/settings` ? "active" : ""}
      >
        <div>
          <img src="/Vector.png" alt="Settings" />
        </div>
      </Link>
    </nav>
  );
};

export default BottomNavbar;
