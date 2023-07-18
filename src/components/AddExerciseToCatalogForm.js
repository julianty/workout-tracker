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
              component="input"
              type="text"
              placeholder="Quadriceps, Pectorals, Triceps"
            ></Field>
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
