const ToxicityOutput = props => {
    return (
        <div className="scale-background">
            <div className="scale-foreground" style={{width: props.width + "%"}}></div>
        </div>
    )
}

export default ToxicityOutput;