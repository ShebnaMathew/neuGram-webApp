import {useState} from "react";
import {useDispatch} from "react-redux";
import {connectToChat} from "../redux/actions";

const JoinChat = () => {
    const [username, setUsername] = useState("");
    const [isValid, setIsValid] = useState(null);

    const dispatch = useDispatch();

    const processInput = event => {
        if (event.keyCode !== 13) {
            if (event.target.value.length > 0) {
                setUsername(event.target.value);
                setIsValid(true);
            } else {
                setIsValid(false);
                setUsername(event.target.value);
            }
        }
    }

    const verifyUsername = () => {
        if (username.length > 0) {
            setIsValid(true);
            dispatch(connectToChat(username))
        } else {
            setIsValid(false);
        }
    }

    const onKeyUp = event => {
        if (event.keyCode === 13)
            verifyUsername();
    }

    return (
        <form className="my-4" onSubmit={e => e.preventDefault()}>
            <div className="row justify-content-center">
                <div className="row">
                    <input aria-label="Your username" type="text" className="form-control has-validation" 
                            id="username"
                            invalid={`${isValid === false}`}
                            valid={`${isValid === true}`}
                            placeholder="Username" value={username}
                            onChange={processInput}
                            onKeyUp={onKeyUp} />
                    <div className="invalid-feedback" style={isValid === false ? {display:"block"} : {display: "none"}}>
                        Username cannot be empty!
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-primary float-right"
                            onClick={verifyUsername}>
                        Join Chat
                    </button>
                </div>
            </div>
        </form>
    )
}

export default JoinChat;