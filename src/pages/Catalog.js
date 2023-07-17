import Container from "react-bootstrap/esm/Container.js";
import uniqid from "uniqid";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  FormLabel,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap/";
import AddExerciseToCatalogForm from "../components/AddExerciseToCatalogForm";
function Catalog() {
  const exerciseList = useSelector((state) => state.workouts.catalog);
  return (
    <Container className="d-flex flex-column justify-content-start">
      <Row>Add an exercise to the catalog</Row>
      <Row>
        <Col>
          <AddExerciseToCatalogForm />
        </Col>
      </Row>
      <Row>
        {/* {Object.values(exerciseList).map((exercise) => {
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
        })} */}
        <ListGroup>
          {Object.values(exerciseList).map((exercise) => {
            return (
              <ListGroupItem key={uniqid()}>
                {exercise.name}: {exercise.muscles.join(", ")}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Row>
    </Container>
  );
}

export default Catalog;
