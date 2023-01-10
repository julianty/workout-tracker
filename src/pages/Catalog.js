import Container from "react-bootstrap/esm/Container.js";
import exercises from "../data/exercises.js";

function fetchData() {
  return exercises.data;
}
function Catalog() {
  let exerciseList = fetchData();
  console.log(exerciseList);
  return (
    <Container className="d-flex flex-column justify-content-start">
      {exerciseList.map((exercise) => {
        return (
          <Container
            className="d-flex flex-column"
            style={{ textAlign: "left" }}
          >
            <h1>{exercise.name}</h1>
            {exercise.muscles.map((muscle) => (
              <div className="ms-3">
                <h3>{muscle}</h3>
              </div>
            ))}
          </Container>
        );
      })}
    </Container>
  );
}

export default Catalog;
