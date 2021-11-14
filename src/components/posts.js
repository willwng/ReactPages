import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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
    <body >
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


    </body>

  );
};

const ExampleToast = ({ posts }) => {
  return (
    <>
      <ToastContainer>
        {posts.map((post) => (
          <Toast>
            <Toast.Header>
              <strong className="me-auto">{post.title}</strong>
              <small className="text-muted">{daysFromToday(post.published_at)} days ago </small>
            </Toast.Header>
            <Toast.Body>{post.text}</Toast.Body>
          </Toast>))}
      </ToastContainer>
    </>
  );
};

const CreatePost = () => {
  const [showForm, showFormSet] = useState(false);
  const onClick = () => { showFormSet(true ^ showForm) }
  return (
    <div>
      <Button show={showForm} variant="success" className="mr-1" onClick={onClick}>
        Share a new thought
      </Button>
      { showForm ? <PostForm /> : null}
    </div>
  );
}


const PostForm = () => {
  return (
    <div>
      <Form style={{ width: "30%", margin: "auto" }} >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control name="title" type="text" placeholder="Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control name="text" type="text" placeholder="My Thoughts" />
        </Form.Group>
      </Form>
      <Button type="submit" onClick={createPost()}>Submit form</Button>
    </div>
  );
}

function daysFromToday(posted) {
  var today = Date.now();
  var parsed = Date.parse(posted);
  var time_difference = new Date(today - parsed);
  return (
    <>
      {time_difference.getDay()}
    </>);
}

function randomID() {
  const max_id = 2 ** 10;
  return Math.floor(Math.random() * max_id);
}


function createPost() {
  var title = "test"
  var text = "test text"
  if (!title) {
    title = "I forgot to make a title :("
  }
  if (!text) {
    title = "I am at a loss for words"
  }
  const body = JSON.stringify({ id: randomID(), title: title, text: text, published_at: Date.now().toString() })

  fetch("https://serverless-api.wyw6.workers.dev/api/posts/?", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body
  })
  console.log(body);

}

export default Posts;
