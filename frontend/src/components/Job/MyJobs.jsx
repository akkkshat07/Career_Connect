import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../main";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/job/getall", {
          withCredentials: true,
        });
        console.log(res.data);

        if (res.data.success) {
          setMyJobs(res.data.jobs);
        } else {
          console.log("Failed to fetch jobs");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>

        <div className="banner">
          {myJobs.length > 0 ? (
            myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="card-header">
                  <h2>{element.title}</h2>
                  <span className="badge">{element.category}</span>
                </div>
                <p className="location">{element.country}</p>
                <Link to={`/job/${element._id}`} className="details-link">
                  View more
                </Link>
              </div>
            ))
          ) : (
            <p>No jobs posted yet.</p> // Message if no jobs
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
