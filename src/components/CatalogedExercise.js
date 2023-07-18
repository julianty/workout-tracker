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
              <form onSubmit={handleSubmit}>
                <label>Exercise Name:</label>
                <Field
                  name="updatedExerciseName"
                  component="input"
                  type="text"
                  defaultValue={exerciseName}
                />
                <label>Muscles</label>
                <Field
                  name="muscles"
                  component="input"
                  type="text"
                  defaultValue={muscles.join(", ")}
                ></Field>
                <Button type="submit" size="sm">
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
      <ListGroupItem>
        {exerciseName}: {muscles.join(", ")}
        <Badge onClick={handleClick} pill bg="secondary">
          edit
        </Badge>
      </ListGroupItem>
    );
  }
}
