import {useDispatch, useSelector} from "react-redux";
import Post from "./Post";
import { ADD_POST_PAGE, VIEW_POST } from "../redux/actionConstants";
import AddPost from "./AddPost";
import { LOGIN_STATE } from "../redux/stateConstants";
import { logout, addPostPage, completeOnboarding } from "../redux/actions";
import ProfileBubble from "./ProfileBubble";

const Profile = (props) => {
    const posts = useSelector(state => state.posts);
    const viewState = useSelector(state => state.viewState);

    const loginState = useSelector(state => state.loginState);
    const userView = useSelector(state => state.userView);
    const isNewUser = useSelector(state => state.isNewUser);

    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const picture = useSelector(state => state.user.profilePicture);

    return(
        <>
        <div className="justify-content-center">
        <ProfileBubble username={userView.substring(0, 3)} big={true}/>
        </div>
        <div className="add-post-header">
            {
                    (loginState === LOGIN_STATE.LOGGED_IN && viewState === VIEW_POST && (isNewUser !== undefined && !isNewUser)) ? 
                    <>
                        <button className="btn add-button" onClick={() => dispatch(addPostPage())}>
                            +
                        </button>
                    </>:""
                }
            </div>
        <div className="row row-cols-3 justify-content-center">
            {props.posts.map((element, index)=>{
                
                return (
                    (posts[element[1]].username === userView) ?
                    <div className="cols justify-content-center">
                        <Post key={index} id={element[1]} />
                    </div>:""
                )
            })}
            </div>
            </>
    )
}

export default Profile