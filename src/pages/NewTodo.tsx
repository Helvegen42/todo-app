import { useAppDispatch, useAppSelector } from "../hooks/tshooks";
import { addTodo } from "../features/todoSlice";
import BackButton from "../components/BackButton";
import { useState } from "react";
import uuid from "react-uuid";
import { addTodoToUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const NewTodo = (): JSX.Element => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the value of the todo item from the form
    const todo = { id: uuid(), name: taskName, description: description };
    // Dispatch a Redux action to add the todo item to the store
    appDispatch(addTodo(todo));
    appDispatch(addTodoToUser(todo));
    navigate("/profile");
  };
  return (
    <>
      <BackButton url={"/profile"} />
      <section className='heading'>
        <h1>Create New Task</h1>
      </section>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='taskName'>Name or short thesis</label>
          <textarea
            style={{ resize: "none" }}
            name='taskName'
            id='taskName'
            className='form-control'
            placeholder='Name it'
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            style={{ resize: "none" }}
            name='description'
            id='description'
            className='form-control'
            placeholder='Describe it'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Todo
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTodo;
