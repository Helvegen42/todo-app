import { useAppDispatch } from "../hooks/tshooks";
import { FaRegEdit, FaRegTimesCircle } from "react-icons/fa";
import { deleteTodo } from "../features/todoSlice";
import { deleteTodoFromUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

type TaskItemType = {
  key: string;
  id: string;
  name: string;
  description: string;
};

const TaskItem = (todo: TaskItemType): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, name, description } = todo;

  const onDelete = () => {
    dispatch(deleteTodoFromUser({ id }));
    dispatch(deleteTodo({ id }));
  };

  const onEditClick = () => {
    navigate(`/edit-todo/:${id}`, { state: { id } });
  };

  return (
    <div className='task'>
      <div>{name}</div>
      <div>{description}</div>
      <button onClick={onEditClick} className='btn btn-block'>
        Edit <FaRegEdit />
      </button>
      <button onClick={onDelete} className='btn btn-block'>
        Delete <FaRegTimesCircle />
      </button>
    </div>
  );
};

export default TaskItem;
