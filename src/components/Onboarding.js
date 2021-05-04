import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeOnboarding } from '../redux/actions';
import Slide from './Slide';
import SlideNavigators from './SlideNavigators';

const Onboarding = () => {
    const [slideNumber, setSlideNumber] = useState(0);
    const isNewUser = useSelector(state => state.isNewUser);
    const userId = useSelector(state => state.user.userId)
    const dispatch = useDispatch();

    const completeSlides = (e) => {
        e.preventDefault();
        dispatch(completeOnboarding(!isNewUser, userId))
    }

    const slidesInfo = [

        {
            title: "Login Screen and Reacts",
            description: "Login using the panel on the left side of the screen. You can react without having to login!",
            img: "loginScreen.png",
            alt: "Login panel on left half of screen and posts on the right."
        },
        {
            title: "Logged-in: Chat",
            description: "Once you've joined, you can see who's online and start chatting!",
            img: "loggedInView.png",
            alt: "Chat with online uses using the left side panel!" 
        },
        {
            title: "Logged-in: Reacts and New Posts",
            description: "View posts, react, or make a new post of your own using the button on the top! You can also log out here!",
            img: "reactionToPost.png",
            alt: "Click emojis to react or click Add Post to add a new one!"
        },
        {
            title: "Add a new post!",
            description: "Create a new post by providing the caption, image URL, and tags! You can also exit the form! Note: To find the image URL, right click on the photo you want to post from Google Images then right click “Copy Image Address” and paste that into the “Post Picture” box. Every tag starts with a # and multiple tags can be separated by whitespace.",
            img: "addNewPost.png",
            alt: "Fill out fields and submit to create a new post or click to go back without making a new post." 
        }
    ];

    const slides = slidesInfo.map((info, index) => <Slide info={info} key={index} />);

    return (
        <div className="container onboarding-slides rounded-2 p-3">
            {
                slides[slideNumber]
            }
            <div className="slide-buttons">
                <div className="col">
                    <button 
                        className="btn custom-btn-style"
                        onClick={completeSlides}
                    >
                        Skip
                    </button>
                </div>
                <div className="col">
                    {`${slideNumber + 1}/${slidesInfo.length}  `}
                    <SlideNavigators 
                        setSlideNumber={setSlideNumber} 
                        slideNumber={slideNumber}
                        lastSlideIndex={slidesInfo.length - 1}
                    />
                </div>
                <div className="col">
                    <button 
                        className="btn custom-btn-style"
                        onClick={completeSlides}
                    >
                        Done!
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Onboarding;