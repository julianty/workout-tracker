import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import uniqid from "uniqid";
import { useDispatch } from "react-redux";

function Exercise(props) {
  let exerciseData = { ...props.exerciseData };

  function onBlur(e) {
    const field = e.target.dataset.colname;
    const newValue = e.target.value;
    exerciseData[field] = newValue;
    props.onBlur(props.exerciseIdx, exerciseData);
  }

  function EditableInput(props) {
    return (
      <input
        className="form-control-plaintext"
        data-colname={props.colname}
        type={props.type}
        onBlur={onBlur}
        defaultValue={props.defaultValue}
      ></input>
    );
  }
  return (
    <Row>
      <Col>
        <EditableInput
          type="text"
          colname="exercise"
          defaultValue={exerciseData.exercise}
        />
      </Col>
      <Col>
        <EditableInput
          type="number"
          colname="sets"
          defaultValue={exerciseData.sets}
        />
      </Col>
      <Col>
        <EditableInput
          type="number"
          colname="reps"
          defaultValue={exerciseData.reps}
        />
      </Col>
      <Col>
        <EditableInput
          type="number"
          colname="weight"
          defaultValue={exerciseData.weight}
        />
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
  const exercisesArr = data.exercises;
  const dispatch = useDispatch();

  function addNewExercise() {
    dispatch({ type: "workouts/addExercise", payload: { name: props.name } });
  }

  function onBlur(exerciseIdx, exerciseData) {
    dispatch({
      type: "workouts/updateWorkouts",
      payload: {
        sessionName: props.name,
        exerciseIdx: exerciseIdx,
        exerciseData: exerciseData,
      },
    });
  }

  return (
    <Container>
      <h4>{timestamp.toDateString()}</h4>
      <WorkoutHeading />
      {exercisesArr.map((exerciseData, index) => (
        <Exercise
          exerciseIdx={index}
          exerciseData={exerciseData}
          onBlur={onBlur}
          key={uniqid()}
        />
      ))}
      <Button onClick={addNewExercise}>Add exercise</Button>
    </Container>
  );
}

export default Workout;
