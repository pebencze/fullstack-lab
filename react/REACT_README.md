# React

## Recommendations

- [Medium article about BEST PRACTICES](https://medium.com/@oretugafolorunso/five-best-practices-for-front-end-development-react-42f187a996b1)
- [Pure Components](https://react.dev/learn/keeping-components-pure)

## Components
~: a component is _a piece of reusable code_ that represents a part of a user interface
-> to manage, render, update UI elements

## JSX
~: A JSX element is a combination of _JavaScript code_ and _HTML tags_ that describes what you’d like to display. 
- under the hood, JSX elements are turned into elements by calling createElement
e.g.:
```javascript
<button className="square">X</button>
```

## index.jsx
```javascript
import { StrictMode } from "react"; // React
import { createRoot } from "react-dom/client"; // React’s library to talk to web browsers (React DOM)
import "./styles.css"; // the styles for your components

import App from "./App"; // the component you created
```

## Fragments
`<></>` or <Fragment></Fragment> => to wrap multiple adjacent JSX elements
- does not insert an extra div into the DOM

## States
~: to remember things, components use _states_
- re-rendering happens also for child components that inherit props that hold a state
- `useState()` returns an array of 2 elements...
    - `const result = React.useState("Hello")`
- we use **array destructuring**
    - `const result[state, setState] = React.useState("Hello")`
- this would create an _infinite loop_:
```javascript
import React from "react"

export default function App() {
    let [isImportant, setIsImportant] = React.useState("Yes")
    setIsImportant("Heck yes!")
    
    return (
        <main>
            <h1 className="title">Is state important to know?</h1>
            <button className="value">{isImportant}</button>
        </main>
    )
}
```
- Rule of thumb: **if you ever need the old value of state to help you determine the new value of state,you should pass a callback function to yourstate setter function instead of usingstate directly.**
```javascript
// better use a callback function
function add() {
    setCount(prevCount => prevCount + 1)
}

// not this!
function add() {
    setCount(count + 1)
}
```
- never EVER directly modify state, use setState !!!

### Controlled vs. uncontrolled components
React controls the compinent, i.e. there is state attached to it.

    ### Passing data to components
    - you can pass states from parent -> child
    - you can NOT pass states from child -> parent
    - you can NOT pass states from sibling -> sibling
    - best practice: 
        - pass just one level up when needed, don't have a "global parent" 
        - create a common parent if you need to pass state from sibling to sibling

### Avoiding side-effects
- (out)-side-effects -> concerns APIs, websockets, subscriptions, database interactions, localStorage
- fetching data in the example below would create an infinite loop, because once it fetches the data it re-renders, 
but re-rendering triggers the fetching mechanism again:
```javascript
export default function App(props) {
    const [starWarsData, setStarWarsData] = React.useState(null)
    
    // console.log("Rendered!")
    
    fetch("https://swapi.dev/api/people/1")
        .then(res => res.json())
        .then(data => setStarWarsData(data))
    
    return (
        <div>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}
```
=> SOLUTION: **useEffect** is a React Hook that lets you synchronize a component with an external system

## UseEffect
- does not work with async functions
- useffect can set up an eventListener when the component is mounted and unmount it with removeEventListener when the component is unmounted
- aka: the return value of our callback function for useEffect can contain a cleanup function to help escape from side-effects
```javascript
export default function WindowTracker() {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    
    React.useEffect(() => {
        // declare the function used in our eventlistener
        function watchWindowWidth () {
            console.log("Resized")
            setWindowWidth(window.innerWidth)
        }
        // mount function when component is mounted
        window.addEventListener("resize", watchWindowWidth)
        // unmount function when component is unmounted, aka return a function
        return function() {
            window.removeEventListener("resize", watchWindowWidth)
        }
    }, [])
    
    return (
        <h1>Window width: {windowWidth}</h1>
    )
}
```

## Rule of Hooks
**Call Hooks at the Top Level**
This means you must not call Hooks (useState, useEffect, etc.) inside:
- Loops (for, while)
- Conditions (if, else)
- Nested functions

**Why??**
=> React relies on the call order of Hooks to work correctly. Behind the scenes, React maintains an internal list (like an array) of state and effects for your component. On the next render, React expects the exact same order to give you back the correct state and manage the effect properly.
If you need to run an effect conditionally, put the if statement inside the useEffect function body, not outside.

## Props
~: Props are how you pass data from a parent component to a child component. They are read-only and help make components reusable.

## Props vs. State
Props and states are the two types of "models" in React, but they areb very different.
- **Props** are arguments that you pass from a parent component to a child component e.g. a `Form` can pass `color` prop to a `Button`
    - props should be immutable!!
- **State** is like a component's memory and it helps keeping track of interaction e.g. `Button` might keep track of `isHovered` state


## Rule of Thumb for Structuring Components
### The Parent Component's Job
The parent is the "smart" component or the "brain" of the operation.

- Owns the State: It uses useState to hold the application's data (e.g., selectedCards, matchedCards).
- Owns the Logic: It defines the functions that change the state (e.g., handleClick, checkForMatch).
- Passes Data Down: It passes the state and handler functions down to children as props.

### The Child Component's Job
The child is the "dumb" or "presentational" component. It shouldn't know about the overall application's logic.

- Receives Props: It takes data and functions from its parent.
- Handles Display Logic: It can have its own internal logic to decide how to render itself based on the props it receives (e.g., (isSelected) ? content : "?").
- Is Reusable: Its primary goal is to be a self-contained, reusable piece of UI.

Think of the parent as a director and the children as actors. The director holds the script (the state) and tells the actors what their motivation is (the props). The actor's job is to use that direction to deliver their lines and perform their actions (render the UI).

## React Developer Tools
This is a cool browser extension that helps you to inspect components. It contains "Profiler" and "Components".
![](../readme/dev_tools.png)
![](../readme/dev_tools_2.png)

## Re-Rendering
- React skips re-rendering when props are unchanged...
- the React Compiler automatically applies this: [memoization](https://react.dev/reference/react/memo)

## Self-Closing Tags <Component />
[](https://stackoverflow.com/questions/48991212/react-component-closing-tag)
- components in React that don't have a child, are preferably self-closing, while components that have children need to have an ending tag
- in HTML, the rule is a bit different and self-closing tags can onluy be used for void elements like `img`

## Export / Import

| Syntax  | Export statement                    | Import statement                  |
|---------|---------------------------------------|-----------------------------------|
| Default | `export default function Button() {}` | `import Button from './Button.js';` |
| Named   | `export function Button() {}`         | `import { Button } from './Button.js';` |

## Barrel Exports
[Guide here](https://blog.logrocket.com/using-barrel-exports-organize-react-components/#how-to-use-barrel-exports)
- you can import multiple files in one single line, like this
`import {util, mod, lay} from './components'`
- Steps:
    - we need an `index.js` file at the root of the `components` folder
    - change from default to named exports
    - we can use (multiple) aliases for our exports, e.g.
        - `import * as util from './components'`

## Rendering Lists
- [official doc](https://react.dev/learn/rendering-lists)
- JavaScript array methods – e.g. `filter()`, `map()` – can be used to manipulate an array of data in React 
- an ID (uuid or database index) is needed to track what items get deleted, inserted or updated


## Routing
- [official doc](https://react.dev/learn/routing)
- useful for SPA (single page applications)
- ~: assigning a URL
- simple interface: `BrowserRouter`, `Link`, `Route`, `Redirectand`, `Switch`
- also contains a `history` API
- Installation:
```bash
npm install --save react-router-dom
```
- requires a **router context** outside of the application:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return <Router>[...]</Router>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
- you can create custom error pages following [this guide](https://github.com/remix-run/react-router/discussions/11352)
