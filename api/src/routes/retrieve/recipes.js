const router = require("express").Router();
const Sequelize = require("sequelize");
const { Recipe, Diet } = require("../../db");
const { allAPI, recipeName } = require("../../utils/recipesCalls");
const { dietIndexer } = require("../controllers/dietIndexer");
const Op = Sequelize.Op;
const RecipeFormater = require("../controllers/FormatRecipe");

router.get("/", async function (req, res) {
  if (!req.query.name) {
    //verifica si hay query, si no busca todas las recetas
    try {
      let dbResult = await Recipe.findAll({
        include: [{ model: Diet, through: { attributes: [] } }],
      });

      let dbFormated = [];
      dbResult.map((e) => {
        let diets = e["diets"];
        let formated = [];
        diets.map((d) => formated.push(d["name"]));
        let obj = RecipeFormater(
          e.id,
          e.name,
          e.healthScore,
          e.image,
          formated
        );
        dbFormated.push(obj);
      });

      let apiResult = await allAPI(); //buscando en la API
      if (apiResult === null)
        return res.status(404).json({ message: "key over-used" });

      dietIndexer(apiResult); //agregando recetas desde la base de datos
      let total = dbFormated.concat(apiResult); //contando el total de recetas --> api+db

      //en caso que no haya recetas con ese nombre
      if (total.length === 0)
        res.status(400).json({
          message:
            "Can't find nothing... there are some problem with the API connection",
        });
      res.status(200).json(total);
    } catch (error) {
      console.log("error in get from api");
      res.status(404).send({ error: "Can't reach API resources" });
    }
  } else {        // ##############################################################################################
    let { name } = req.query; //siempre valor a buscar sera valido por que se verifica en el front
    try {
      let dbResult = await Recipe.findAll({
        //buscando en DB
        where: { name: { [Op.like]: `%${name}%` } },
        include: [
          { model: Diet, attributes: ["name"], through: { attributes: [] } },
        ],
      });

      let dbFormated = []; // formateando la respuesta
      dbResult.map((e) => {
        let diets = e["diets"];
        let formated = [];
        diets.map((d) => formated.push(d["name"]));
        let obj = RecipeFormater(
          e.id,
          e.name,
          e.healthScore,
          e.image,
          formated
        );
        dbFormated.push(obj);
      });

      let apiResult = await recipeName(name); //buscando en la API
      if (apiResult == null) return res.json({ message: "key over-used" });

      dietIndexer(apiResult); //agregando recetas desde la base de datos
      let total = dbFormated.concat(apiResult); //contando el total de recetas --> api+db
      if (total.length === 0)
        //en caso que no haya recetas con ese nombre
        res.json({
          message: "Can't find nothing... Are you sure the spelling is right?",
        });
      res.status(200).json(total);
    } catch (error) {
      console.log("error getting by 'recipe name'");
      res.status(402).send({error: error.message});
    }
  }
});

module.exports = router;
