import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

export type Todo = {
  id: string;
  name: string;
  description: string;
};

export type CreateTodoParams = {
  id: string;
  name: string;
  description: string;
};

export type UpdateTodoParams = {
  id: string;
  name: string;
  description: string;
};

export type DeleteTodoParams = {
  id: string;
};
// Define a type for the slice state
export type todoState = {
  currentTodo: Todo | null;
  allTodos: {
    byId: {
      [key: string]: Todo;
    };
    allIds: string[];
  };
};
const initialState: todoState = {
  currentTodo: null,
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
    addTodo: (state, action: PayloadAction<CreateTodoParams>) => {
      const { payload } = action;
      const { id, name, description } = payload;

      state.allTodos.byId[id] = { id, name, description };
      state.allTodos.allIds = [...state.allTodos.allIds, id];
    },
    updateTodo: (state, action: PayloadAction<UpdateTodoParams>) => {
      const { payload } = action;
      const { id, name, description } = payload;

      if (!state.allTodos.byId[id]) return;
      state.allTodos.byId[id] = { id, name, description };
    },
    deleteTodo: (state, { payload }: PayloadAction<DeleteTodoParams>) => {
      const { id } = payload;

      if (!state.allTodos.byId[id]) return;
      state.allTodos.allIds = state.allTodos.allIds.filter(
        (todoId) => todoId !== id
      );
      delete state.allTodos.byId[id];
    },

    reset: (state) => {
      state.currentTodo = initialState.currentTodo;
    },
  },
});

export const { reset, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState) => state.todo.currentTodo;
export const selectTodos = (state: RootState) => state.todo.allTodos;
export default todoSlice.reducer;
