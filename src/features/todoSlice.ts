import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

export type Todo = {
  id: string;
  name: string | null;
  description: string | null;
  status: string | null;
};
// Define a type for the slice state
export type todoState = {
  currentTodo: Todo;
  allTodos: {
    byId: {
      [key: string]: Todo;
    };
    allIds: string[];
  };
};
const initialState: todoState = {
  currentTodo: {
    id: "",
    name: null,
    description: null,
    status: "closed",
  },
  allTodos: {
    byId: {},
    allIds: [],
  },
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<todoState>) => {
      const { payload } = action;
      const { id, name, description, status } = payload.currentTodo;
      state.currentTodo.id = id;
      state.currentTodo.name = name;
      state.currentTodo.description = description;
      state.currentTodo.status = status;
    },
    addTodo: (state, action: PayloadAction<todoState>) => {
      const { payload } = action;
      const { id, name, description, status } = payload.currentTodo;
      if (state.allTodos.byId[id]) return;
      else {
        state.allTodos.byId = { id: { id, name, description, status } };
        state.allTodos.allIds = [...state.allTodos.allIds, id];
      }
    },

    reset: (state) => initialState,
  },
});

export const { reset, setTodo, addTodo } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState) => state.todo.currentTodo;
export default todoSlice.reducer;

//     const userTodos = currentUser.todos.map(
//       todoId => userSlice.allTodos.byId[todoId]
//     );
