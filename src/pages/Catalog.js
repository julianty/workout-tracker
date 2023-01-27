import Container from "react-bootstrap/esm/Container.js";
import exercises from "../data/exercises.js";
import uniqid from "uniqid";

function fetchData() {
  // TODO fetch data from firestore
  return exercises.data;
}
function Catalog() {
  let exerciseList = fetchData();
  return (
    <Container className="d-flex flex-column justify-content-start">
      {exerciseList.map((exercise) => {
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
            {/* {exercise.muscles.map((muscle) => (
              <div key={uniqid()} className="ms-3">
                <p>{muscle}</p>
              </div>
            ))} */}
          </Container>
        );
      })}
    </Container>
  );
}

export default Catalog;
