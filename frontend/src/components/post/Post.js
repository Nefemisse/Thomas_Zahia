import "./post.css";


export default function Post() {
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImg" src="assets/images/img9.jpg" alt=""/>
                    <span className="postUsername"> name</span>
                    <span className="postDate">5 jours</span>
                </div>
                <div className="postTopRight"></div>
            </div>
            <div className="postCenter">
                <span className="postText">description</span>
                <img className="postImg" src="assets/images/img5.jpg" alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src="assets/heart.png"  alt="" />
                    <span className="postLikeCounter"> people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText"> comments</span>
                </div>
            </div>
        </div>
    </div>
  );
}