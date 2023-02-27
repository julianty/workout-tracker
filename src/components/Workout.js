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
  function handleDelete(e) {
    props.deleteExercise(props.exerciseIdx);
  }

  return (
    <Form>
      <Row>
        <Col className="col-6 col-lg">
          <Form.Select
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
        <Col>
          <Button onClick={handleDelete}>Remove</Button>
        </Col>
      </Row>
    </Form>
  );
}

function WorkoutHeading() {
  return (
    <Row>
      <Col className="col-6 col-lg">Exercise</Col>
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

  function deleteExercise(exerciseIdx) {
    const uid = store.getState().auth.user.uid;
    dispatch({
      type: "workouts/deleteExercise",
      payload: { sessionName: props.name, exerciseIdx: exerciseIdx, uid: uid },
    });
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
      type: "workouts/updateExercises",
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
          deleteExercise={deleteExercise}
          key={uniqid()}
        />
      ))}
      <Button onClick={addNewExercise}>Add exercise</Button>
    </Container>
  );
}

export default Workout;
