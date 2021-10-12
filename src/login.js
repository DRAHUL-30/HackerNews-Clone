import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");

  const users = [];
  var userChecker = false;

  function validateForm() {
    userChecker = true;
    window.localStorage.setItem("userLogin", userChecker);
    if (username.length) {
      if (users.length === 0) {
        users.push(username);
        userChecker = true;
      } else {
        for (var x of users) {
          if (x === username) {
            userChecker = true;
          } else if (x == users[users.length - 1]) {
            users.push(username);
            userChecker = true;
          }
        }
      }

      // window.localStorage.setItem("userLogin", userChecker);
      // window.localStorage.setItem("username", username);
      // setUsername("");
      return username.length >= 5;
    }
  }

  // function validate() {
  //   return username.length >= 0;
  // }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Login</Form.Label>
          <br />
          <br />
          <Form.Label>Username: </Form.Label>
          <Form.Control
            autoFocus
            type="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <br />
        <div>
          <Button
            className="btn btn-secondary mx-3 my-3"
            type="submit"
            disabled={!validateForm()}
          >
            {username.length >= 5 ? <Link to={`/post/`}>login</Link> : "login"}
          </Button>
          <NavLink to="/">
            <button className="btn btn-secondary mx-3 my-3">Home</button>
          </NavLink>
        </div>
      </Form>
    </div>
  );
}