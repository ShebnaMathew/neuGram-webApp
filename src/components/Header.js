import {useDispatch, useSelector} from "react-redux";
import { LOGIN_STATE } from "../redux/stateConstants";
import { logout, addPostPage, completeOnboarding } from "../redux/actions";
import { VIEW_POST } from "../redux/actionConstants";


const Header = () => {

    const dispatch = useDispatch();
    const loginState = useSelector(state => state.loginState);
    const viewState = useSelector(state => state.viewState);
    const isNewUser = useSelector(state => state.isNewUser);
    const userId = useSelector(state => state.user.userId);
    const username = useSelector(state => state.user.username);

    return (
        <nav className="navbar navbar-dark bg-dark header">
            <div className="container-fluid">
                <div className="navbar-brand">InstaChat</div>
                {
                    loginState === LOGIN_STATE.LOGGED_IN &&
                    <>
                        <div className="navbar-brand" id="seperator">|</div>
                    </>
                }
                
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <div class="nav-link" aria-current="page">{username}</div>
                    </li>
                </ul>

                {
                    loginState === LOGIN_STATE.LOGGED_IN && viewState === VIEW_POST && (isNewUser !== undefined && !isNewUser) &&
                    <>
                        <button className="btn custom-btn-style" onClick={() => dispatch(addPostPage())}>
                            Add Post
                        </button> 
                        <button className="btn custom-btn-style btn-buffer" onClick={() => dispatch(completeOnboarding(!isNewUser, userId))}>
                            View Onboarding
                        </button>git 
                    </>
                }
                    
                {
                    loginState === LOGIN_STATE.LOGGED_IN &&
                    <button className="btn pop-button float-end" onClick={() => dispatch(logout())}>
                        Log Out
                    </button> 
                }
            </div>
        </nav>
    )
}

export default Header