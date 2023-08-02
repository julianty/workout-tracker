import { ListGroupItem, Badge, Button } from "react-bootstrap";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import MuscleTag from "./MuscleTag";
import uniqid from "uniqid";
import { muscleGroups } from "../data/muscleGroups";

export default function CatalogedExercise({ exerciseName, muscles }) {
  // exerciseName: string
  // e.g. "Sumo Deadlift"
  // muscles: Array of strings containing muscles
  // e.g. ["Quadriceps", "Pectorals"]

  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [musclesInvolved, setMusclesInvolved] = useState(muscles);

  function handleClick() {
    // Enter edit mode
    setEditMode(true);
  }
  function handleClickMuscleTag(muscleName) {
    // Called when any muscle tag is clicked in edit mode, it deletes the
    // muscle in the musclesInvolved array. It does not save changes.
    // Changes are saved onSubmit.

    setMusclesInvolved((musclesInvolved) => {
      return musclesInvolved.filter((listMuscle) => listMuscle !== muscleName);
    });
  }
  function onSubmit(values) {
    // Inputs: values = {newExerciseName: <user input string>}
    // Outputs: none
    // dispatches an action to upload changes to the Firestore

    console.log("Changes submitted");
    const payload = values;
    console.log(musclesInvolved);
    payload["muscles"] = musclesInvolved;
    payload["exerciseName"] = exerciseName;
    dispatch({ type: "workouts/updateExerciseInCatalog", payload: payload });
    setEditMode(false);
  }

  function musclesOnChangeHandler(e) {
    e.preventDefault();
    setMusclesInvolved((oldArr) => [...oldArr, e.target.value]);
  }
  if (editMode) {
    return (
      <ListGroupItem>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="d-flex align-items-center"
              >
                <label className="m-1">Exercise Name:</label>
                <Field
                  name="updatedExerciseName"
                  component="input"
                  type="text"
                  defaultValue={exerciseName}
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
                <Button type="submit" size="sm" className="ms-auto">
                  Save Changes
                </Button>
              </form>
            );
          }}
        ></Form>

        {musclesInvolved.map((muscle) => {
          return (
            <MuscleTag
              muscleGroup={muscle}
              key={uniqid()}
              editMode={editMode}
              onClick={handleClickMuscleTag}
            />
          );
        })}
      </ListGroupItem>
    );
  } else {
    return (
      <ListGroupItem className="d-flex">
        <div className="text-body mx-1">{exerciseName}:</div>
        {musclesInvolved.map((muscle) => {
          return (
            <MuscleTag
              muscleGroup={muscle}
              key={uniqid()}
              editMode={editMode}
            />
          );
        })}
        <Badge onClick={handleClick} pill bg="secondary" className="ms-auto">
          edit
        </Badge>
      </ListGroupItem>
    );
  }
}
