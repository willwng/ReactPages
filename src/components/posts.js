import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';

import NavBar from './navbar.js'
import PostForm from "./postform.js";

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
    </div>
  );
};


/**
 * @param {*} param0: json of post data 
 * @returns A collection of toasts with posts
 */
const PostCard = ({ posts }) => {
  return (
    <Row xs={1} md={3} className="g-4">
      {posts.map((post) => (
        <Col key={post.id} >
          <Card style={{ borderRadius: "20px" }}>
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
                  {daysFromToday(post.published_at)}
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
 * @param {*} posted Date of post (string)
 * @returns Numbers of days since posted
 */
function daysFromToday(posted) {
  const today = new Date()
  const parsed = new Date(posted);
  const diffTime = Math.abs(today - parsed);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  var output = new String(diffDays);
  if (diffDays > 1) {
    output += " days ago";
  }
  else {
    output += " day ago";
  }
  return (
    <>
      {output}
    </>);
}


export default Posts;
