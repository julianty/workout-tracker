import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function About() {
  return (
    <Container>
      <Row>
        <h1>About Page</h1>
      </Row>
      <Row>
        <Col>
          This tool is meant as a easy way to track my workouts and hopefully
          act as a tool to help create workout plans in the future.
        </Col>
      </Row>
      <Row>
        <Col>
          This website was built with React and uses Firebase for hosting,
          authentication, and data. I also use Redux for state management and
          bootstrap for styling.
        </Col>
      </Row>
      <Row>
        <Col>
          If you like, you can{" "}
          <a href="https://github.com/julianty/workout-tracker">
            view the project on Github
          </a>{" "}
          or visit{" "}
          <a href="https://alexanderjulianty.com">my personal website</a>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
