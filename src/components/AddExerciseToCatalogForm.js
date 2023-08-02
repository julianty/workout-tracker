import { Form, Field } from "react-final-form";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import uniqid from "uniqid";
import { muscleGroups } from "../data/muscleGroups";
import MuscleTag from "./MuscleTag";
function AddExerciseToCatalogForm() {
  const dispatch = useDispatch();
  const [musclesInvolved, setMusclesInvolved] = useState([]);

  const onSubmit = async (values) => {
    // Need to add some form validation here
    const payload = {};
    payload["exerciseName"] = values.updatedExerciseName;
    payload["muscles"] = musclesInvolved;
    dispatch({ type: "workouts/addExerciseToCatalog", payload: payload });
  };

  function musclesOnChangeHandler(e) {
    e.preventDefault();
    setMusclesInvolved((oldArr) => [...oldArr, e.target.value]);
  }

  function handleClickMuscleTag(muscleName) {
    // Called when any muscle tag is clicked in edit mode, it deletes the
    // muscle in the musclesInvolved array. It does not save changes.
    // Changes are saved onSubmit.

    setMusclesInvolved((musclesInvolved) => {
      return musclesInvolved.filter((listMuscle) => listMuscle !== muscleName);
    });
  }
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <form onSubmit={handleSubmit} className="d-flex align-items-center">
            <label className="m-1">Exercise Name:</label>
            <Field
              name="updatedExerciseName"
              component="input"
              type="text"
              placeholder="Barbell Squat"
            />
            <label className="m-1">Muscles</label>
            <Field
              name="muscles"
              component="select"
              onChange={musclesOnChangeHandler}
            >
              <option value="/">Select A Muscle</option>
              {Object.values(muscleGroups).map((muscleObj) => {
                if (musclesInvolved.includes(muscleObj.name)) {
                  return;
                } else {
                  return (
                    <option key={uniqid()} value={muscleObj.name}>
                      {muscleObj.name}
                    </option>
                  );
                }
              })}
            </Field>
            {musclesInvolved.map((muscle) => {
              return (
                <MuscleTag
                  muscleGroup={muscle}
                  key={uniqid()}
                  editMode={true}
                  onClick={handleClickMuscleTag}
                />
              );
            })}
            <Button type="submit" size="sm" className="ms-auto">
              Add New Exercise
            </Button>
          </form>
        );
      }}
    ></Form>
  );
}

export default AddExerciseToCatalogForm;
