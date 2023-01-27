import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function Home() {
  return (
    <Container>
      <h1>Home Page</h1>
      <Row>
        <Col>
          Welcome to the workout tracker I've been working on. Please let me
          know if you have any feature suggestions, bugs you encouter, layout
          improvements etc.
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
