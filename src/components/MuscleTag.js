import { Badge } from "react-bootstrap";
import { muscleGroups } from "../data/muscleGroups";

export default function MuscleTag({ muscleGroup }) {
  if (muscleGroups[muscleGroup] === undefined) {
    return <div>{muscleGroup}</div>;
  }
  const muscleName = muscleGroups[muscleGroup].name;

  return <Badge>{muscleName}</Badge>;
}
