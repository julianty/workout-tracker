import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

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
      <Row className="p-0">
        <Col className="col-6">
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
        <Col className="col-1">
          <Form.Control
            type="number"
            data-colname="sets"
            defaultValue={exerciseData.sets}
            onChange={onChange}
          />
        </Col>
        <Col className="col-1">
          <Form.Control
            type="number"
            data-colname="reps"
            defaultValue={exerciseData.reps}
            onChange={onChange}
          />
        </Col>
        <Col className="col-2">
          <Form.Control
            type="number"
            data-colname="weight"
            defaultValue={exerciseData.weight}
            onBlur={onChange}
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={handleDelete}>Remove</Button>
        </Col>
      </Row>
    </Form>
  );
}

function WorkoutHeading() {
  return (
    <Row>
      <Col className="col-6">Exercise</Col>
      <Col className="col-1">Sets</Col>
      <Col className="col-1">Reps</Col>
      <Col className="col-2">Weight</Col>
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
      <Card className="my-3">
        <Card.Header>{timestamp.toDateString()}</Card.Header>
        <WorkoutHeading />
        <ListGroup>
          {exercisesArr.map((exerciseData, index) => (
            <ListGroupItem>
              <Exercise
                exerciseIdx={index}
                exerciseData={exerciseData}
                onChange={onChange}
                deleteExercise={deleteExercise}
                key={uniqid()}
              />
            </ListGroupItem>
          ))}
          <ListGroupItem className="d-flex">
            <Button onClick={addNewExercise}>Add exercise</Button>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Workout;
