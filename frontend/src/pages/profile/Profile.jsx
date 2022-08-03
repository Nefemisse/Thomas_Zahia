import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className="profileCoverImg" src="assets/images/img9.jpg" alt=""/>
                        <img className="profileUserImg" src="assets/images/img9.jpg" alt=""/>
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">Maya Deo</h4>
                        <span className="profileInfoDesc">Hello my friends!</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed />
                </div>
            </div>
      </div>
    </>
  );
}