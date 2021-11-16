import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { useForm } from "react-hook-form";

/**
 * @returns A modal form for submitting thoughts
 */
const PostForm = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const { register, handleSubmit } = useForm();
  // Submit button handling
  const onSubmit = (data) => {
    setShow(false);
    document.getElementById("postForm").reset();
    createPost(data.title, data.text);
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Share a Thought!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="postForm" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Title" />
          <input {...register("text")} placeholder="My Thoughts" />
          <Button type="submit" variant="primary">
            Share
            </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
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



export default PostForm;