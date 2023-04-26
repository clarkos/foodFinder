
describe('RecipeParser_function', () => {

  // Tests that the function returns an object with the correct properties and values when valid inputs are provided.  
  it("test_valid_inputs",() => {
      const id = 1;
      const name = "Pasta Carbonara";
      const healthScore = 90;
      const image = "https://www.example.com/pasta.jpg";
      const diets = ["Italian", "Gluten-free"];

      const recipe = RecipeParser(id, name, healthScore, image, diets);

      expect(recipe).toEqual({
          id: id,
          name: name,
          image: image,
          healthScore: healthScore,
          diets: diets
      });
  });

  // Tests that the RecipeParser function correctly creates an object with the required parameters and default value for diets. 
  it("test_required_params_only", () => {
      // Define the required parameters for the RecipeParser function
      const id = 2;
      const name = "Tiramisu";
      const healthScore = 8;

      // Call the RecipeParser function with the required parameters
      const recipe = RecipeParser(id, name, healthScore, "https://www.example.com/tiramisu.jpg");

      // Assert that the returned object has the correct properties and values
      expect(recipe).toEqual({
          id: id,
          name: name,
          image: "https://www.example.com/tiramisu.jpg",
          healthScore: healthScore,
          diets: undefined
      });
  });

  // Tests that the function throws an error when required parameters (id, name, image) are missing or invalid. 
  it("test_missing_required_params", () => {
      expect(() => RecipeParser(null, "Pizza", 80, "https://www.example.com/pizza.jpg")).toThrow();
      expect(() => RecipeParser(3, null, 70, "https://www.example.com/pizza.jpg")).toThrow();
      expect(() => RecipeParser(4, "Burger", 60, null)).toThrow();
  });

  // Tests that the function handles invalid or missing inputs for optional parameters (healthScore, diets) gracefully. 
  it("test_invalid_optional_params", () => {
      const recipe = RecipeParser(5, "Salad", "not a number", "https://www.example.com/salad.jpg", ["Vegetarian"]);
      expect(recipe).toEqual({
          id: 5,
          name: "Salad",
          image: "https://www.example.com/salad.jpg",
          healthScore: NaN,
          diets: ["Vegetarian"]
      });
  });

  // Tests that the function returns an object with the correct properties and values even if optional parameters (healthScore, diets) are not provided. 
  it("test_missing_optional_params", () => {
      const recipe = RecipeParser(6, "Steak", null, "https://www.example.com/steak.jpg");
      expect(recipe).toEqual({
          id: 6,
          name: "Steak",
          image: "https://www.example.com/steak.jpg",
          healthScore: null,
          diets: undefined
      });
  });

  // Tests that the function can handle a large number of diets. 
  it("test_large_number_of_diets", () => {
      const diets = [];
      for (let i = 0; i < 10; i++) {
          diets.push(`Diet ${i}`);
      }
      const recipe = RecipeParser(7, "Soup", 50, "https://www.example.com/soup.jpg", diets);
      expect(recipe.diets.length).toBe(10);
  });
});
