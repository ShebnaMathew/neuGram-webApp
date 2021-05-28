import { COMPLETE_ONBOARDING, STORE_POSTS, LOGIN_SUCCESS, INVALID_LOGIN, 
  LOGIN_NETWORK_ERROR, LOGOUT, UPDATE_DOWNLOAD_URL, NEW_MESSAGE, CONNECTED, STORE_USERS, ADD_REPLY, 
  UPDATE_REACTS, ADD_POST_PAGE, VIEW_POST, STORE_ONLINE_USERS, CREATE_SUCCESS } from "./actionConstants";

import firebase from "../data/fbConfig";

import { joinChat, sendMessage } from "../client";

const database = firebase.firestore();

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: {
        user: user,
        completeOnboarding: user.isNewUser
    }
});

export const createdUser = () => ({
  type: CREATE_SUCCESS,
  payload: {
      createdNewUser: true
  }
});

export const loginFail = () => ({
    type: INVALID_LOGIN
});

export const loginNetworkError = () => ({
    type: LOGIN_NETWORK_ERROR
});

export const logout = () => ({
    type: LOGOUT
});

export const addPostPage = () => ({
  type: ADD_POST_PAGE
})

export const viewPost = () => ({
  type: VIEW_POST
})

export const storePosts = (posts) => ({
    type: STORE_POSTS,
    payload: {
        posts: posts
    }
})

export const getPosts = () => {
    return dispatch => {
      
      database.collection("posts")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            const posts = {};
            querySnapshot.forEach(doc => {
              posts[doc.id] = {
                caption:doc.data().caption,
                datePosted:doc.data().datePosted,
                pictureUrl:doc.data().pictureUrl,
                reacts:doc.data().reacts,
                replies:doc.data().replies,
                tags:doc.data().tags,
                userId:doc.data().userId,
                username:doc.data().username
              }
            })
            dispatch(storePosts(posts));
          }
          else {
            console.log("No posts available") 
          }
        })
        .catch(error => {
          console.log("Error")
        });
    }
  };

export const storeUsers = (users) => {
  return {
    type: STORE_USERS,
    payload: {
        users: users
    }
  }
};

export const storeUsersOnline = (users) => {
  return {
    type: STORE_ONLINE_USERS,
    payload: {
        onlineUsers: users
    }
  }
}

const updateReply = (postId, reply) => ({
  type: ADD_REPLY,
  payload: {
      postId: postId,
      reply: reply
  }
})

const updateReacts = (postId, reacts) => ({
  type: UPDATE_REACTS,
  payload: {
      postId: postId,
      reacts: reacts
  }
})

const updateDownloadUrl = (url) => ({
  type: UPDATE_DOWNLOAD_URL,
  payload: {
    url: url
  }
})

export const getUsers = () => {
  return dispatch => {
    
    database.collection("users")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const userDatabase = {};
          querySnapshot.forEach(doc => {
            userDatabase[doc.id] = {
              username:doc.data().username,
              password:doc.data().password,
              isNewUser:doc.data().isNewUser,
              isPublic:doc.data().isPublic,
              profilePicture:doc.data().profilePicture,
              friendsList:doc.data().friendsList,
              userId: doc.id
            }
          })
          dispatch(storeUsers(userDatabase));
        }
        else {
          console.log("No users available") 
        }
      })
      .catch(error => {
        console.log("Error in loading users")
      });
      
}};

export const createUser = (username, password) => {
  return dispatch => {
    
    database.collection("users")
    .add({
              username:username,
              password:password,
              isNewUser:true,
              isPublic:true,
              profilePicture:"",
              friendsList:[]
    })
      .then((querySnapshot) => {
        dispatch(createdUser());
        dispatch(getUsers());

      })
      .catch(error => {
        console.log("Error creating user")
      });
      
}};

const updateOnboarding = (complete) => ({
  type: COMPLETE_ONBOARDING,
  payload: {
    user: {
      isNewUser: complete
    }
  }
})

export const completeOnboarding = (complete, userId) => {
  return dispatch => {
    database.collection("users").doc(userId)
      .update({
        isNewUser: complete
      })
      .then(() => {
        dispatch(updateOnboarding(complete));
      })
      .catch(error => {
        console.log("Could not update user onboarding status:", error);
      })
  }
}

export const addReply = (reply, postId) => {
  return dispatch => {
    database.collection("posts").doc(postId)
      .update({
        replies: firebase.firestore.FieldValue.arrayUnion(reply)
      })
      .then(() => {
          dispatch(updateReply(postId, reply));
      })
      .catch(error => {
        console.log("Could not add the reply.",error);
      })
  }
}

export const addReacts = (reacts, postId) => {
  return dispatch => {
    database.collection("posts").doc(postId)
      .update({
        reacts: reacts
      })
      .then(() => {
          dispatch(updateReacts(postId, reacts));
      })
      .catch(error => {
        console.log("Could not add the reply.",error);
      })
  }
}

export const uploadPic = (pictureUrl, setPicUrl) => {

  console.log("upload pic action HERE")
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var imagesRef = storageRef.child('images');
  var postImagesRef = imagesRef.child(pictureUrl.name);
  let postUrl = ""
  postImagesRef.put(pictureUrl)
  .then(() => postImagesRef.getDownloadURL())
  .then((url) => {
    setPicUrl(url)
    postUrl = url
  })
  

  return dispatch => {

    //let url = download(postImagesRef)
    console.log('download over url: ', postUrl)
        dispatch(updateDownloadUrl(postUrl));
    
  }

  
}



let d = new Date();
export const addPost = (caption, pictureUrl, tags, username) => {
  

  return dispatch => {
    console.log("pic url: ", pictureUrl)
    database.collection("posts")
      .add({
        caption: caption,
        datePosted: `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`,
        pictureUrl: pictureUrl,
        tags: tags,
        username: username,
        reacts: {heart:0, laugh:0, cry:0, angry:0},
        replies: [],
      })
      .then(() => {
          console.log("Added new post")
      })
      .catch(error => {
        console.log("Could not add the new post: ", error);

      })
  }
}

export const connectToChat = username => {
    console.log("here");
    return dispatch => joinChat(username);
    
}

// Replaces the direct call to sendMessage in Form
export const sendToChat = msg =>  {
    return dispatch => sendMessage(msg);
}

export const isConnected = () => ({type: CONNECTED})

export const newMessage = messages => ({
    type: NEW_MESSAGE,
    payload: {
        messages
    }
})