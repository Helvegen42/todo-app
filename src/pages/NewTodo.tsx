import { useAppSelector } from "../hooks/tshooks";
import { addTodo } from "../features/todoSlice";
import BackButton from "../components/BackButton";

const NewTodo = (): JSX.Element => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Get the value of the todo item from the form
    const todo = e.target.elements.todo.value;
    // Dispatch a Redux action to add the todo item to the store
    // useAppSelector(addTodo(todo));
  };

  return (
    <>
      <BackButton url={"/profile"} />
      <section className='heading'>
        <h1>Create New Task</h1>
      </section>
      <form onSubmit={handleSubmit}>
        <input type='text' name='todo' />
        <button type='submit'>Add Todo</button>
      </form>
    </>
  );
};

export default NewTodo;
