import React, { useEffect, useState } from "react";
import "./styles.css";
import { Switch } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import userSvg from "../../assets/user.svg";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  function logout() {
    auth.signOut();
    navigate("/");
  }

  // only redirect to dashboard when a user logs in
  // we no longer push unauthenticated visitors back to `/`
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="navbar">
      <p className="navbar-heading">Mercurio</p>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Switch
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          checked={darkMode}
          onChange={() => setDarkMode((prev) => !prev)}
        />
        <p className="navbar-link">
          <Link to="/">Home</Link>
        </p>
        {user && (
          <p className="navbar-link" onClick={logout}>
            <span style={{ marginRight: "0.5rem" }}>
              <img
                src={user.photoURL ? user.photoURL : userSvg}
                width={user.photoURL ? "32" : "24"}
                style={{ borderRadius: "50%" }}
              />
            </span>
            Logout
          </p>
        )}
      </div>
    </div>
  );
}

export default Header;
