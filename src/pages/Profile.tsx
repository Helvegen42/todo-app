import { selectUser } from "../features/userSlice";
import { useAppSelector } from "../hooks/tshooks";
import TaskItem from "../components/TaskItem";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = (): JSX.Element => {
  const { name } = useAppSelector(selectUser);
  //     const userTodos = currentUser.todos.map(
  //       todoId => userSlice.allTodos.byId[todoId]
  //     );

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
          <div>Status</div>
          <div>Description</div>
        </div>
        {/* userTodos.map((todo)=>
          <TaskItem/>
        ) */}
        <TaskItem />
      </div>
    </>
  );
};

export default Profile;
