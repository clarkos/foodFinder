import React from "react";
import useHistoryDistpatch from "../../hooks/useHistoryDispatch";
import { useSelector } from "react-redux";
import { clearFilters, filterDiet, filterOrigin } from "../../redux/actions";
import { BtnTemp } from "../../components";
import "./filter.css";

export const DietsFilter = ({ diet }) => {
  const [history, dispatch] = useHistoryDistpatch();
  const filter = () => {
    dispatch(filterDiet(diet));
    history.push("/home");
  };
  return <button onClick={filter}>{diet}</button>;
};

export const OrigFilter = ({origin}) => {
  const [history, dispatch] = useHistoryDistpatch();
  const filter = () => {
    dispatch(clearFilters());
    dispatch(filterOrigin(origin));
    history.push("/home");
  };
  return <button onClick={filter}>{origin}</button>;
};

export const ClearFilters = () => {
  return (
    <div>
      <BtnTemp action={clearFilters} value="Clear Filters" />
    </div>
  );
};

export const NoResults = () => {
  return (
    <div>
      <h1>No results</h1>
      <ClearFilters />
    </div>
  );
};

export const NoResSearch = () => {
  const reference = useSelector(state => state.reference)
  return (
      <div>
          <h1>No {reference} recipes found </h1>
      </div>
  )
}


/* 
createDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
*/