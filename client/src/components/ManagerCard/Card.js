import  Axios  from "axios";
import React from "react";
import { useState, useContext } from "react";
import "./Card.css";
import { currentUser } from "../../App";
const Card = (props) => {
  const user = useContext(currentUser);
  const [readonly, setReadOnly] = useState(true);
  const [editItem, setEditItem] = useState({
    email: "",
    password: "",
    website: "",
    index:props.itemindex,
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
    console.log("hello")
    Axios.post("http://localhost:9002/saveitem", { user, editItem })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
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
            >
              <img src="/save.png" alt="save icon"></img>
            </button>
            <button className="btn btn-primary manager-card-btn">
              <img src="/delete.png" alt="save icon"></img>
            </button>
            <button
              className="btn btn-primary manager-card-btn"
              onClick={() => setReadOnly(false)}
            >
              <img src="/edit.png" alt="save icon"></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
