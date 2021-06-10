const ProfileBubble = ({userpicture, username, big}) => {
    // render text right now, but could render a profile picture if it existed

    if (userpicture === "") {
        userpicture = username.substring(0,3)
    }

    console.log("userpicture: ", userpicture)
    return (
        (big) ?
        <img src={userpicture} className="card-img-top post-img rounded-circle profile-bubble-big m-1 text-center fst-italic" alt={username.substring(0,3)}/>
        :
        <img src={userpicture} className="card-img-top post-img rounded-circle profile-bubble m-1 text-center fst-italic" alt="..."/>
        
    )
}

export default ProfileBubble;