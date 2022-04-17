import Axios from "axios";
import React, { useState, useContext } from "react";
import "./Card.css";
import { currentUser, setsLoginUser } from "../../App";
const Card = (props) => {
  const user = useContext(currentUser);

  const [readOnly, setReadOnly] = useState(true);
  const [editItem, setEditItem] = useState({
    website: `${props.website}`,
    email: `${props.email}`,
    password: `${props.password}`,
  });
  const saveCard = () => {
    console.log("Reached savecard");
    const { website, email, password } = editItem;
    if (website && email && password) {
      Axios.post("http://localhost:9002/saveitem", { user, editItem }).then(
        (res) => {
          setReadOnly(true);
          console.log(
            "Data recieved from server after post save request",
            res.data
          );
        }
      );
    } else {
      console.log("Enter valid input before saving");
    }
  };

  const handleChange = (e) => {
    console.log(editItem);
    const { name, value } = e.target;
    setEditItem({
      ...editItem,
      [name]: value,
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
                value={editItem.website}
                aria-label="Disabled input example"
                disabled={readOnly}
                onChange={handleChange}
              ></input>
            </div>
            <div id="email-field">
              {" "}
              <input
                class="form-control"
                type="text"
                name="email"
                value={editItem.email}
                aria-label="Disabled input example"
                disabled={readOnly}
                onChange={handleChange}
              ></input>
            </div>
            <div id="passowrd-field">
              <input
                class="form-control"
                type="text"
                name="password"
                value={editItem.password}
                aria-label="Disabled input example"
                disabled={readOnly}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div id="card-footer">
            {" "}
            <button
              className="btn btn-primary manager-card-btn"
              onClick={saveCard}
            >
              <img src="/save.png" alt="save icon"></img>
            </button>
            <button className="btn btn-primary manager-card-btn">
              <img src="/delete.png" alt="delete icon"></img>
            </button>
            <button
              className="btn btn-primary manager-card-btn"
              onClick={() => {
                setReadOnly(false);
              }}
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
