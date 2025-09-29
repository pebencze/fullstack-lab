import React from 'react';
import ReactDOM from 'react-dom/client';

export default function App() {

  /**
   * This is used with <form action={handleSubmit} method="post">,
   * event.preventDefault() and formEl.reset() are also necessary
   * @param {} event 
   */
  function handleSubmit(event) {
      event.preventDefault() //A preventDefault is called on the event when submitting the form to prevent a browser reload/refresh.
      const formEl = event.currentTarget
      const formData = new FormData(formEl)
      const email = formData.get('email')
      const password = formData.get('password')
      formEl.reset()
  }

  /**
   * This is a much simpler version of handleSubmit():
   * No need to use preventDefault() and reset(), since the action is handling it automatically
   * @param {*} formData 
   */
  function signUp(formData){
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(email, password)
  }

  return (
    <section>
      <h1>Signup form</h1>
      <form action={signUp}>
        {/* version 1 of label + input
        <label>Email: 
          <input type="email" name="email" placeholder="example@email.com" />
        </label> */}
        {/* version 2 of input and label*/}
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" placeholder="example@email.com" />
        <br/>

        <label htmlFor='password'>Password:</label>
        <input id="password" type="password" name="password" placeholder='********'></input>
        <br/>

        {/* version 1 of submit button
        <input type="submit" value="Click" /> */}
        {/* version 2 of submit button*/}
        <button>Submit</button>
        <br />
      </form>

    </section>
  )
}