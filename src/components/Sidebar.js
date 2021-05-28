import Chat from "./Chat";
import Login from "./Login";
import ProfileBubble from "./ProfileBubble";
import {useSelector} from "react-redux";
import { LOGIN_STATE } from "../redux/stateConstants";
import InvalidLogin from "./InvalidLogin";
import CreateUser from "./CreateUser";
import { useState } from "react";

const Sidebar = () => {
    const usersOnline = useSelector(state => state.onlineUsers);
    const users = Object.keys(usersOnline);
    const loginState = useSelector(state => state.loginState);
    const createdNew = useSelector(state => state.createdNewUser);
    const [create, setCreate] = useState(false);
    // console.log(users)

    return (
        <div className="container sidebar-profile-container container-no-margins">
            {
            ((loginState === LOGIN_STATE.LOGGED_OUT) && (create)) ?
                    <CreateUser setCreate={setCreate}/>:
                 (loginState === LOGIN_STATE.LOGGED_OUT) ?
                    <Login setCreate={setCreate} />:
                     ""
            }
            
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