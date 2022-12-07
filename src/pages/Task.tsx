import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/tshooks";
import { selectTodo } from "../features/todoSlice";
import React from "react";

const Task = (): JSX.Element => {
  const task = useAppSelector(selectTodo);

  const navigate = useNavigate();

  //Close task
  const onTaskClose = () => {
    toast.success("Task Closed!");
    navigate("/tasks");
  };

  return (
    <>
      <div className='task-page'>
        <header className='task-header'>
          <BackButton url='/tasks' />
          <h2>
            Task ID: {task.id}
            <span className={`status status-${task.status}`}>
              {task.status}
            </span>
          </h2>

          <h3>Name: {task.name}</h3>
          <hr />
          <div className='task-desc'>
            <h3>Description </h3>
            <p>{task.description}</p>
          </div>
        </header>

        {task.status !== "closed" && (
          <button onClick={onTaskClose} className='btn btn-block btn-danger'>
            Close Task
          </button>
        )}
      </div>
    </>
  );
};

export default Task;
