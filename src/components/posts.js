import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
      <NavBar></NavBar>
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <PostCard posts={posts}>
          </PostCard>
        </Container>
      </Container>
      <CreatePost></CreatePost>

    </div>
  );
};


/**
 * @returns A simple navigation bar on the top
 */
const NavBar = () => {
  return (<Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          src="/icon.ico"
          width="30"
          height="30"
          color="white"
          className="d-inline-block align-top"
        />
        Dalio
      </Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav>
          <Nav.Link href="#Todo">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}

/**
 * @param {*} param0: json of post data 
 * @returns A collection of toasts with posts
 */
const PostCard = ({ posts }) => {
  return (
    <Row xs={1} md={3} className="g-4">
      {posts.map((post) => (
        <Col>
          <Card key={post.id} style={{ borderRadius: "20px" }}>
            <Card.Body>
              <Card.Title>
                <Link to={`/posts/${post.id}`}
                  style={{ color: "black", textDecoration: "none" }}
                  className="me-auto">{post.title}
                </Link>
              </Card.Title>
              <Card.Text>
                {post.text}
                <br></br>
                <small className="text-muted">
                  {daysFromToday(post.published_at)} days ago
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
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
  const onSubmit = (data) => {
    document.getElementById("postForm").reset();
    createPost(data.title, data.text);
  }
  return (
    <form id="postForm" onSubmit={handleSubmit(onSubmit)}>
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
  var today = new Date()
  var parsed = new Date(posted);
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
  const body = JSON.stringify({ id: randomID(), title: title, text: text, published_at: (new Date()).toString() })
  // Post request!
  fetch("https://serverless-api.wyw6.workers.dev/api/posts", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: body
  });
}

export default Posts;
