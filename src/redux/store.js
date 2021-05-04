import {INITIAL_STATE, LOGIN_STATE} from "./stateConstants";
import { STORE_POSTS, LOGIN_SUCCESS, INVALID_LOGIN, LOGIN_NETWORK_ERROR, COMPLETE_ONBOARDING, 

    LOGOUT, NEW_MESSAGE, CONNECTED, STORE_USERS, ADD_REPLY, UPDATE_REACTS, ADD_POST_PAGE, VIEW_POST, STORE_ONLINE_USERS } from "./actionConstants";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case STORE_ONLINE_USERS: {
            return {...state, onlineUsers: action.payload.onlineUsers}
        }
        case VIEW_POST: {
            return {...state, viewState: VIEW_POST}
        }
        case ADD_POST_PAGE: {
            return {...state, viewState: ADD_POST_PAGE}
        }
        case STORE_USERS: {
            return {...state, users: action.payload.users};
        }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginState: LOGIN_STATE.LOGGED_IN,
                user: action.payload.user,
                isNewUser: action.payload.user.isNewUser
            }
        case INVALID_LOGIN:
            return {...state, loginState: LOGIN_STATE.INVALID_LOGIN}
        case LOGIN_NETWORK_ERROR:
            return {...state, loginState: LOGIN_STATE.NETWORK_ERROR}
        case LOGOUT:
            return {
                ...state, 
                user: {}, 
                loginState: LOGIN_STATE.LOGGED_OUT,
                viewState: VIEW_POST,
                isNewUser: false
            }
        case COMPLETE_ONBOARDING:
            return {
                ...state,
                user: {
                    ...state.user,
                    isNewUser: action.payload.isNewUser
                },
                isNewUser: action.payload.user.isNewUser
            }    
        case STORE_POSTS: 
            return {...state, posts: action.payload.posts};
        case NEW_MESSAGE:
            return {...state, messages: action.payload.messages}
        case CONNECTED:
            return {...state, isConnected: true}
        case ADD_REPLY:
            const currentPosts = {...state.posts};
            const updated = currentPosts[action.payload.postId];
            updated.replies.push(action.payload.reply);
            return {...state,
                posts:currentPosts
            }
        case UPDATE_REACTS:
            const currentPostsWithReacts = {...state.posts};
            const updatedReacts = currentPostsWithReacts[action.payload.postId];
            updatedReacts.reacts = (action.payload.reacts);
            return {...state,
                posts:currentPostsWithReacts
            }
        default:
            return state;
    }
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));