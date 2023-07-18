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
  Badge,
} from "react-bootstrap/";
import AddExerciseToCatalogForm from "../components/AddExerciseToCatalogForm";
import CatalogedExercise from "../components/CatalogedExercise";
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
        <ListGroup>
          {Object.values(exerciseList).map((exercise) => {
            return (
              <CatalogedExercise
                key={uniqid()}
                exerciseName={exercise.name}
                muscles={exercise.muscles}
              />
            );
          })}
        </ListGroup>
      </Row>
    </Container>
  );
}

export default Catalog;
