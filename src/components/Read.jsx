/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch("https://mern-crud-app-backend-kohl.vercel.app/");
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`https://mern-crud-app-backend-kohl.vercel.app/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">ALL DATA</h2>
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-1 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.age}</p>
                <a
                  href="#"
                  class="card-link"
                  onClick={() => handleDelete(ele._id)}
                >
                  DELETE
                </a>
                <Link to={`/${ele._id}`} class="card-link">
                  UPDATE
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
