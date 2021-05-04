import { logout } from "../redux/actions";
import { useDispatch } from "react-redux";

const InvalidLogin = () => {
    const dispatch = useDispatch();
    return (
        <div className="custom-background-color align-self-center">
            <h1 className="text-center">Login was unsuccessful! Please try again!</h1>
            <div className="row mx-auto">
                <button className="btn custom-btn-style" onClick={() => dispatch(logout())}>
                    Back to login
                </button> 
            </div>
        </div>
    )
}

export default InvalidLogin;