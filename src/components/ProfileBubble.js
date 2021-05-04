const ProfileBubble = ({username}) => {
    // render text right now, but could render a profile picture if it existed
    return (
        <div className="rounded-circle profile-bubble m-1 text-center fst-italic">
            {username}
        </div>
    )
}

export default ProfileBubble;