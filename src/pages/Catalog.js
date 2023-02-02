import Container from "react-bootstrap/esm/Container.js";
import uniqid from "uniqid";
import { useSelector } from "react-redux";

function Catalog() {
  const exerciseList = useSelector((state) => state.workouts.catalog);
  return (
    <Container className="d-flex flex-column justify-content-start">
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
    </Container>
  );
}

export default Catalog;
