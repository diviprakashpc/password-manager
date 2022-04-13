import React from "react";
import "./Card.css";
const Card = () => {
  return (
    <div>
      <div>
        <div className="card manager-card">
          <div id="header-manager-card">
            <img src="/lock.png" className="card-img-top" alt="..."></img>
          </div>
          <div className="card-body manager-card-body">
            <div id="email-field">
              {" "}
              <input
                class="form-control"
                type="text"
                value="email"
                aria-label="Disabled input example"
                disabled
                readonly
              ></input>
             
            </div>
            <div id="username-field">
              <input
                class="form-control"
                type="text"
                value="username"
                aria-label="Disabled input example"
                disabled
                readonly
              ></input>
              
            </div>
            <div id="passowrd-field">
              <input
                class="form-control"
                type="text"
                value="password"
                aria-label="Disabled input example"
                disabled
                readonly
              ></input>
            </div>
          </div>
          <div id="card-footer">
            {" "}
            <button className="btn btn-primary manager-card-btn">
              <img src="/save.png" alt="save icon"></img>
            </button>
            <button className="btn btn-primary manager-card-btn">
              <img src="/delete.png" alt="save icon"></img>
            </button>
            <button className="btn btn-primary manager-card-btn">
              <img src="/edit.png" alt="save icon"></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
