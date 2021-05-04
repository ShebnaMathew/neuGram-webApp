const Slide = (props) => {
    const { title, description, img, alt }= props.info 
    return (
        <div className="container slide mt-2">
            <h2>{title}</h2>
            <p>{description}</p>
            <img 
                src={process.env.PUBLIC_URL + '/' + img}
                className="slide-img"
                alt={alt}
            />
        </div>
    )
}

export default Slide;