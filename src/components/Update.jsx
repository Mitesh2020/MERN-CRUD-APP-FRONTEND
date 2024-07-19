import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getSingleUser = async () => {
    const response = await fetch(`https://mern-crud-app-backend-capv.onrender.com/${id}`);
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      console.log("updated user : ", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateUser = { name, email, age };
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">UPDATE THE DATA</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">NAME</label>
          <input
            type="text"
            className="form-control"
            value={name}
            required="true"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">EMAIL</label>
          <input
            type="email"
            className="form-control"
            value={email}
            required="true"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">AGE</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
