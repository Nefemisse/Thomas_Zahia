import "./topbar.css";

export default function Topbar() {
  return (
      <div className="topbarContainer">
          <div className="topbarLeft">
              <span className="logo">
                <img src="/assets/Groupomania Logos/logowhite.png" alt="" className="topbarImg"/>
                </span>
          </div>
          <div className="topbarRight">
              <div className="topbarLinks">
                  <span className="topbarLink">Home</span>
                  <span className="topbarLink">Profile</span>
                  <span className="topbarLink">Déconnexion</span>
              </div>
          </div>
      </div>
  );
}