import Workout from "../components/Workout";
import Container from "react-bootstrap/Container";

// Read data from database to populate tool

function Tool() {
  return (
    <Container>
      <Workout date="Monday, January 9th" />
    </Container>
  );
}

export default Tool;
