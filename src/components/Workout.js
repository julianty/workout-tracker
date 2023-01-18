import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Exercise(props) {
  return (
    <Row>
      <Col>{props.exercise}</Col>
      <Col>{props.sets}</Col>
      <Col>{props.reps}</Col>
      <Col>{props.weight}</Col>
    </Row>
  );
}

function WorkoutHeading() {
  return (
    <Row>
      <Col>Exercise</Col>
      <Col>Sets</Col>
      <Col>Reps</Col>
      <Col>Weight</Col>
    </Row>
  );
}

function Workout(props) {
  const data =
    props.workoutData !== undefined
      ? props.workoutData
      : {
          exercise: "",
          sets: "",
          weight: "",
        };
  console.log(data);
  return (
    <Container>
      <h4>
        {data.timestamp === undefined
          ? ""
          : data.timestamp.toDate().toDateString()}
      </h4>
      <WorkoutHeading />
      <Exercise
        exercise={data.exercise}
        sets={data.sets}
        reps={data.reps}
        weight={data.weight}
      />
    </Container>
  );
}

export default Workout;
