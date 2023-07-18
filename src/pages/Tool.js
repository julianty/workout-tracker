import Workout from "../components/Workout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";

// Read data from database to populate tool

function Tool(props) {
  const firestoreData = useSelector((state) => state.workouts.sessions);
  const dispatch = useDispatch();
  function addWorkout() {
    dispatch({ type: "workouts/addWorkout" });
  }

  function generateWorkoutDOM(data = firestoreData) {
    let sessions = [];
    for (const [sessionName, session] of Object.entries(data)) {
      sessions.push(
        <Workout
          name={sessionName}
          workoutData={session}
          key={uniqid()}
        ></Workout>
      );
    }
    return sessions;
  }

  return (
    <Container>
      <Row className="">{generateWorkoutDOM()}</Row>
      <Row className="">
        <Col className="col-3">
          <Button onClick={addWorkout}>Add workout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Tool;
