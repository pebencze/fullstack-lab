import React from "react"

export default function Pad({props}) {
    const [isOn, setIsOn] = React.useState(props.on)
    
    function toggle() {
        setIsOn(prevOn => !prevOn)
    }
    return (
        <button 
            onClick={toggle}
            style={{backgroundColor: props.color}} 
            className={isOn ? "on" : ""}>
        </button>
    )
}