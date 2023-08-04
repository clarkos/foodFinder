import React from "react";
import { useSelector } from "react-redux";
import { sortName, sortScore, clearFilters } from "../../redux/actions";
import { BtnTemp, ClearFilters, DietsFilter, OrigFilter } from "../index";
import "./menu.css";

const Diets = () => {
  const dietsLoaded = useSelector((state) => state.dietsLoaded);
  return (
    <div className="ff__menu-filter_dietBtn">
      {dietsLoaded.map((e) => (
        <DietsFilter key={e.ID} diet={e.name} />
      ))}
    </div>
  );
};

const Origin = () => {
  return (
    <div className="ff__menu-filter_origBtn">
      <p>Data Origin</p>
      <OrigFilter origin="api" />
      <OrigFilter origin="db" />
      <BtnTemp action={clearFilters} value="db+API" />
    </div>
  );
};

const Filter = ({
  innerLeft,
  innerRight,
  actionLeft,
  actionRight,
  argLeft,
  argRight,
  title,
}) => {
  return (
    <div className="ff__menu-filter">
      <p>{title}</p>
      <BtnTemp
        value={innerLeft}
        action={actionLeft}
        arg={argLeft}
        className="ff__menu-btn"
      />
      <BtnTemp
        value={innerRight}
        action={actionRight}
        arg={argRight}
        className="ff__menu-btn"
      />
    </div>
  );
};

const Menu = () => {
  const recipes = useSelector((state) => state.recipesLoaded);

  return (
    <div className="ff__menu-container">
      <div className="ff__menu-components">
        <p>Sort by</p>
        <div className="ff__menu-filter_field">
          <Origin />
        </div>
        <div className="ff__menu-filter_field">
          <Filter
            innerLeft={"Desc"}
            innerRight={"Asc"}
            actionLeft={sortName}
            actionRight={sortName}
            argLeft={1}
            argRight={-1}
            title={"Name"}
          />
        </div>
        <div className="ff__menu-filter_field">
          <Filter
            innerLeft={"Desc"}
            innerRight={"Asc"}
            actionLeft={sortScore}
            actionRight={sortScore}
            argLeft={-1}
            argRight={1}
            title={"Score"}
          />
        </div>
      </div>
      <div className="ff__menu-filter_diets-container">
        <p>Filter by Diets</p>
        <div className="ff__menu-filter_diets">
          <Diets />
        </div>
      </div>
      <ClearFilters />
      <p className="ff__menu-filter_results">Results: {recipes.length}</p>
    </div>
  );
};

export default Menu;
