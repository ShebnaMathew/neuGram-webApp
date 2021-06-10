import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import Settings from "./Settings";
import { ADD_POST_PAGE, VIEW_POST } from "../redux/actionConstants";
import AddPost from "./AddPost";
import { LOGIN_STATE } from "../redux/stateConstants";
import { logout, addPostPage, completeOnboarding } from "../redux/actions";
import Profile from "./Profile";

const Posts = () => {
    const posts = useSelector(state => state.posts);
    const viewState = useSelector(state => state.viewState);
    const loginState = useSelector(state => state.loginState);
    const profileView = useSelector(state => state.profileView);
    const settingsView = useSelector(state => state.settingsView);
    const isNewUser = useSelector(state => state.isNewUser);
    const userId = useSelector(state => state.user.userId);
    const username = useSelector(state => state.user.username);
    const dispatch = useDispatch();
    const ids = Object.keys(posts);
    
    // sort the post ids by time
    const rearrangedIds = ids.map(id => {
        const date = posts[id].datePosted;
        return [date, id]
    }).sort((elem1, elem2) => {
        return elem1[0] > elem2[0] ? 1 : elem1[0] < elem2[0] ? -1 : 0;
    }).reverse()

    return (

        <div className="container container-no-margins posts">
            
            
            {(profileView) ? <Profile posts={rearrangedIds}/>:
            (settingsView) ? <Settings /> :
            <>
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
            {rearrangedIds.map((element, index)=>{
                return (
                    <div className="cols justify-content-center">
                        <Post key={index} id={element[1]} />
                    </div>
                )
            })}
            </div>
            </>}
        </div>
    )
}

export default Posts