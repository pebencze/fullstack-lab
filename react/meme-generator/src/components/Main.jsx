import { useState, useEffect } from 'react'

export default function Main() {

    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    const [images, setImages] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => {
                const firstTen = data.data.memes.slice(0, 10)
                console.log(firstTen)
                setImages(firstTen.map(it => ({id: it.id, url: it.url})))
        })
    }, [])

    function handleChange(event){
        const {value, name} = event.currentTarget
        setMeme(prevMeme => (
            {
                ...prevMeme,
                [name]: value
            }
        ))
    }
    
    console.log(images)  

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * images.length)
        const newUrl = images[randomNumber].url
        setMeme(prevMeme => ({...prevMeme, imageUrl: newUrl}))
    }


    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder={meme.topText}
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}