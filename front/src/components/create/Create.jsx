import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRecipe } from "../../redux/actions";
import useDiets from "../../hooks/useDiets";
import "./create.css";

const Create = () => {
  const stepModel = ["", ""];
  const initialState = {
    name: "",
    summary: "",
    score: 0,
    healthScore: 0,
    steps: ["", []],
    diets: [],
  };

  const dietsLoaded = useDiets(); //gets diets on mount
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [submission, setSubmission] = useState(initialState);
  const [part, setPart] = useState(["", [[...stepModel]]]);
  const [errors, setErrors] = useState({});

  const addStep = () => {
    let step = [...part];
    step[1].push([...stepModel]);
    setPart(step);
  };

  const removeStep = () => {
    let step = [...part];
    if (step[1].length > 1) {
      step[1].pop();
    }
    setPart(step);
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSubmission({
        ...submission,
        diets: [...submission.diets, e.target.name],
      });
    } else {
      setSubmission({
        ...submission,
        diets: [...submission.diets].filter((diet) => e.target.name !== diet),
      });
    }
  };

  const handleInstrucctions = (e) => {
    let { value, name, id } = e.target;
    let step = [...part];
    if (name === "Title") {
      step[0] = value;
    } else {
      let num = Number(id) + 1;
      step[1][id] = [num.toString(), value];
    }
    setPart([...step]);
  };

  const handleSubmissionChange = (e) => {
    setSubmission({
      ...submission,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...submission,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      JSON.stringify(errors) !== "{}" ||
      submission.name === "" ||
      submission.score === "" ||
      submission.healthScore === "" ||
      submission.summary === "" ||
      submission.diets.length === 0
    ) {
      alert(
        "Some fields are empty or has incorrect information, please check it"
      );
    } else {
      submission.steps = [[...part]]; //agrego los pasos
      dispatch(postRecipe(submission)); //envio el objeto al back
      setDone(true); // establesco el estado de finalizacion

      // reinicializo los estados temporales
      setErrors({});
      setSubmission({ ...initialState });
      setPart(["", [[...stepModel]]]);
    }
  };

  const Thanks = ({ setDone }) => {
    return (
      <div className="ff__create-create_done">
        <h1>Thanks for Submitting</h1>
        <br /> <br />
        <div className="ff__create-btn_container">
          <button onClick={() => setDone(false)}>
            Do you have another one?
          </button>
          {"             "}
          <Link to="/home">
            <button>Return to Home</button>
          </Link>
        </div>
      </div>
    );
  };

  const validate = (form) => {
    let valueError = {};
    if (form.name) {
      if (!/([a-zA-Z](\s*[a-zA-Z]+)+)/gs.test(form.name)) {
        valueError.name = "only letters allowed";
      }
    }

    if (form.score) {
      if (!/^[1-9][0-9]?$|^100$/g.test(form.score)) {
        valueError.score = "The users score must be between 0 and 100";
      }
    }

    if (form.healthScore) {
      if (!/^[1-9][0-9]?$|^100$/g.test(form.healthScore)) {
        valueError.healthScore = "The Health Score must be between 0 and 100";
      }
    }

    if (form.summary) {
      if (!/^[\s\S]{10,255}$/gm.test(form.summary))
        valueError.summary = "Please input at least 10 characters";
    }

    if (part[1][0] === "") {
      valueError.steps =
        "Please, type some Instructions... otherwise, how we can taste it?";
    }

    if (submission.diets.length === 0) {
      valueError.diets = "You mus select at least one or two diets";
    }

    return valueError;
  };

  return (
    <div className="ff__create-container">
      {done ? (
        <Thanks setDone={setDone} />
      ) : (
        <div className="ff__newRecipe-main_container">
          <div className="ff__newRecipe-header">
            <h1>Submit your own recipe!</h1>
          </div>
          <form
            className="ff__newRecipe-form_container"
            onSubmit={handleSubmit}
            name="newRecipe"
          >
            <div className="ff__newRecipe-form_recipe-info">
              <div className="ff__newRecipe-form-recipe_mainInfo">
                {errors.name && <p className="danger">{errors.name}</p>}
                <input
                  type="text"
                  className="ff__newRecipe-form-recipe_mainInfo-title"
                  placeholder="Name your recipe *"
                  name="name"
                  id="name"
                  value={submission.name}
                  onChange={handleSubmissionChange}
                />
                <div className="ff__newRecipe-form-recipe_mainInfo-scores">
                  <div className="ff__newRecipe-form-recipe_scores">
                    <label htmlFor="score">Users Score</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      onChange={handleSubmissionChange}
                      value={submission.score}
                      name="score"
                      id="score"
                    />
                  </div>
                  <div className="ff__newRecipe-form-recipe_scores">
                    <label htmlFor="healthScore">Health Score</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      onChange={handleSubmissionChange}
                      value={submission.healthScore}
                      name="healthScore"
                      id="healthScore"
                    />
                  </div>
                  {errors.score && <p className="danger">{errors.score}</p>}
                  {errors.healthScore && <p className="danger">{errors.healthScore}</p>}
                </div>
              </div>

              <div className="ff__newRecipe-form-recipe_summary">
                <label htmlFor="summary">
                  Can you tell us something about this recipe?
                </label>
                {errors.summary && <p className="danger">{errors.summary}</p>}
                <textarea
                  type="text"
                  placeholder="Summary *"
                  name="summary"
                  id="summary"
                  rows="15"
                  value={submission.summary}
                  onChange={handleSubmissionChange}
                />
              </div>
            </div>

            <div className="ff__newRecipe-form_diets">
              <p>Select in which diet type it's alowed {errors.diets && <span className="danger">{errors.diets}</span>}</p>
              
              <div className="ff__newRecipe-form_diets-container" id="diets">
                {dietsLoaded.length > 0 &&
                  dietsLoaded.map((diet, index) => (
                    <div key={index} className="ff__newRecipe-form_diets-group">
                      <input
                        key={diet.ID + diet.name}
                        id={diet.ID}
                        type="checkbox"
                        name={diet.name}
                        onChange={handleCheckboxChange}
                        onClick={handleSubmissionChange} //agrego mary
                      />
                      <label htmlFor={diet.name} key={diet.ID}>
                        {diet.name}
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="ff__newRecipe-form_steps">
              <h3>Now the funny part... Can you tell us how to prepare it?</h3>
              {errors.steps && <p className="danger">{errors.steps}</p>}
              <p>Place some fancy name, just for this part...</p>
              <div className="ff__create-steps_title-insert">
                <input
                  type="text"
                  name="Title"
                  placeholder="Name the whole procedure as you want"
                  value={part[0]}
                  onChange={handleInstrucctions}
                />
              </div>

              <div className="ff__newRecipe-form_steps-insert">
                <p>
                  ... and here is where you describe each step we need to set it
                  ready...
                </p>
                <div className="ff__newRecipe-form_steps-gen">
                  <div className="ff__newRecipe-form_steps-inserted">
                    {part.map(
                      (el, i) =>
                        i !== 0 &&
                        el.map((e, i) => (
                          <input
                            key={i}
                            placeholder={`step  ${i + 1}`}
                            type="text"
                            id={i}
                            name={`step ${i}`}
                            value={e[1]}
                            onChange={handleInstrucctions}
                          />
                        ))
                    )}
                    <div className="ff__newRecipe-form_steps-buttons">
                      <button type="button" onClick={addStep}>
                        +
                      </button>
                      <button type="button" onClick={removeStep}>
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ff__newRecipe-form_submit">
              <button type="submit" id="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Create;
