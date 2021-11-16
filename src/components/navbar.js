import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";

import PostForm from './postform.js'
/**
 * @returns A simple navigation bar on the top
 */
const NavBar = () => {
  return (<Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
    <Container>
      <Navbar.Brand href="">
        <img
          src="/icon.ico"
          width="30"
          height="30"
          color="white"
          className="d-inline-block align-top"
          alt="logo"
        />
        Dalio
      </Navbar.Brand>
      <Nav>
        <CreatePost></CreatePost>
      </Nav>
    </Container>
  </Navbar>);
}

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
      { showForm ? <PostForm></PostForm> : null}
    </div>
  );
}


export default NavBar;
