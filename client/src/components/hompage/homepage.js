import React from "react";
import "./homepage.css";

import Content from "../../utils/content/content";
import Card from "../card/card";
import Manager from "../manager/manager";
import Generator from "../Generator/generator";
const Homepage = ({ setLoginUser }) => {
  return (
    <>
      <div className="homepage">
        <div id="section1">
          <div id="heading">
            <h1>Homepage</h1>
          </div>
          <div>
            <p id="content">
              <Content />
            </p>
          </div>
        </div>
        <div id="section2">
          <Card
            source="https://www.101computing.net/wp/wp-content/uploads/password.png"
            alternate="Manager Image"
            setLoginUser={setLoginUser}
            text="Manager"
            description="Manage your passwords"
            path="manager"
            
          />
          <Card
            source="https://media.istockphoto.com/photos/password-management-weak-and-strong-password-picture-id840534924?k=20&m=840534924&s=612x612&w=0&h=mxsMLXFebd2io3DirjQQL2ulob9JOLmW-5C9RONdsIw="
            alternate="Generator Image"
            setLoginUser={setLoginUser}
            text="Generator"
            description="Generate a random password to stay secured."
            path="generator"
          
          />
          {/* <Card
            source="https://cdn-icons.flaticon.com/png/512/3177/premium/3177407.png?token=exp=1648821597~hmac=df56d159d80b1c6450eb4eae54fa9afa"
            alternate="log out Image"
            setLoginUser={setLoginUser}
            text="Logout"
            description="Goodbye,See you later!"
          /> */}
          <Card
            source="https://media.istockphoto.com/photos/password-management-weak-and-strong-password-picture-id840534924?k=20&m=840534924&s=612x612&w=0&h=mxsMLXFebd2io3DirjQQL2ulob9JOLmW-5C9RONdsIw="
            alternate="CaseStudies Image"
            setLoginUser={setLoginUser}
            text="Case Studies"
            description="Studies on Cryptic Algorithms"
            path="/casestudies"
           
          />
        </div>

        <footer id="section3">
          {/* <span id="copyright">@DP Projects</span> */}
          <div className="btn btn-primary" id="logout">
            Log out
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;

{
  /* <div id="buttons">
     <div className="button" onClick={() => setLoginUser({})}>
        Manager
      </div>
      <div className="button" onClick={() => setLoginUser({})}>
        Generator
      </div>
      <div className="button" onClick={() => setLoginUser({})}>
        Logout
      </div>
     </div> */
}
