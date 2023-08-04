import React from "react";
import { useSelector } from "react-redux";
import { setPageRef } from "../../redux/actions";
import { BtnTemp } from "../../components";
import "./pag.css";

const Pagination = () => {
  const pageRef = useSelector((state) => state.pageReference);
  const recipes = useSelector((state) => state.recipesLoaded);
  const total = recipes.length;
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(total / 9); i++) {
    pageNumbers.push(i+1);
  }

  if (recipes.length > 1) {
    return (
      <div className="ff__pag-container">
        {pageRef <= 0 ? (
          ""
        ) : (
          <BtnTemp value={"Prev"} action={setPageRef} arg={pageRef - 1} />
        )}
        <div className="ff__pag-btn">
          {pageNumbers.map((number) => (
            <BtnTemp
              style={pageRef === number-1 ? "ff__pag-active" : ""}
              value={number}
              action={setPageRef}
              arg={number-1}
              key={number}
            />
          ))}
        </div>
        {!(pageRef * 9 + 9 > recipes.length) && (
          <BtnTemp value={"Next"} action={setPageRef} arg={pageRef + 1} />
        )}
      </div>
    );
  } else return null;
};

export default Pagination;
