import React from "react";
import "./AddCard.css";
const AddCard = () => {
  return (
    <>
      <div className="card add-card">
        <div className="card-body">
          <h5 className="card-title">Add Password</h5>
          <form className="add-password-form">
            <div className="form-group form-group-add-password">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div className="form-group form-group-add-password">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Username"
              />
            </div>
            <div className="form-group form-group-add-password">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
          </form>
          <button className="btn btn-primary">Add Password</button>
        </div>
      </div>
    </>
  );
};

export default AddCard;
