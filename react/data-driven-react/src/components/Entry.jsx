export function Entry(props) {
    return (
        <article className="journal-entry">
            <div className="location-image-container">
                <img className="location-image" src={props.img.src} alt={props.img.alt}/>
            </div>
            <div className="info-container">
                <img className="marker-image" src="./src/assets/marker.png" alt="tiny marker"/>
                <span className="country">{props.country}</span>
                <a href={props.googleMapsLink}>View on Google maps</a>
                <h1>{props.title}</h1>
                <p className="dates">{props.dates}</p>
                <p className="description">{props.description}</p>
            </div>
        </article>
    )
}