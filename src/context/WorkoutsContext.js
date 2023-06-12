import { createContext, useReducer } from "react";

//  Context
export const WorkoutsContext = createContext();

//  Reducer
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload
        ),
      };
    default:
      throw new Error("Unknown action type");
  }
};

// Provider
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
