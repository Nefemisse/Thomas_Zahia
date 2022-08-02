import "./post.css";


export default function Post() {
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImg" src="assets/images/img9.jpg" alt=""/>
                    <span className="postUsername">Maya</span>
                    <span className="postDate">5 jours</span>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">description</span>
                <img className="postImg" src="assets/images/img1.jpg" alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src="assets/heart.png"  alt="" />
                    <span className="postLikeCounter"> 3 people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText"> 9comments</span>
                </div>
            </div>
        </div>
    </div>
    
  );
}