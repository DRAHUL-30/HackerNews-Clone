import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Post() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [comments] = useState([]);
  const [userName] = useState("");
  const [title] = useState("");

  useEffect(() => {
    console.log("Mounting");
    getPost();
    getUser();
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
    } catch (error) {
      console.log("error in fetching date", error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUser(response.data);
    } catch (error) {
      console.log("error in fetching date", error);
    }
  };

  //DisplayData
  function DisplayPost({ data, user }) {
    let userName = "";
    let title = data.title;
    user.forEach((a) => {
      if (data.userId === a.id) userName = a.name;
    });
    return (
      <>
        <div className="card1">
          <div className="cardHeader">
            <div className="name">
              <h3>{userName}</h3>
            </div>
            <div className="title">
              <p>{title}</p>
            </div>
            <div className="topButtons">
              <div>
                <Button
                  variant="danger"
                  onClick={() => {
                    deletePost(data.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div className="cardBody">
            {
              <p key={comments.id}>
                {/* <Link to={`/post/1`}>View comments</Link> */}
                <NavLink className="link1" to={`/post/${data.id}`}>
                  View comments
                </NavLink>
              </p>
            }
          </div>
        </div>
      </>
    );
  }

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      let postData = [...data];
      postData = postData.filter((a) => a.id !== id);
      setData(postData);
    } catch (error) {
      console.log("error in deleting", error);
    }
  };

  return (
    <div className="cardContainer">
      {data.map((a) => {
        return <DisplayPost data={a} user={user} />;
      })}
    </div>
  );
}

// posts.map((p)=>{
//   return <p key={p.id}><Link to={`/posts/${p.id}`}>{p.title}</Link></p>
// })}
