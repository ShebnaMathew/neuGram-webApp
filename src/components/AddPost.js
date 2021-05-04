import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { viewPost, addPost, getPosts } from "../redux/actions";

const AddPost = () => {
    const [postCaption, setPostCaption] = useState("");
    const [postPictureURL, setPictureURL] = useState("");
    const [postTags, setPostTags] = useState({});
    const [successMsg, setSuccessMsg] = useState(false);

    const username = useSelector(state => state.user.username);

    const updateTags = tagsList => {
        // separate tags by whitespace
        setPostTags(tagsList.split(/\s+/));
    }

    const dispatch = useDispatch();
    return (
        <div className="card add-post">
            <div className="card-body">
                {
                    successMsg && 
                    <div className="alert alert-success">You've successfully added your post!</div>
                }
                <b>
                    <label htmlFor="post-title">Post Caption:</label>
                </b>
                <div className="input-group mb-3">
                    <textarea
                        value={postCaption}
                        type="textarea" 
                        lines="5"
                        placeholder="Your post caption" 
                        className="form-control" 
                        aria-label="Post Caption" 
                        onChange={
                            (e) => {
                            setPostCaption(e.target.value)
                            }
                        }
                        required>
                    </textarea>
                </div>
                <br></br>
                <div className="mb-3">
                    <b>
                        <label htmlFor="post-msg">Post Picture:</label>
                    </b>
                    <input
                        value={postPictureURL}
                        className="form-control" 
                        placeholder="Please copy the URL of the picture you would like to see!"
                        id="postTextArea" 
                        aria-label="Picture URL" 
                        rows="3"
                        onChange={(e) => {
                            setPictureURL(e.target.value)
                        }
                    }>
                    </input>
                </div>
                <br></br>
                <div className= "mb-3">
                    <b>
                        <label htmlFor="tag-msg">Tags:</label>
                    </b>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Tags (Every tag starts with a # and multiple tags can be separated by whitespace)" 
                        aria-label="Tags" 
                        aria-describedby="basic-addon1" 
                        onChange={e => updateTags(e.target.value)}
                    />
                </div>
                <br></br>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button 
                        className="btn custom-btn-style" 
                        aria-label = "buttonSubmit"
                        type="button" 
                        id="buttonSubmit"
                        onClick={() => {
                            dispatch(addPost(postCaption, postPictureURL, postTags, username));
                            dispatch(getPosts());
                            setPostCaption("");
                            setPictureURL("");
                            setSuccessMsg(true);
                            setTimeout(() => {
                                setSuccessMsg(false);
                                dispatch(viewPost());
                            }, 3000)
                        }
                    }>Post</button>
                </div>
                <br></br>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button 
                        className="btn pop-button" 
                        aria-label = "buttonSubmit"
                        type="button" 
                        id="buttonSubmit"
                        onClick={() => {
                            dispatch(viewPost());
                            setPostCaption("");
                            setPictureURL("");
                        }
                    }>Cancel Post</button>
                </div>
            </div>
        </div>
    )
}
export default AddPost;