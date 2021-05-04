import {useState, useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import {sendToChat} from "../redux/actions";
import ToxicityOutput from "./ToxicityOutput";
import * as toxicity from '@tensorflow-models/toxicity';
import {Tooltip} from "bootstrap";

const THRESHOLD = 0.3;

// A lot of this is from lecture code!

let model;
toxicity.load(THRESHOLD).then(toxicityModel => model = toxicityModel);

const Form = () => {
    const [messageTxt, setMessageTxt] = useState("");
    const [checkInProgress, setCheckInProgress] = useState(false);
    const [isToxic, setIsToxic] = useState(false);
    const [toxicityValue, setToxicityValue] = useState(0);
    const [tooltipOpen, toggleTooltip] = useState(false);
    const tooltipRef = useRef();
    

    const dispatch = useDispatch();

    useEffect(() => {
        let tooltip = tooltipRef.current; // Get the DOM element using the ref
        let bsTooltip = Tooltip.getInstance(tooltip); // Get an instance of Bootstrap's Tooltip plugin

        if (!bsTooltip) {
            // Initializes the tooltip when the page first loads
            bsTooltip = new Tooltip(tooltip);
        }
        else {
            // Shows or hides the tooltip as appropriate
            tooltipOpen ? bsTooltip.show() : bsTooltip.hide();
        }
    })

    const processMessage = () => {
        if (!isToxic) {
            setCheckInProgress(true);
            model.classify(messageTxt).then(predictions => {
                let problems = {};
                for (let pred of predictions) {
                    if (pred.results[0].match) {
                        problems[pred.label] = pred.results[0].probabilities[1]; // Gets the true probability
                    }
                }
                if (Object.keys(problems).length === 0) // Not toxic
                    sendMessageAndClearForm();
                else {
                    setCheckInProgress(false);
                    setIsToxic(true);
                    setToxicityValue(calculateToxicity(problems));
                }
            });
        } else sendMessageAndClearForm();
    }

    const onKeyUp = event => {
        if (event.keyCode === 13)
            processMessage();
    }

    const sendMessageAndClearForm = () => {
        dispatch(sendToChat(messageTxt));
        setMessageTxt("");
        setIsToxic(false);
        setCheckInProgress(false);
    }

    const processInput = event => {
        setMessageTxt(event.target.value);
        if (isToxic) {
            setIsToxic(false);
        }
    }

    const calculateToxicity = problems => {
        //  Get the highest toxicity value
        const probablities = Object.values(problems);
        const max =  Math.max(...probablities);
        console.log(max  * 100);
        return max * 100;
    }

    const getButtonText = () => {
        if (checkInProgress) {
            return <>Checking <span>.</span><span>.</span><span>.</span></>
        } else {
            if (isToxic)
                return "Send anyway";
            else return  "Check and send";
        }
    }

    const getToxicityFeedback = () => {
        // Some arbitrary thresholds... 
        const PROBABLY_TOXIC = 0.7 
        if (toxicityValue < PROBABLY_TOXIC)
            return <>Your message <em>might</em> be toxic but I'm not sure...</>
        else return <>Your message is probably toxic!</>
    }


    return (
        <form onSubmit={e => e.preventDefault()}>
            <div className="row justify-content-center">
                <div className="row">
                    <textarea aria-label="Your message" type="text" rows="3" className="form-control mb-3" id="messageTxt"
                        placeholder="Enter your message" value={messageTxt}
                        invalid={`${isToxic}`} disabled={checkInProgress}
                        onChange={processInput}
                        onKeyUp={onKeyUp}
                         />
                </div>
                <div className="row">
                    <button 
                        type="button" 
                        className="btn float-right custom-btn-style"
                        onClick={processMessage}
                        disabled={checkInProgress}
                    >
                        {getButtonText()}
                    </button>
                </div>
                <div className="invalid-feedback" style={isToxic === true ? {display:"block"} : {display: "none"}}>
                    {getToxicityFeedback()}
                    <>
                    <button className="btn btn-link" id="toxicity-help"
                        ref={tooltipRef}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-trigger="manual"
                        title="A message is considered to be toxic if it is hateful, 
                            explicit, or otherwise offensive.  We calculate the 
                            probability that your message is toxic by comparing 
                            it to millions of internet comments that have been 
                            labeled as either toxic or healthy. The darker and wider the bar below, the higher the 
                            probability that your message is toxic."
                        onPointerEnter={() => toggleTooltip(true)}
                        onFocus={() => toggleTooltip(true)}
                        onPointerOut={() => toggleTooltip(false)}
                        onBlur={() => toggleTooltip(false)}
                    >(?)</button></>
                    <div className="row mb-2">
                        <div className="col">
                            <ToxicityOutput width={100 - toxicityValue}/>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="row my-2">
                
            </div>
        </form>
    )
}

export default Form;