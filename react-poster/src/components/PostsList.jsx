import Modal from "./Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";
import { useEffect, useState } from "react";

function PostsList({ modalIsVisible, hideModal }) {
  const [posts, setPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  // GET
  useEffect(() => {
    async function fecthPosts() {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }
    fecthPosts();
  }, []);

  function addPostHandler(postData) {
    // POST
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((existingPosts) => [postData, ...existingPosts]); // push on top of existing posts
  }
  return (
    <>
      {isFetching && <div className={classes.loading}>Loading posts...</div>}
      {modalIsVisible && (
        <Modal onClose={hideModal}>
          <NewPost onCancel={hideModal} onAddPost={addPostHandler} />
        </Modal>
      )}

      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={(Math.random() * 100000).toString()}
              author={post.author}
              body={post.body}
            />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div>
          <h1 className={classes.noposts}>No posts yet.</h1>
          <p className={classes.startaddingposts}>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
