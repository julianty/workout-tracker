import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Exercise() {
  return (
    <Row>
      <Col>Exercise 1</Col>
      <Col>1</Col>
      <Col>12</Col>
      <Col>100</Col>
    </Row>
  );
}

function WorkoutHeading() {
  return (
    <Container>
      <Row>
        <Col>Exercise</Col>
        <Col>Sets</Col>
        <Col>Reps</Col>
        <Col>Weight</Col>
      </Row>
      <Exercise />
    </Container>
  );
}

function Workout(props) {
  return (
    <Container>
      <h4>{props.date}</h4>
      <WorkoutHeading />
    </Container>
  );
}

export default Workout;
