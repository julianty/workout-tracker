import { Badge, CloseButton } from "react-bootstrap";
import { muscleGroups } from "../data/muscleGroups";

export default function MuscleTag({ muscleGroup, editMode, onClick }) {
  if (muscleGroups[muscleGroup] === undefined) {
    return <div>{muscleGroup}</div>;
  }
  const muscleName = muscleGroups[muscleGroup].name;

  function handleClick(e) {
    e.preventDefault();
    onClick(muscleName);
  }

  if (editMode === true) {
    return (
      <Badge onClick={handleClick}>
        {muscleName}
        <CloseButton disabled />
      </Badge>
    );
  }
  return <Badge>{muscleName}</Badge>;
}
