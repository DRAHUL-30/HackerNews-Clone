import "./Navbar.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  NavLink,
} from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import login from "./login";
import post from "./post";
import comments from "./comments";

export default function NavApp() {
  var userChecker = window.localStorage.getItem("userLogin");
  var userNameGet = window.localStorage.getItem("username");
  const [user, setuser] = useState("Login");
  const [username, setUsername] = useState("");

  //React hook to update login or logout and username in header section
  useEffect(() => {
    if (userChecker === "true") {
      setuser("Logout");
      setUsername(userNameGet);
    } else {
      setuser("Login");
      setUsername("");
    }
  }, [userChecker]);

  //when logout button was clicked userLogin is set to false
  const loginChange = () => {
    if (userChecker === "true") {
      window.localStorage.setItem("userLogin", false);
    }
    else{
      window.localStorage.setItem("userLogin", true);
    }
  };
  return (
    <>
      <Router>
        <Navbar bg="danger" variant="dark">
          <Container>
            <form className="d-flex">
              {/* <h5 className="text-primary mx-2 mt-1 align-middle">
                {username}
              </h5> */}
              <NavLink to="/login">
                <button
                  className="btn btn-outline-secondary top"
                  type="text"
                  onClick={() => loginChange()}
                >
                  {user}
                </button>
              </NavLink>
            </form>
            <NavLink exact className="login" activeStyle={{ margin: 5 }} to="/">
              login
            </NavLink>
            {/* <NavLink exact className="post" activeStyle={{ margin: 5 }} to="/post">
              post
            </NavLink> */}
          </Container>
        </Navbar>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/post" component={post} />
          <Route exact path="/post/:id" component={comments} />
          <Route exact path="/login">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Router>
    </>
  );
}
