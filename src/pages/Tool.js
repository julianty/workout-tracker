import Workout from "../components/Workout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
    // Object.values(data).forEach((session) => {
    //   sessions.push(<Workout workoutData={session} key={uniqid()}></Workout>);
    // });
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
      <Row className="mt-2">{generateWorkoutDOM()}</Row>
      <Row className="mt-2">
        <Col className="col-3">
          <Button onClick={addWorkout}>Add workout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Tool;
