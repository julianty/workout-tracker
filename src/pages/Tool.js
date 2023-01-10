import Workout from "../components/Workout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
// Read data from database to populate tool

function Tool(props) {
  const [testData, setTestData] = useState();

  useEffect(() => {
    const fetchData = async (db) => {
      const docRef = doc(db, "testUserData", "Workouts");
      const testDoc = await getDoc(docRef);
      if (testDoc.data() !== undefined) {
        setTestData(testDoc.data());
      }
    };
    fetchData(props.db).catch(console.err);
  }, [props.db]);

  useEffect(() => {
    if (testData !== undefined) {
      var t = new Date(1970, 0, 0);
      t.setSeconds(testData.timestamp.seconds);
      console.log(testData.timestamp.toDate().toDateString());
      // console.log(t);
    }
  }, [testData]);

  return (
    <Container>
      <Row className="mt-2">
        <Workout workoutData={testData} />
      </Row>
      <Row className="mt-2">
        <Col className="col-3">
          <Button>Add workout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Tool;
