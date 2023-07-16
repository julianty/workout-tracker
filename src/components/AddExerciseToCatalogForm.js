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
            <Row>
              <Col md="auto">
                <label>Exercise Name</label>
              </Col>
              <Col md="auto">
                <Field
                  name="exerciseName"
                  component="input"
                  type="text"
                  placeholder="Barbell Squat"
                />
              </Col>
              <Col md="auto">
                <label>Muscles Involed {"(separate with commas)"}</label>
              </Col>
              <Col md="auto">
                <Field
                  name="muscles"
                  component="input"
                  type="text"
                  placeholder="Quadriceps, Pectorals, Triceps"
                />
              </Col>
              <Col md="2">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </form>
        );
      }}
    ></Form>
  );
}

export default AddExerciseToCatalogForm;
