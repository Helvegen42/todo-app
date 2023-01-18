import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTodoParams, DeleteTodoParams } from "./todoSlice";
import type { RootState } from "../app/store";

type User = {
  id: string;
  name: string;
  email: string;
  todos: string[];
};
type Login = {
  id: string;
  name: string;
  email: string;
};
// Define a type for the slice state
type userState = {
  currentUser: User | null;
  allUsers: {
    byId: {
      [key: string]: User;
    };
    allIds: string[];
  };
};

// Define the initial state using that type
const initialState: userState = {
  currentUser: null,

  allUsers: {
    byId: {},
    allIds: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<Login>) => {
      const { id, name, email } = payload;

      if (state.allUsers.byId[id]) {
        //user exists
        state.currentUser = state.allUsers.byId[id];
      } else {
        //new user (user doesn't exist)
        const newUser: User = { id, name, email, todos: [] };

        state.allUsers.allIds = [...state.allUsers.allIds, id];
        state.allUsers.byId[id] = newUser;
        state.currentUser = newUser;
      }
    },
    addTodoToUser: (
      state,
      action: PayloadAction<Pick<CreateTodoParams, "id">>
    ) => {
      const { payload } = action;
      const { id } = payload;
      if (!state.currentUser) return;
      state.currentUser.todos = [...state.currentUser.todos, id];
      const currentUserInAllUsersTodos =
        state.allUsers.byId[state.currentUser.id].todos;
      state.allUsers.byId[state.currentUser.id].todos = [
        ...currentUserInAllUsersTodos,
        id,
      ];
    },

    deleteTodoFromUser: (
      state,
      action: PayloadAction<Pick<DeleteTodoParams, "id">>
    ) => {
      const { payload } = action;
      const { id } = payload;
      if (!state.currentUser) return;
      state.currentUser.todos = state.currentUser.todos.filter(
        (todoId) => todoId !== id
      );
    },
    reset: (state) => {
      state.currentUser = initialState.currentUser;
    },
  },
});

export const { reset, login, addTodoToUser, deleteTodoFromUser } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
