export const filterByDiet = (diet, array) => {
  let result = array.filter((e) => e["diets"].includes(diet));
  return result;
};

export const filterByOrigin = (origin, array) => {
  let result;
  if (origin === "db") {
    result = array.filter((e) => /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g.test(e["id"]));
    return result;
  }
  
  if (origin === "api") {
    result = array.filter((e) => /^([0-9]{6,10})$/g.test(e["id"]))
    return result
  }
};