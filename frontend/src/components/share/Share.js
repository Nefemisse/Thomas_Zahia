import "./share.css";


export default function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src="/assets/images/img7.jpg" alt="" />
                <input placeholder="Write some thing here" className="shareInput"/>
            </div>
            <hr className="shareHr"/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <span className="shareOptionText">Photo or Video</span>
                    </div>
                    <div className="shareOption">   
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton">Share</button>
            </div>
        </div>
    </div>
  );
}