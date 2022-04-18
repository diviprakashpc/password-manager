import Axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import "./Card.css";
import { currentUser } from "../../App";
const Card = (props) => {
  const user = useContext(currentUser);
  console.log("User at Card.js", user);
  const [readonly, setReadOnly] = useState(true);
  const [editItem, setEditItem] = useState({
    email: "",
    password: "",
    website: "",
    index: props.itemindex,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem({
      ...editItem,
      [name]: value,
    });
    console.log("Edit item changing", editItem);
  };

  const saveItem = () => {
    console.log("hello");
    console.log("User at saveitem axios request", user);
    console.log("Edit item at saveitem axios request", editItem);
    if (
      !(editItem.email === "") &&
      !(editItem.website === "") &&
      !(editItem.password === "")
    ) {
      Axios.post("http://localhost:9002/saveitem", { user, editItem })
        .then((res) => {
          console.log("final user list recieved after saveitem", res.data.list);
          // setReadOnly(true);    // dikkat ye line kr rahi hai.
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Enter valid input");
    }
  };

  const deleteItem = () => {
    Axios.post("http://localhost:9002/deleteitem", {
      user,
      index: props.itemindex,
    }).then((res) => {
      alert(res.data.message);
    });
  };

  return (
    <div>
      <div>
        <div className="card manager-card">
          <div id="header-manager-card">
            <img src="/lock.png" className="card-img-top" alt="..."></img>
          </div>
          <div className="card-body manager-card-body">
            <div id="username-field">
              <input
                class="form-control"
                type="text"
                name="website"
                value={
                  readonly == false ? `${editItem.website}` : `${props.website}`
                }
                aria-label="Disabled input example"
                readOnly={readonly}
                onChange={handleChange}
              ></input>
            </div>
            <div id="email-field">
              {" "}
              <input
                class="form-control"
                type="text"
                name="email"
                value={
                  readonly == false ? `${editItem.email}` : `${props.email}`
                }
                aria-label="Disabled input example"
                readOnly={readonly}
                onChange={handleChange}
              ></input>
            </div>
            <div id="passowrd-field">
              <input
                class="form-control"
                type="text"
                name="password"
                value={
                  readonly == false
                    ? `${editItem.password}`
                    : `${props.password}`
                }
                aria-label="Disabled input example"
                readOnly={readonly}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div id="card-footer">
            {" "}
            <button
              className="btn btn-primary manager-card-btn"
              onClick={saveItem}
              disabled={readonly}
            >
              <img src="/save.png" alt="save icon"></img>
            </button>
            <button
              className="btn btn-primary manager-card-btn"
              onClick={deleteItem}
            >
              <img src="/delete.png" alt="delete icon"></img>
            </button>
            <button
              className="btn btn-primary manager-card-btn"
              onClick={() => setReadOnly(false)}
              disabled={!readonly}
            >
              <img src="/edit.png" alt="edit icon"></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
