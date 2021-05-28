import Reacts from "./Reacts"
import { useSelector } from "react-redux"
import Reply from "./Reply"

const Post = ({id}) => {
    const posts = useSelector(state => state.posts);

    const renderPicture = (data) => {
        var image = new Image()
        image.src = data
        return image
    }

    return (
        <div className="card mt-3 post post-shadows">
            <img src={posts[id].pictureUrl} className="card-img-top post-img" alt="..."/>
            <div className="card-body">
                <Reacts post={posts[id]} id={id}/>
                <h5 className="card-title">{posts[id].username}</h5>
                <p className="card-text">{posts[id].caption}</p>
                <div className="row row-cols-auto">
                {
                     (posts[id].tags.length > 0)?posts[id].tags.map((tag, i) => 
                        <div key={i} className="col">
                            <p className="card-text tag-color">{tag}</p>
                        </div>
                     
                    ):""
                }
                </div>
                {
                    posts[id].replies.map((reply,i) => 
                        <div key={i} className="row row-cols-auto">
                            <p className="col card-text username-reply">{reply.user}</p>
                            <p className="col card-text">{reply.reply}</p>
                        </div>
                    )
                }
                <Reply id={id}/>
                <p className="card-text">
                    <small className="text-muted">
                        {posts[id].datePosted}
                    </small>
                </p>
            </div>
        </div>
    )

}

export default Post