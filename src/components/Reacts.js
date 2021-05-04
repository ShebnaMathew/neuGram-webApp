import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faLaughSquint, faSadCry, faAngry } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart, faLaughSquint as solidSquint, faSadCry as solidCry, faAngry as solidAngry } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { addReacts } from "../redux/actions";
import { useDispatch } from 'react-redux';

const Reacts = (props) => {

    const [heartFilled, toggleHeartFilled] = useState(false)
    const [laughFilled, toggleLaughFilled] = useState(false)
    const [cryFilled, toggleCryFilled] = useState(false)
    const [angryFilled, toggleAngryFilled] = useState(false)

    const dispatch = useDispatch();

    const reacted = (reaction) => {
        let number;

        if (reaction === "heart") {
            toggleHeartFilled(!heartFilled)
            number = props.post.reacts.heart
            number = (heartFilled) ?
                number - 1: number + 1;
            dispatch(addReacts({...props.post.reacts,
                heart: number
            }, props.id))

        } else if (reaction === "angry") {
            toggleAngryFilled(!angryFilled)
            number = props.post.reacts.angry
            number = (angryFilled) ?
                number - 1: number + 1;
            dispatch(addReacts({...props.post.reacts,
                angry: number
            }, props.id))

        } else if (reaction === "cry") {
            toggleCryFilled(!cryFilled)
            number = props.post.reacts.cry
            number = (cryFilled) ?
                number - 1: number + 1;
            dispatch(addReacts({...props.post.reacts,
                cry: number
            }, props.id))

        } else if (reaction === "laugh") {
            toggleLaughFilled(!laughFilled)
            number = props.post.reacts.laugh
            number = (laughFilled) ?
                number - 1: number + 1;
            dispatch(addReacts({...props.post.reacts,
                laugh: number
            }, props.id))
        }
    }

   
    return(
        <div className="reacts">
            {
                heartFilled ? <FontAwesomeIcon className="reacts heart-color" icon={solidHeart} size="3x" onClick={(e) => reacted("heart")}/>:
                <FontAwesomeIcon className="reacts" icon={faHeart} size="2x" onClick={(e) => reacted("heart")}/>
            }
            {
                laughFilled ? <FontAwesomeIcon className="reacts laugh-color" icon={solidSquint} size="3x" onClick={(e) => reacted("laugh")}/>:
                <FontAwesomeIcon className="reacts" icon={faLaughSquint} size="2x" onClick={(e) => reacted("laugh")}/>
            }
            {
                angryFilled ? <FontAwesomeIcon className="reacts angry-color" icon={solidAngry} size="3x" onClick={(e) => reacted("angry")}/>:
                <FontAwesomeIcon className="reacts" icon={faAngry}size="2x" onClick={(e) => reacted("angry")}/>
            }
            {
                cryFilled ? <FontAwesomeIcon className="reacts sad-color" icon={solidCry} size="3x" onClick={(e) => reacted("cry")}/>:
                <FontAwesomeIcon className="reacts" icon={faSadCry} size="2x" onClick={(e) => reacted("cry")}/>
            }
            <p className="card-text">{props.post.reacts.heart + props.post.reacts.cry + props.post.reacts.laugh + props.post.reacts.angry + " reacts"}</p>
            
        </div>
    )
}

export default Reacts