import React from "react";
import { useContext,useState } from "react";
import "./AddCard.css";
import { currentUser, setsLoginUser } from "../../App";
import Axios from "axios";
const AddCard = () => {
  const user = useContext(currentUser);
  const [item, setItem] = useState({
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    console.log("Item created",item);
    const {name,value} = e.target;
    setItem({
      ...item,
      [name]:value
    });
    
  };
  const addPassword = () => {
    const {email,username,password} = item;
    if(email&&username&&password){
        Axios.post("http://localhost:9002/additem",{user,item})
        .then((res)=>{
          alert(res.data.message)
        })
        .catch((error)=>{
          console.log("Error occured while adding",error);
        })
    }
    else{
      alert("Invalid Request")
    }
  };
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
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="form-group form-group-add-password">
              <input
                type="text"
                className="form-control"
                name="username"
                aria-describedby="emailHelp"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group form-group-add-password">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />
            </div>
          </form>
          <button className="btn btn-primary" onClick={addPassword}>
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCard;
