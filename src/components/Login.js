import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess, loginFail} from "../redux/actions";
import { joinChat } from "../client";

const Login = () => {

    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)

    const checkLogin = (username, password) => {
        for (let user in users) { 
            if (username.toLowerCase() === users[user].username.toLowerCase() 
                && password.toLowerCase() === users[user].password.toLowerCase()) {
                joinChat(users[user].username);
                return users[user];
            }
        }
        return false;
    }


    const handleLogin = () => {
        const user = checkLogin(username, password);
        if (user !== false) {
            dispatch(loginSuccess(user))
        }
        else {
            dispatch(loginFail())
        }
        setUsername("");
        setPassword("");
    }

    const handleKeyPress = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleLogin();
        }
    }

    return (
        <>
            <div className="card align-self-center border-0">
                <div className="card-body custom-background-color">
                    <h5 className="card-title text-aligner text-center">Snap a pic and want to share it with your friends? <br></br> </h5>
                    <div className="row my-4">
                        <div className="col-12 col-sm-2">
                            <label htmlFor="username" className="form-label">Username:</label>
                        </div>
                        <div className="col-12">
                            <div className="col">
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    className="form-control"
                                    value={username} 
                                    onChange={e => {setUsername(e.target.value)}}
                                    onKeyUp={e => handleKeyPress(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-12 col-sm-2">
                            <label htmlFor="password" className="form-label">Password:</label>
                        </div>
                        <div className="col-12">
                            <div className="col">
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    className="form-control"
                                    value={password} 
                                    onChange={e => {setPassword(e.target.value)}}
                                    onKeyUp={e => handleKeyPress(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button className="btn custom-btn-style" onClick={handleLogin}>
                                Log In
                        </button>
                    </div>
                </div>
        </div>
    </>
    )
}

export default Login