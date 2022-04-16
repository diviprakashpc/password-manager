import React,{useState} from "react";
import "./manager.css";
import Navbar from "../Navbar/navbar";
import ManagerCard from "../ManagerCard/Card";
import AddCard from "../AddCard/AddCard";
import { useContext } from "react";
import { currentUser, setsLoginUser } from "../../App";
const Manager = () => {
  const user = useContext(currentUser);
  const setLoginUser = useContext(setsLoginUser);
 
  const [cardList, setCardList] = useState(user.list);
  // console.log("Initial List of user",user.list,"cardList intial",cardList.length);
  // console.log("user at manager", user);
  return (
    <>
      <div id="manager">
        <section id="manager-section1">
          <Navbar />
        </section>
        <section id="manager-section2">
          <div id="manager-cards">
            <div className="row manager-card-row">
              {cardList.splice(0).reverse().map((key,index) => {
                return (
                  <div className="col-lg-15">
                    <ManagerCard email={key.email} website={key.website} password={key.password} />
                  </div>
                );
              })}
            </div>
          </div>
          <div id="manager-add-card">
            <AddCard setCardList={setCardList} />
          </div>
        </section>
        <section id="manager-section3">
          <button className="btn btn-primary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </section>
      </div>
    </>
  );
};

export default Manager;
