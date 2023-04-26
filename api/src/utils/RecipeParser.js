const RecipeParser = function (id, name, healthScore, image, diets) {
  let obj = {
    id,
    name,
    healthScore,
    image,
    diets,
  };

  return obj;
};

module.exports = RecipeParser;
