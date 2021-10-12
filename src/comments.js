import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
class post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      id: props.match.params.id,
      postId: "",
      name: "",
      email: "",
      body: "",
    };

    console.log(props);
  }
  getposts = async () => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/post/${this.state.id}/comments`
      );
      console.log(data);
      this.setState({ comments: data });
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.getposts();
  }
  createPost = async () => {
    try {
      const { postId, name, email, body } = this.state;
      const { data: comment } = await axios.post(
        `https://jsonplaceholder.typicode.com/post/${this.state.id}/comments`,
        {
          postId,
          name,
          email,
          body,
        }
      );
      let comments = [...this.state.comments];
      comments.push(comment);
      // console.log(data);
      this.setState({ comments, postId: "", name: "", email: "", body: "" });
    } catch (err) {
      console.error(err);
    }
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.createPost();
  };

  render() {
    return (
      <>
        <h1>Comments </h1>
        <Table striped bordered>
          <tr>
            <th>postId</th>
            <th>name</th>
            <th>email</th>
            <th>body</th>
          </tr>
          {this.state.comments.map((comment) => {
            return (
              <tr>
                <td>{comment.postId}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
                <td>{comment.body}</td>
              </tr>
            );
          })}
        </Table>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="postId"
            value={this.state.postId}
            onChange={this.handleChange}
            placeholder="Add postid here.."
            required
          />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Add your name here.."
            required
          ></input>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Add your email id here.."
            required
          ></input>
          <input
            type="text"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="Add your comments here.."
            required
          ></input>
          <button type="submit">Add Comments</button>
        </form>
      </>
    );
  }
}
export default post;
