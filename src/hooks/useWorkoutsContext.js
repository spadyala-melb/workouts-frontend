import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw new Error("Unknown Context");
  }

  return context;
};
