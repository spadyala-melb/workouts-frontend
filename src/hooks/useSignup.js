import { useContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    axios
      .post("http://localhost:4000/api/user/signup", {
        email,
        password,
      })
      .then((response) => {
        // Save the user to local storage
        localStorage.setItem("user", JSON.stringify(response.data));
        // update the auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error.response.data.error);
        setError(error.response.data.error);
      });
  };
  return { signup, isLoading, error };
};
