
import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";

  const Register = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const FirstnameError = document.querySelector(".Firstname.error");
    const LastnameError = document.querySelector(".Lastname.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/register`,
        data: {
          Firstname,
          Lastname,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            FirstnameError.innerHTML = res.data.errors.Firstname;
            LastnameError.innerHTML = res.data.errors.Lastname;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Login/>
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="Firstname">Firstname</label>
          <br />
          <input className="input"
            type="text"
            name="Firstname"
            id="Firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={Firstname}
          />
          <div className="Firstname error"></div>
          <br />
          <label htmlFor="Lastname">Lastname</label>
          <br />
          <input className="input"
            type="text"
            name="Lastname"
            id="Lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={Lastname}
          />
          <div className="Lastname error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input className="input"
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input className="input"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br/>
          <input className="input"
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input  className="btn" type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default Register;