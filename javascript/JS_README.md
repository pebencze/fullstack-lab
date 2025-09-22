
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


### TextContent vs. InnerText
- [](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)
- textContent is NOT aware of how the text is rendered -> hidden things
- innerText is

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