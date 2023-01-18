import { selectUser } from "../features/userSlice";
import { useAppSelector } from "../hooks/tshooks";
import TaskItem from "../components/TaskItem";
import { FaQuestionCircle, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { selectTodos } from "../features/todoSlice";

const Profile = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const todo = useAppSelector(selectTodos);

  if (!user) return <FaSpinner />;

  const { name } = user;
  const userTodos = user.todos
    .map((todoId) => todo.byId[todoId])
    .filter((todo) => todo);

  return (
    <>
      <h1 style={{ borderStyle: "none none solid" }}>
        Hi, {name}.
        <br /> Let's find out what we can call a day
      </h1>

      <h1>Tasks</h1>
      <Link to='/new-todo' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Task
      </Link>
      <div className='tasks'>
        <div className='task-headings'>
          <div>Task</div>

          <div>Description</div>
        </div>
        {userTodos.map((todo) => (
          <TaskItem
            key={todo.id}
            id={todo.id}
            name={todo.name}
            description={todo.description}
          />
        ))}
      </div>
    </>
  );
};

export default Profile;
