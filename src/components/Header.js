import {useDispatch, useSelector} from "react-redux";
import { LOGIN_STATE } from "../redux/stateConstants";
import { logout, addPostPage, completeOnboarding, toggleView, settingsView, profileView } from "../redux/actions";
import { VIEW_POST } from "../redux/actionConstants";
import Profile from "./Profile"


const Header = () => {

    const dispatch = useDispatch();
    const loginState = useSelector(state => state.loginState);
    const view = useSelector(state => state.profileView);
    const viewState = useSelector(state => state.viewState);
    const isNewUser = useSelector(state => state.isNewUser);
    const userId = useSelector(state => state.user.userId);
    const username = useSelector(state => state.user.username);

    return (
        <nav className="navbar navbar-dark bg-dark header">
            <div className="container-fluid nav-width">
                <button className="navbar-brand brand btn-dark" onClick={(e) => dispatch(toggleView(false, ""))}>Supergram</button>
                <ul class="nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <button class="btn btn-dark nav-link" aria-current="page" onClick={(e) => dispatch(toggleView(true, username))}>{username}</button>
                    </li>
                </ul>
                {/**onClick={() => dispatch(completeOnboarding(!isNewUser, userId))} */}

                {
                    // CHANGE TO SETTINGS PAGE
                    // INCLUDE PROFILE PICTURE UPLOAD
                    // ONBOARDING
                    // PUBLIC OR PRIVATE PROFILE
                    loginState === LOGIN_STATE.LOGGED_IN && viewState === VIEW_POST && (isNewUser !== undefined && !isNewUser) &&
                    <>
                        <button className="btn btn-buffer btn-dark help-btn" onClick={(e) => {
                            dispatch(settingsView(true)); 
                            dispatch(toggleView(false, username));
                        }
                    }>
                            Settings
                        </button>
                    </>
                }

                {
                    loginState === LOGIN_STATE.LOGGED_IN &&
                    <>
                        <div className="navbar-brand" id="seperator">|</div>
                    </>
                }
                    
                {
                    loginState === LOGIN_STATE.LOGGED_IN &&
                    <button className="btn btn-dark float-end" onClick={() => dispatch(logout())}>
                        Log Out
                    </button> 
                }
            </div>
        </nav>
    )
}

export default Header