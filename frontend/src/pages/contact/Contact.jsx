import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./style.css";
const Log = () => {
  const [RegisterModal, setRegisterModal] = useState(false);
  const [LoginModal, setLoginModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === "register") {
        setLoginModal(false);
        setRegisterModal(true);
    } else if (e.target.id === "login") {
        setRegisterModal(false);
        setLoginModal(true);
    }
  };

  return (
    <div className="connection-form">
        <img className="groupo"  src="assets/Groupomania Logos/logowhite.png" alt =""/>
        <div className="form-container">
                <ul>
                    <li onClick={handleModals} id="register" className={RegisterModal ? "active-btn" : null}>
                        S'inscrire
                    </li>
                    <li onClick={handleModals} id="login" className={LoginModal ? "active-btn" : null}>
                        Se connecter
                    </li>
                </ul>
                {RegisterModal && <Register />}
                {LoginModal && <Login />}
        </div>
    </div>
  );
};

export default Log;