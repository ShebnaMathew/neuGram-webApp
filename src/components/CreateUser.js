import { useState } from "react";
import {useDispatch} from "react-redux";
import {createUser} from "../redux/actions";

const CreateUser = (props) => {

    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passwordOk, setPasswordOk] = useState(false);
    const dispatch = useDispatch();

    const handleCreate = () => {
        
        if (password === confirm) {
            props.setCreate(false)
            dispatch(createUser(username, password))
        }
        /* else {
            dispatch(creationFail())
        } */
        setUsername("");
        setPassword("");
        setConfirm("")
    }

    const handleKeyPress = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleCreate();
        }
    }

    return(
        <>
            <div className="card align-self-center border-0">
                <div className="card-body custom-background-color">
                    <h5 className="card-title text-aligner text-center">Create your account !<br></br> </h5>
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
                    <div className="row my-4">
                        <div className="col-12 col-sm-2">
                            <label htmlFor="password" className="form-label">Confirm password:</label>
                        </div>
                        <div className="col-12">
                            <div className="col">
                                <input 
                                    type="text" 
                                    id="confirm" 
                                    name="confirm" 
                                    className="form-control"
                                    value={confirm} 
                                    onChange={e => setConfirm(e.target.value)}
                                    onKeyUp={e => handleKeyPress(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button className="btn custom-btn-style" onClick={(e) => handleCreate()}>
                                Create User
                        </button>
                    </div>
                </div>
        </div>
    </>
    )
}

export default CreateUser