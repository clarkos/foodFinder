import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ name, img, id, diets, healthScore }) => {
  return (
    <div className="ff__recipeCard">
      <div className="ff__recipeCard-card">
        <img src={img} alt={name} />
        <p className="ff__recipeCard-score">{healthScore}</p>
        <Link to={`/recipe/${id}`}>
          <p>{name}</p>
        </Link>
        <div className="ff__recipeCard-info">
          <ul>
            {diets.length === 0
              ? "There has no diets associated"
              : diets.map((e) => <li key={diets.indexOf(e)}>{e}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
