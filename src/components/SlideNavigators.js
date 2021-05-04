const SlideNavigators = ({ slideNumber, setSlideNumber, 
    lastSlideIndex }) => {

    const changeSlide = (increment) => {
        const newSlide = slideNumber + increment;
        if (newSlide > lastSlideIndex || newSlide < 0) {
            return;
        }
        setSlideNumber(newSlide);
    }

    return (
        <>
            <button className="btn custom-btn-style" onClick={() => {changeSlide(-1)}}>
                Previous
            </button>
            <button className="btn custom-btn-style" onClick={() => {changeSlide(1)}}>
                Next
            </button>
        </>
    )
};

export default SlideNavigators;