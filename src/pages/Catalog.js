import Container from "react-bootstrap/esm/Container.js";
import uniqid from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, FormLabel } from "react-bootstrap/";
import { Form, Field } from "react-final-form/";
function Catalog() {
  const exerciseList = useSelector((state) => state.workouts.catalog);
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    // console.log(values);
    // Need to add some form validation here
    dispatch({ type: "workouts/addExerciseToCatalog", payload: values });
  };
  return (
    <Container className="d-flex flex-column justify-content-start">
      <Row>Add an exercise to the catalog</Row>
      <Row>
        <Col>
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
        </Col>
      </Row>
      <Row>
        {Object.values(exerciseList).map((exercise) => {
          return (
            <Container
              key={uniqid()}
              className="d-flex flex-column"
              style={{ textAlign: "left" }}
            >
              <h3>{exercise.name}</h3>
              <div className="d-flex align-items-center ms-3">
                <div>Muscles involved: {exercise.muscles.join(", ")}</div>
              </div>
            </Container>
          );
        })}
      </Row>
    </Container>
  );
}

export default Catalog;
