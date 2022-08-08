import "./topbar.css";
import { NavLink } from "react-router-dom";

export default function Topbar() {
  return (
      <div className="topbarContainer">
          <div className="topbarLeft">
              <span className="logo">
                <img src="/assets/Groupomania Logos/logowhite.png" alt="" className="topbarImg"/>
                </span>
          </div>
          <div className="topbarRight">
              <NavLink className="topbarLink" to="/">Home</NavLink>
              <NavLink className="topbarLink" to="/Profile">Profil</NavLink>
              <NavLink className="topbarLink" to="/Contact">Contact</NavLink>
              <NavLink className="topbarLink" to="/Contact">Déconnexion</NavLink> 
          </div>
      </div>
  );
}