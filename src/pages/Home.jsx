import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { ImBin } from "react-icons/im";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const context = useWorkoutsContext();
  const { workouts, dispatch } = context;

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:4000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          dispatch({ type: "SET_WORKOUTS", payload: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, user]);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (user) {
      axios
        .post(
          "http://localhost:4000/api/workouts",
          {
            title,
            load,
            reps,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          dispatch({ type: "CREATE_WORKOUT", payload: response.data });
          setTitle("");
          setLoad("");
          setReps("");
        })
        .catch((error) => {
          console.error("Error:", error.response.data.error);
          setError(error.response.data.error);
        });
    }
  };

  const handleDelete = (id) => {
    if (user) {
      axios
        .delete(`http://localhost:4000/api/workouts/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          dispatch({ type: "DELETE_WORKOUT", payload: id });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <div className="workouts-container container">
        <div className="workouts-list">
          {workouts &&
            workouts.map((workout) => (
              <div key={workout._id} className="workout-list-item">
                <div className="item-content">
                  <div className="title">{workout.title}</div>
                  <div>
                    <strong>Load (kg)</strong>: {workout.load}
                  </div>
                  <div>
                    <strong>Reps</strong>: {workout.reps}
                  </div>
                  <div>
                    {formatDistanceToNow(new Date(workout.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="bin" onClick={() => handleDelete(workout._id)}>
                  <ImBin />
                </div>
              </div>
            ))}
        </div>
        <div className="workout-form">
          <h3>Add a New Workout</h3>
          <form className="form" onSubmit={handleAddWorkout}>
            <label>Excersize Title:</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter Title"
              className={error ? "input-error" : ""}
            />
            <label>Load (in kgs):</label>
            <input
              type="number"
              onChange={(e) => setLoad(e.target.value)}
              value={load}
              placeholder="Enter Load"
            />
            <label>Reps:</label>
            <input
              type="number"
              onChange={(e) => setReps(e.target.value)}
              value={reps}
              placeholder="Enter Reps"
            />
            <button className="btn">Add Workout</button>
          </form>
          <div className="errors">
            {error &&
              error.map((err) => (
                <p className="validation-error-text" key={err.message}>
                  {err.message}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
