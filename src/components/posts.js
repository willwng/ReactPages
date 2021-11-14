import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "https://serverless-api.wyw6.workers.dev/api/posts"
      );
      const postsResp = await resp.json();
      setPosts(postsResp);
    };

    getPosts();
  }, []);
  return (

    <div style={{ textAlign: "center" }}>
      <h1>Dalio</h1>
      <CreatePost></CreatePost>

      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <ExampleToast posts={posts}>
          </ExampleToast>
        </Container>
      </Container>
    </div>
  );
};

/**
 * @param {*} param0: json of post data 
 * @returns A collection of toasts with posts
 */
const ExampleToast = ({ posts }) => {
  return (
    <ToastContainer>
      {posts.map((post) => (
        <Toast key={post.id}>
          <Toast.Header>
            <strong className="me-auto">{post.title}</strong>
            <small className="text-muted">{daysFromToday(post.published_at)} days ago </small>
          </Toast.Header>
          <Toast.Body>{post.text}</Toast.Body>
        </Toast>))}
    </ToastContainer>
  );
};

/**
 * @returns Button that can show a form
 */
const CreatePost = () => {
  const [showForm, showFormSet] = useState(false);
  const onClick = () => { showFormSet(true ^ showForm) }
  return (
    <div>
      <Button variant="success" className="mr-1" onClick={onClick}>
        Share a new thought
      </Button>
      { showForm ? <PostForm /> : null}
    </div>
  );
}

/**
 * @returns Form for submitting thoughts
 */
const PostForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => createPost(data.title, data.text);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Title" />
      <input {...register("text")} placeholder="My Thoughts" />
      <Button type="submit" variant="secondary" size="sm">
        Share
      </Button>
    </form>
  );
}

/**
 * @param {*} posted Date of post (string)
 * @returns Numbers of days since posted
 */
function daysFromToday(posted) {
  var today = Date.now();
  var parsed = Date.parse(posted);
  var time_difference = new Date(today - parsed);
  return (
    <>
      {time_difference.getDay()}
    </>);
}

/**
 * @returns Randomly generated ID
 */
function randomID() {
  const max_id = 2 ** 10;
  return Math.floor(Math.random() * max_id);
}

/**
 * Creates a post request based on input of title and text
 * @param title Title of post (string)
 * @param text Text of post (string)
 */
function createPost(title, text) {
  // Empty title and text aren't allowed
  if (!title) {
    title = "I forgot to make a title :("
  }
  if (!text) {
    text = "I am at a loss for words"
  }
  // Randomly generate id and get the date
  const body = JSON.stringify({ id: randomID(), title: title, text: text, published_at: Date.now().toString() })
  // Post request!
  fetch("https://serverless-api.wyw6.workers.dev/api/posts", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body
  })
  console.log(body)
}

export default Posts;
