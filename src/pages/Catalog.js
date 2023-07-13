import Container from "react-bootstrap/esm/Container.js";
import uniqid from "uniqid";
import { useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap/";
function Catalog() {
  const exerciseList = useSelector((state) => state.workouts.catalog);
  return (
    <Container className="d-flex flex-column justify-content-start">
      <Row>Add an exercise to the catalog</Row>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control type="text" placeholder="Barbell Squat" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Muscles {"(separate with commas)"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tricep, Deltoids, Quadriceps"
              />{" "}
              {/* */}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
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
