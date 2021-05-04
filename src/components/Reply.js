import {LOGIN_STATE} from "../redux/stateConstants"
import { useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {  addReply} from "../redux/actions";

const Reply = (props) => {

    const loggedIn = useSelector(state => state.loginState);
    const user = useSelector(state => state.user);
    const [reply, setReply] = useState("");
    const dispatch = useDispatch();

    const updateReply = text => {
        setReply(text);
    }

    const onSubmit = () => { 
        if (reply.length !== 0){
            dispatch(addReply({
                reply: reply,
                user:  user.username,
                }, props.id));
            clearForm();
        }
    }

    const clearForm = () => {
        setReply("");
    }

    return(
        loggedIn === LOGIN_STATE.LOGGED_IN ?
            <div class="input-group mb-3">
                <input type="text" class="form-control reply-btn" placeholder="Add a comment" aria-label="Add a reply" 
                aria-describedby="button-addon2" value={reply} onChange={e => updateReply(e.target.value)}/>
                <button class="btn custom-btn-style" type="button" id="button-addon2" onClick={onSubmit}>Comment</button>
            </div>:""
    )
}

export default Reply