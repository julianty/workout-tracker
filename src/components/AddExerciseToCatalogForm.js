import { Form, Field } from "react-final-form";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
function AddExerciseToCatalogForm() {
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    // Need to add some form validation here
    dispatch({ type: "workouts/addExerciseToCatalog", payload: values });
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mx-2">Exercise Name</label>
              <Field
                name="exerciseName"
                component="input"
                type="text"
                placeholder="Barbell Squat"
              />
            </div>
            <div>
              <label>Muscles Involed</label>
              <Field
                name="muscles"
                component="input"
                type="text"
                placeholder="Quadriceps, Pectorals, Triceps"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        );
      }}
    ></Form>
  );
}

export default AddExerciseToCatalogForm;
