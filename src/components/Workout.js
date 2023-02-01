import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import uniqid from "uniqid";
import { useDispatch } from "react-redux";
import store from "../app/store";

function Exercise(props) {
  let exerciseData = { ...props.exerciseData };

  function onBlur(e) {
    const field = e.target.dataset.colname;
    const newValue = e.target.value;
    exerciseData[field] = newValue;
    props.onBlur(props.exerciseIdx, exerciseData);
  }
  return (
    <Row>
      <form className="d-flex">
        <input
          className="form-control-plaintext"
          type="text"
          data-colname="exercise"
          defaultValue={exerciseData.exercise}
          onBlur={onBlur}
        />
        <input
          className="form-control-plaintext"
          type="number"
          data-colname="sets"
          defaultValue={exerciseData.sets}
          onBlur={onBlur}
        />
        <input
          className="form-control-plaintext"
          type="number"
          data-colname="reps"
          defaultValue={exerciseData.reps}
          onBlur={onBlur}
        />
        <input
          className="form-control-plaintext"
          type="number"
          data-colname="weight"
          defaultValue={exerciseData.weight}
          onBlur={onBlur}
        />
      </form>
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
    const user = store.getState().auth.user;
    const payload = {
      sessionName: props.name,
      exerciseIdx: exerciseIdx,
      exerciseData: exerciseData,
      uid: user.uid,
    };
    dispatch({
      type: "workouts/updateWorkouts",
      payload,
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
