import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, SearchBar, Menu } from "../../components";
import { getRecipes, getTypes } from "../../redux/actions";
import { Cards } from "../../pages";
import "./home.css";

const Home = () => {
  const preLoad = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes(preLoad));
    dispatch(getTypes());
  }, [dispatch]);

  const reference = useSelector((state) => state.reference);
  const recipesUnfiltered = useSelector((state) => state.recipesUnfiltered);
  const loading = useSelector((state) => state.loading);

  const msg = (
    <span>
      Enter some <strong>ingredient</strong> or press the{" "}
      <strong>Search</strong> button
    </span>
  );

  const looked = reference.charAt(0).toUpperCase() + reference.slice(1);

  let title =
    reference === ""
      ? msg
      : `You're looking for recipes that contains ${looked}`;

  return (
    <div className="ff__home">
      <div className="ff__home-container">
        <div className="ff__home-searchbar">
          <p>{title}</p>
          <SearchBar />
        </div>
        {recipesUnfiltered?.length > 0 ? (
          <>
            <div className="ff__home-heading">
              <Menu />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="ff__home-results">
        {recipesUnfiltered.length !== 0 && !loading ? (
            <div className="ff__home-cards">
              <Cards />
            </div>
          ) : <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Home;
