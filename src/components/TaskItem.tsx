import { Link } from "react-router-dom";
import { selectTodo } from "../features/todoSlice";
import { useAppSelector } from "../hooks/tshooks";

const TaskItem = (): JSX.Element => {
  const { id, name, status } = useAppSelector(selectTodo);

  return (
    <div className='task'>
      <div>{name}</div>
      <div className={`status status-${status}`}>{status}</div>
      <Link to={`/task/${id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  );
};

export default TaskItem;
