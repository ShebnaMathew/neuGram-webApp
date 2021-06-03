import { VIEW_POST } from "./actionConstants"

export const LOGIN_STATE = {
    LOGGED_IN: "logged in",
    LOGGED_OUT: "logged out",
    INVALID_LOGIN: "invalid login",
    NETWORK_ERROR: "network error"
}

export const INITIAL_STATE = {
    posts: {},
    loginState: LOGIN_STATE.LOGGED_OUT,
    user: {},
    isConnected: false, 
    messages: [],
    users: {},
    viewState: VIEW_POST,
    onlineUsers: {},
    url: "",
    isNewUser: false,
    createdNewUser: false,
    profileView: false,
    userView: ""
}