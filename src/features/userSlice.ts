import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  todos: string[] | null;
};
// Define a type for the slice state
type userState = {
  currentUser: User;
  allUsers: {
    byId: {
      [key: string]: User;
    };
    allIds: string[];
  };
};

// Define the initial state using that type
const initialState: userState = {
  currentUser: {
    id: "",
    name: null,
    email: null,
    todos: [],
  },
  // (state.allUsers.byId.allIds.includes(state.currentUser.id))?return:(state.allUsers.byId.allIds).push(state.currentUser.id) after log in?
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
    setUser: (state, action: PayloadAction<userState>) => {
      const { payload } = action;
      const { id, name, email, todos } = payload.currentUser;
      state.currentUser.id = id;
      state.currentUser.name = name;
      state.currentUser.email = email;
      state.currentUser.todos = todos;
      if (state.allUsers.byId[id]) return;
      else {
        state.allUsers.byId = { id: { id, name, email, todos } };
        state.allUsers.allIds = [...state.allUsers.allIds, id];
      }

      // {
      //   state.allUsers.byId[id]
      //     ? state
      //     : {
      //         ...state.allUsers,
      //         byId: {
      //           ...state.allUsers.byId,
      //           [action.payload.currentUser.id]: action.payload,
      //         },
      //         allIds: [...state.allUsers.allIds, action.payload.currentUser],
      //       };
      // }

      // addNewUser: (state, action: PayloadAction<userState>) => {
      //   const { payload } = action;
      //   const { id } = payload.currentUser;

      //   state.allUsers.byId[id]
      //     ? state
      //     : {
      //         ...state.allUsers,
      //         byId: {
      //           ...state.allUsers.byId,
      //           [action.payload.currentUser.id]: action.payload,
      //         },
      //         allIds: [...state.allUsers.allIds, action.payload.currentUser.id],
      //       };
    },
    reset: (state) => initialState,
  },
});

export const { reset, setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.currentUser;
export default userSlice.reducer;
// const userSlice = {
//   currentUser: {
//     id: "1",
//     name: "Nikita",
//     email: "nikita@gmail.com",
//     todos: ["1", "2", "3"]
//   },
//   allUsers: {
//     byId: {
//       // normalized
//       "1": {
//         id: "1",
//         name: "Nikita",
//         email: "nikita@gmail.com",
//         todos: ["1", "2", "3"]
//       },
//       "2": {
//         id: "2",
//         name: "Nice",
//         email: "Nice@gmail.com",
//         todos: []
//       },
//       "3": {
//         id: "3",
//         name: "Negro",
//         email: "Negro@gmail.com",
//         todos: []
//       }
//     },
//     allIds: ["1", "2", "3"]
//   },
//
