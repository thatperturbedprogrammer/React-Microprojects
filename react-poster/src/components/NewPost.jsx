import classes from "./NewPost.module.css";
import { useState } from "react";
function NewPost(props) {
  // Body
  const [enteredBody, setEnteredBody] = useState("");

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  // Author
  const [enteredAuthor, setEnteredAuthor] = useState("");

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  // Submit handler
  function submitHandler(event) {
    event.preventDefault();

    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };

    console.log(postData);
    props.onAddPost(postData);
    props.onCancel();
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authorChangeHandler} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
