import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import uniqid from "uniqid";

function Exercise(props) {
  function EditableInput(props) {
    return (
      <input
        className="form-control-plaintext"
        type={props.type}
        onChange={changeHandler}
        defaultValue={props.defaultValue}
      ></input>
    );
  }
  function changeHandler(e) {
    // TODO: on change, save data to firestore
    console.log(e);
  }
  const exerciseData = props.exerciseData;
  return (
    <Row>
      <Col>
        <EditableInput type="text" defaultValue={exerciseData.exercise} />
      </Col>
      <Col>
        <EditableInput type="number" defaultValue={exerciseData.sets} />
      </Col>
      <Col>
        <EditableInput type="number" defaultValue={exerciseData.reps} />
      </Col>
      <Col>
        <EditableInput type="number" defaultValue={exerciseData.weight} />
      </Col>
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

  const [exercisesArr, setExercisesArr] = useState(data.exercises);
  // const exercisesArr = data.exercises;

  function addNewExercise() {
    // console.log("add new exercise");
    // console.log(typeof exercisesArr);
    const exercisesArrCopy = [...exercisesArr];
    exercisesArrCopy.push({
      exercise: "Click to edit",
      reps: "0",
      sets: "0",
      weight: "0",
    });
    setExercisesArr(exercisesArrCopy);
  }

  return (
    <Container>
      <h4>{timestamp.toDateString()}</h4>
      <WorkoutHeading />
      {exercisesArr.map((exerciseData) => (
        <Exercise exerciseData={exerciseData} key={uniqid()} />
      ))}
      <Button onClick={addNewExercise}>Add exercise</Button>
    </Container>
  );
}

export default Workout;
