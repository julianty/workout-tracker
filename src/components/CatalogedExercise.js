import { ListGroupItem, Badge, Button } from "react-bootstrap";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
export default function CatalogedExercise({ exerciseName, muscles }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  function handleClick() {
    // Enter edit mode
    setEditMode(true);
  }
  function onSubmit(values) {
    console.log("Changes submitted");
    const payload = values;
    payload["exerciseName"] = exerciseName;
    dispatch({ type: "workouts/updateExerciseInCatalog", payload: payload });
    // console.log(payload);
    setEditMode(false);
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
                  component="input"
                  type="text"
                  defaultValue={muscles.join(", ")}
                ></Field>
                <Button type="submit" size="sm" className="ms-auto">
                  Save Changes
                </Button>
              </form>
            );
          }}
        ></Form>
      </ListGroupItem>
    );
  } else {
    return (
      <ListGroupItem className="d-flex">
        <div className="text-body mx-1">{exerciseName}:</div>
        <div className="text-secondary mx-1">{muscles.join(", ")}</div>
        <Badge onclick={handleClick} pill bg="secondary" className="ms-auto">
          edit
        </Badge>
      </ListGroupItem>
    );
  }
}
