const router = require("express").Router();
const { Recipe, Diet } = require("../../db");
const { recipeId } = require("../../utils/recipesCalls");

router.get("/:id/", async function (req, res) {
  try {
    let { id } = req.params;

    if (
      id.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      )
    ) {
      let dbResult = await Recipe.findOne({
        //busqueda en la base de datos
        where: { id: id },
        include: [
          { model: Diet, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      if (dbResult === null)
        return res.json({
          message: "Can't find nothing... The ID is correct?", //envia mensaje si no encuentra resultados
        });

      let formated = [];
      dbResult.diets.map((e) => formated.push(e["name"]));

      let obj = {
        id: dbResult["id"],
        name: dbResult["name"],
        image: dbResult["image"],
        diets: formated,
        summary: dbResult["summary"],
        healthScore: dbResult["healthScore"],
        steps: dbResult["steps"],
        dishTypes: dbResult["dishTypes"],
      };

      return res.json(obj);
    } else {
      //Busqueda en la API
      let apiResult = await recipeId(id);
      return apiResult.length === 0
        ? res.json({ message: "error getting by 'ID'" })
        : res.json(apiResult);
    }
  } catch (error) {
    console.log("error looking for ID", error.message);
    res.status(402).send({error: error.message});
  }
});

module.exports = router;
