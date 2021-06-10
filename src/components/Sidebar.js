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
    const users = useSelector(state => state.users)
    const usersOnlineNames = Object.keys(usersOnline);
    const loginState = useSelector(state => state.loginState);
    const createdNew = useSelector(state => state.createdNewUser);
    const [create, setCreate] = useState(false);
    const [userPicsMap, setUserPicsMap] = useState({});
    const picture = useSelector(state => state.user.profilePicture);

    console.log("users: ", users)
    console.log("usersOnline: ", usersOnline)
    console.log("usersOnlineNames: ", usersOnlineNames)

    for (let each of Object.keys(users)) {
            userPicsMap[users[each].username] = users[each].profilePicture
        }
    
    console.log("userPicsMap: ", userPicsMap)

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
                    {usersOnlineNames.map((username, index) => (
                        
                        <ProfileBubble key={index} userpicture={userPicsMap[username]} username={username} big={false} />
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