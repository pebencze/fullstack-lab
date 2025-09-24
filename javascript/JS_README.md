
### DOM
~: **Document Object Model**, aka how to use JS to modify websites
- D: document (html)
- O: object (document is of type object)
- M: model (representation)

[DOM scripting explained.](https://explainers.dev/dom-scripting/)

A **tree structure** that enables the HTML structure to be easily accessed by programming languages. The browser uses it to apply styling and functionality as it renders the page. Developers can *manipulate the DOM with JavaScript* after the page has been rendered.<br/>

Consists of **nodes** (e.g. elements like HEAD or just text).<br/>

Types of nodes:
- root
- child
- descendant
- parent
- sibling

You'll also come across them in CSS (for example, descendant selector, child selector).<br/>

We can manipulate the DOM using *properties* and *methods* available to the **element reference**. These are defined on **interfaces** like `HTMLAnchorElement` in the case of `<a>` element, its more general parent interface `HTMLElement`, and `Node` — which represents all nodes in a DOM. <br/>
There are many ways to select an element and store a reference to it in a variable, but the recommended way is to use `Document.querySelector()`.<br/>

The `Document` interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree.


### TextContent vs. InnerText vs. InnerHTML
- [](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)
- textContent is NOT aware of how the text is rendered -> hidden things can be seen
- innerText is aware of it
- [using innerHTML can be dangerous](https://medium.com/@sparklewebhelp/understanding-the-risks-of-using-inner-html-in-web-development-30d4fa67f815), because it is easy to inject malicious javascript with it into the html file -> use textContent instead, because it cannot interpret the JS code
- sanitizing can be done on the backend, as well 

### Separation of concerns (.js vs. .html)

#### Approach 1: Declarative HTML (Your Current Method)
You define the element's place in the structure within your index.html file.

```html
<body>
    <div id="author"></div>
    <script src="index.js"></script>
</body>
```
The JavaScript then finds this pre-existing element and populates it.

```javascript
const author = document.getElementById("author");
author.textContent = `by ${data.user.first_name} ${data.user.last_name}`;
```

Pros of this approach:

* Clear Separation of Concerns: Your HTML file describes the structure of your page, and your JavaScript file describes its behavior. This makes your project easier to understand, maintain, and debug.
* Readability: Anyone can look at your index.html and immediately understand the basic layout of the page without needing to execute or even read the JavaScript.
* Performance: The browser can render the div as part of the initial HTML parsing. While it's empty at first, its place in the DOM is reserved. This can help prevent content from "jumping around" (Cumulative Layout Shift) when the JavaScript finally loads the author's name.
* Progressive Enhancement: This is a classic example of progressive enhancement. You have a basic HTML structure that works, and JavaScript enhances it by adding dynamic content.

#### Approach 2: Imperative JavaScript (DOM Manipulation)
In this alternative, your HTML would be completely empty, and the JavaScript would be responsible for creating the element from scratch.

html
<!-- Alternative index.html -->
<body>
    <!-- The author div would be inserted here by JS -->
    <script src="index.js"></script>
</body>
Your JavaScript would need to do more work. I've modified your setBackground function to show what this would look like.

```javascript
    .then(data => {
        console.log(data);
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        const author = document.getElementById("author");
        author.textContent = `by ${data.user.first_name} ${data.user.last_name}`;
        
        // Create the element, set its properties, and add it to the DOM
        const authorEl = document.createElement("div");
        authorEl.id = "author";
        authorEl.textContent = `by ${data.user.first_name} ${data.user.last_name}`;
        document.body.appendChild(authorEl);
    })
```

When is this approach better?

This imperative approach is powerful and necessary when:

* The number of elements is dynamic: Imagine creating a new <li> for every item in a list you fetch from an API. You wouldn't write 100 empty <li> tags in your HTML.
* Elements are created by user interaction: When a user clicks an "Add Item" button, you use JavaScript to create and append the new item. 

Conclusion:
* For a static "slot" or placeholder on your page like the author div, which will always be there, define it in your HTML. It makes your code's intent clearer and follows best practices.
* Use JavaScript's DOM manipulation capabilities (createElement, appendChild) when you need to dynamically generate elements whose existence or quantity isn't known when you write the HTML.

### Async JS

Many functions provided by browsers are asynchronous:
- Making HTTP requests using `fetch()`
- Accessing a user's camera or microphone using `getUserMedia()`
- Asking a user to select files using `showOpenFilePicker()`

You don't need to create most functions, but know how to use them correctly.

An event handler is a particular type of callback. A callback is just a function that's passed into another function, with the expectation that the callback will be called at the appropriate time. As we just saw, callbacks used to be the main way asynchronous functions were implemented in JavaScript.

#### Promises

Most modern asynchronous APIs don't use callbacks. Instead, the foundation of asynchronous programming in JavaScript is the Promise,

1. What is a promise (in your own words)?
- an object what an synchronous function returns; you can attach handlers to it and they will be executed once the function has succeeded or failed


2. Which part of the code we have so far is a promise?
- fetch()

3. What are the three states a promise can be in?
- pending
- fulfilled -> then
- rejected -> catch

4. What does it mean when a promise is "resolved" (or fulfilled)?
 - the asynchronous function has succeeded. When a promise is fulfilled, its then() handler is called

5. How do we tell the code to do something only AFTER a
   promise is resolved?

#### Async/await

This function...
```javascript
function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            console.log(deckId)
        })
}
```

...can be transformed like this:
```javascript
async function handleClick() {
    const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    remainingText.textContent = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
    console.log(deckId)
}
```

#### Event listeners and async/await
The main difference is their purpose: **event listeners *react* to user actions**, while **async/await *manages the flow* of operations that take time**.

Think of it like this:

  * An **event listener** is like a doorbell. You set it up and it waits to be rung. You don't know *when* it will happen, but you know *what* to do when it does.
  * **Async/await** is like ordering a package. You place the order and `await` its arrival before you can use it. It's for handling a process with a known start and an eventual end.

-----

##### Event Listeners: The "When" Mechanism 👂

An event listener is a function that waits for a specific event to occur on an element. Its job is to **listen and react**. The program doesn't stop or pause; it simply attaches a function to be executed *whenever* the event happens.

  * **Purpose:** To respond to unpredictable events, such as user interactions (`'click'`, `'mouseover'`, `'keydown'`) or browser events (`'load'`, `'scroll'`).
  * **Structure:** Uses a callback function. This is the code that runs *when* the event fires.
  * **Execution Flow:** Asynchronous and non-blocking. You set up the listener, and the rest of your code continues to run. The callback function only executes when triggered.

###### Simple Example: Listening for a Button Click

```javascript
// Get the button element from the HTML
const myButton = document.getElementById('myButton');

// This is the callback function that will run on a click
function handleButtonClick() {
  console.log('Button was clicked!');
}

// Attach the listener: "WHEN a 'click' happens on myButton, run handleButtonClick"
myButton.addEventListener('click', handleButtonClick);

console.log('This message appears immediately, without waiting for a click.');
```

-----

##### Async/Await: The "How" Mechanism ⏳

`async/await` is a modern way to handle **Promises**. A Promise is an object representing an operation that hasn't completed yet but is expected to in the future (like a network request). `async/await` lets you write asynchronous code that looks and feels synchronous, making it much easier to read and manage.

  * **Purpose:** To manage the sequence of asynchronous operations that have a defined start and finish, like fetching data, reading a file, or waiting for a timer.
  * **Structure:**
      * The `async` keyword is used to declare a function that will handle asynchronous operations.
      * The `await` keyword is used inside an `async` function to **pause its execution** until a Promise settles (either resolves or rejects).
  * **Execution Flow:** It pauses the `async` function in a non-blocking way, allowing the rest of the program to run. Once the awaited promise is complete, the function resumes where it left off.

###### Simple Example: Fetching Data from an API

```javascript
// The 'async' keyword allows us to use 'await' inside this function
async function getUserData() {
  console.log('Starting to fetch data...');
  
  try {
    // 1. Pause the function until the data is fetched
    const response = await fetch('https://api.github.com/users/google');
    
    // 2. After the fetch is done, pause again until the response is parsed as JSON
    const data = await response.json();

    // 3. Once the data is ready, log it
    console.log(data.name); // Outputs: Google

  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
  
  console.log('Data fetching complete.');
}

getUserData();
console.log('This message appears immediately, while the data is still being fetched.');
```

-----

##### Putting It All Together

The most common scenario is using them **together**. An event listener can trigger an `async` function. For example, a user clicks a button, and *in response*, you fetch data from an API.

```javascript
const fetchButton = document.getElementById('fetchButton');

// The callback for our event listener is an async function
fetchButton.addEventListener('click', async () => {
  try {
    // Use await to handle the asynchronous fetch operation
    const response = await fetch('https://api.github.com/users/microsoft');
    const data = await response.json();
    
    console.log(`Fetched user: ${data.name}`); // Outputs: Microsoft
    // You could now update the webpage with this data
    
  } catch (error) {
    console.error('Something went wrong!', error);
  }
});
```

In this example:

1.  The **event listener** (`addEventListener`) is the *trigger* (the "when").
2.  The **`async` function** is the *action* that contains time-consuming logic.
3.  **`await`** manages the flow *within* that action, ensuring you don't try to use the data before it has arrived.

### Import / Export
- A `**module**` is a JavaScript file that can export elements from itself with the export keyword. Then, other modules can import them with an import statement.

### Hoisting
Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope (either global or function scope) before code execution. It's important to note that only the declarations are hoisted, not the initializations.

- **`var` declarations**: When you declare a variable with var, its declaration is hoisted to the top of its scope, and it is automatically initialized with undefined. You can access it before the line where it was declared without an error, but its value will be undefined until its assignment is reached.

```javascript
console.log(myVar); // Outputs: undefined
var myVar = "Hello!";
console.log(myVar); // Outputs: "Hello!"
```

- **`let` and `const` declarations**: Variables declared with let and const are also hoisted, but they are not initialized. They exist in a "temporal dead zone" (TDZ) from the start of the scope until the point where they are declared. Accessing them in the TDZ results in a ReferenceError.

```javascript
// console.log(myLet); // Throws ReferenceError: Cannot access 'myLet' before initialization
let myLet = "Hello!";
```

- **Function declarations**: The entire function, including its body, is hoisted. This allows you to call a function before it appears in the code.

```javascript
sayHello(); // Outputs: "Hello, World!"

function sayHello() {
  console.log("Hello, World!");
}
```

- **Function expressions**: If you assign a function to a variable (var, let, or const), the hoisting behavior of the variable applies. The variable declaration is hoisted, but the function body (the assignment) is not.

```javascript
// sayHi(); // Throws TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi!");
};
```

### Closures
JavaScript supports closure, i.e. an inner function has access to variables of an outer function. See:
```javascript
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    <>Something</>
  )
};
```