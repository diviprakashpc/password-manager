import React, { useState } from "react";
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
  const [page, setPage] = useState(0);
  // console.log("Initial List of user",user.list,"cardList intial",cardList.length);
  // console.log("user at manager", user);
  //90-99(range of index of element)->9(page)
  //100-109->10
  //180-189->18
  return (
    <>
      <div id="manager">
        <section id="manager-section1">
          <Navbar />
        </section>
        <section id="manager-section2">
          <div id="manager-cards">
            <div className="row manager-card-row">
              {cardList
                .slice(0)
                .reverse()
                .slice(page * 10, (page + 1) * 10)
                .map((key, index) => {
                  return (
                    <div className="col-lg-15">
                      <ManagerCard
                       index = {index}
                        email={key.email}
                        website={key.website}
                        password={key.password}
                      />
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
          <button
            className="btn btn-primary"
            onClick={() => {
              if (page - 1 < 0) {
                alert("No page exist below 0,Sorry Mate");
              } else setPage(page - 1);
            }}
          >
            Prev
          </button>
          <div id="page-no">{page}</div>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (cardList.length > (page + 1) * 10) {
                setPage(page + 1);
              } else {
                alert("Sorry mate,nothing ahead");
              }
            }}
          >
            Next
          </button>
        </section>
      </div>
    </>
  );
};

export default Manager;
