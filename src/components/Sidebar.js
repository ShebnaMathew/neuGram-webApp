import Chat from "./Chat";
import Login from "./Login";
import ProfileBubble from "./ProfileBubble";
import {useSelector} from "react-redux";
import { LOGIN_STATE } from "../redux/stateConstants";
import InvalidLogin from "./InvalidLogin";

const Sidebar = () => {
    // TODO: get users online
    // or whatever
    // probably store in store; when client joins:

    // TODO: either cap amount of users or scroll?
    // overflow-y...
    const usersOnline = useSelector(state => state.onlineUsers);
    const users = Object.keys(usersOnline);
    const loginState = useSelector(state => state.loginState);
    // console.log(users)

    return (
        <div className="container sidebar-profile-container container-no-margins">
            {loginState === LOGIN_STATE.LOGGED_OUT && <Login />}
            {
                loginState === LOGIN_STATE.LOGGED_IN && 
                <>
                <aside className="profile-bubble-column pe-2">
                    {users.map((username, index) => (
                        <ProfileBubble key={index} username={username.substring(0, 3)} />
                    ))}
                </aside>
                <Chat/>
                </>
             }
            {loginState === LOGIN_STATE.INVALID_LOGIN && <InvalidLogin />}
        </div>
    )
}

export default Sidebar