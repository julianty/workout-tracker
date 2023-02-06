import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import uniqid from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import store from "../app/store";

function Exercise(props) {
  let exerciseData = { ...props.exerciseData };
  const exerciseCatalog = useSelector((state) => state.workouts.catalog);

  function onChange(e) {
    const field = e.target.dataset.colname;
    const newValue = e.target.value;
    exerciseData[field] = newValue;
    props.onChange(props.exerciseIdx, exerciseData);
  }
  return (
    <Form>
      <Row>
        <Col>
          <Form.Select
            className="form-control-plaintext"
            data-colname="exercise"
            defaultValue={exerciseData.exercise}
            onChange={onChange}
            list="exerciseDatabaseList"
          >
            {Object.keys(exerciseCatalog).map((exerciseName, idx) => {
              return (
                <option value={`${exerciseName}`} key={uniqid()}>
                  {exerciseName}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col>
          <Form.Control
            type="number"
            data-colname="sets"
            defaultValue={exerciseData.sets}
            onChange={onChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            data-colname="reps"
            defaultValue={exerciseData.reps}
            onChange={onChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            data-colname="weight"
            defaultValue={exerciseData.weight}
            onBlur={onChange}
          />
        </Col>
      </Row>
    </Form>
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

  function onChange(exerciseIdx, exerciseData) {
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
          onChange={onChange}
          key={uniqid()}
        />
      ))}
      <Button onClick={addNewExercise}>Add exercise</Button>
    </Container>
  );
}

export default Workout;
