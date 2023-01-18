import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Exercise(props) {
  const exerciseData = props.exerciseData;
  return (
    <Row>
      <Col>{exerciseData.exercise}</Col>
      <Col>{exerciseData.sets}</Col>
      <Col>{exerciseData.reps}</Col>
      <Col>{exerciseData.weight}</Col>
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
  const data = props.workoutData;
  const timestamp = new Date(data.timestamp);
  const exercisesArr = data.exercises;
  return (
    <Container>
      <h4>{timestamp.toDateString()}</h4>
      <WorkoutHeading />
      {exercisesArr.map((exerciseData) => (
        <Exercise exerciseData={exerciseData} />
      ))}
      <Button>Add exercise</Button>
    </Container>
  );
}

export default Workout;
