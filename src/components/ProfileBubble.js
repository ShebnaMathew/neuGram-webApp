const ProfileBubble = ({username, big}) => {
    // render text right now, but could render a profile picture if it existed
    return (
        (big) ?
        <div className="rounded-circle profile-bubble-big m-1 text-center fst-italic">
            {username}
        </div>:
        <div className="rounded-circle profile-bubble m-1 text-center fst-italic">
            {username}
        </div>
        
    )
}

export default ProfileBubble;