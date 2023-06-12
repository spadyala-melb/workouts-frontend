import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user from localstorage
    localStorage.removeItem("user");
    // remove the user from global state
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
