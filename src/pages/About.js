import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function About() {
  return (
    <Container>
      <h1>About Page</h1>
      <Row>
        <Col>
          This tool is meant as a easy way to track my workouts and hopefully
          act as a tool to help create workout plans in the future.
        </Col>
      </Row>
    </Container>
  );
}

export default About;
